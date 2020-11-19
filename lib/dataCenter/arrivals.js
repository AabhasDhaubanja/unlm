module.exports = (models) => {
  return {
    all: () => {
      return models.Arrival.findAll({
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
