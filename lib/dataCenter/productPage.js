const addProducts = require("../helpers/addProducts");

module.exports = (models) => {
  return {
    one: async (id) => {
      const product = await models.Product.findOne({
        where: {
          id,
        },
        include: {
          model: models.Image,
        },
      });

      const similar = await addProducts(models)(product.categoryId);

      return {
        product,
        similar,
      };
    },
  };
};
