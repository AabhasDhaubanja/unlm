module.exports = (models) => {
  return {
    all: () => {
      return models.Category.findAll({
        include: {
          model: models.Product,
          include: {
            model: models.Image,
          },
        },
      });
    },
  };
};
