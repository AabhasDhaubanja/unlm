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
  },
};
