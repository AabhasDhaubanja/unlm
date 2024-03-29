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

      const catId = product ? product.categoryId : 3;
      const similar = await addProducts(models)(catId);

      return {
        product,
        similar,
      };
    },
  };
};
