const { AuthenticationError } = require("apollo-server-express");
const addProducts = require("../helpers/addProducts");

module.exports = (models, authenticated, Op) => {
  return {
    one: (id) => {
      return models.Product.findOne({
        where: {
          id,
        },
        include: {
          model: models.Image,
        },
      });
    },

    category: (categoryId) => {
      return addProducts(models)(categoryId);
    },

    search: async (text, Op) => {
      const words = text.split(" ");

      let products = [];

      for (const word of words) {
        const product = await models.Product.findAll({
          where: {
            name: {
              [Op.like]: `%${word}%`,
            },
          },
          include: {
            model: models.Image,
          },
        });

        products = [...products, ...product];
      }

      return products;
    },

    addProduct: (args) => {
      if (!authenticated) {
        throw new AuthenticationError("Not Authenticated!");
      }
    },
  };
};
