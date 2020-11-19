module.exports = (models) =>
  async function addProducts(id) {
    let { Products, Categories } = await models.Category.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.Product,
          include: {
            model: models.Image,
          },
        },
        {
          model: models.Category,
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
  };
