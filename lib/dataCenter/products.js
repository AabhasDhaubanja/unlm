const path = require("path");
const { createWriteStream, write } = require("fs");
const { AuthenticationError } = require("apollo-server-express");
const addProducts = require("../helpers/addProducts");
const { create } = require("domain");

module.exports = (models, user) => {
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

    addProduct: async ({ name, price, categoryId, files }) => {
      if (user.error) throw new AuthenticationError(user.error);

      let readStreams = [];

      // running this loop first because fs-capacitor destroys the createReadStream
      // once the resolver has returned, even if it's a promise
      for (const file of files) {
        const { createReadStream } = await file;
        readStreams.push(createReadStream());
      }

      const product = await models.Product.create({ name, price, categoryId });

      for (const [i, file] of files.entries()) {
        const { filename } = await file;

        try {
          const img = await models.Image.create({
            url: `/products/${filename}`,
            imageableId: product.id,
            imageableType: "product",
          });
        } catch (err) {
          console.log(err);
          break;
        }

        readStreams[i].pipe(
          createWriteStream(
            path.join(
              __dirname,
              "../../public/products_page/products",
              filename
            )
          )
        );
      }
    },
  };
};
