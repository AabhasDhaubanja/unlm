const { Op } = require("sequelize");

module.exports = {
  Query: {
    categories: (_, __, context) => {
      return context.models.Category.findAll({
        include: {
          model: context.models.Product,
          include: {
            model: context.models.Image,
          },
        },
      });
    },

    arrivals: (_, __, context) => {
      return context.models.Arrival.findAll({
        include: {
          model: context.models.Product,
          include: {
            model: context.models.Image,
          },
        },
      });
    },

    product: (_, { id }, context) => {
      return context.models.Product.findOne({
        where: {
          id,
        },
        include: {
          model: context.models.Image,
        },
      });
    },

    products: (_, { categoryId }, context) => {
      async function addProducts(id) {
        let { Products, Categories } = await context.models.Category.findOne({
          where: {
            id,
          },
          include: [
            {
              model: context.models.Product,
            },
            {
              model: context.models.Category,
            },
          ],
        });

        if (Categories.length == 0) {
          return [...Products];
        }

        let products = [];
        for (const category of Categories) {
          const moreProducts = await addProducts(category.id);
          products = [...products, ...moreProducts];
        }

        return [...products, ...Products];
      }

      return addProducts(categoryId);
    },

    search: async (_, { text }, context) => {
      const words = text.split(" ");

      let products = [];

      for (const word of words) {
        const product = await context.models.Product.findAll({
          where: {
            name: {
              [Op.like]: `%${word}%`,
            },
          },
        });

        products = [...products, ...product];
      }

      return products;
    },
  },
};
