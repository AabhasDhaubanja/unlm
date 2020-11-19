module.exports = {
  Query: {
    categories: (_, __, { dataCenter }) => {
      return dataCenter.Categories.all();
    },

    arrivals: (_, __, { dataCenter }) => {
      return dataCenter.Arrivals.all();
    },

    product: (_, { id }, { dataCenter }) => {
      return dataCenter.Products.one(id);
    },

    products: (_, { categoryId }, { dataCenter }) => {
      return dataCenter.Products.category(categoryId);
    },

    search: (_, { text }, { dataCenter }) => {
      return dataCenter.Products.search(text);
    },

    productPage: (_, { id }, { dataCenter }) => {
      return dataCenter.ProductPage.one(id);
    },
  },
  Mutation: {
    addProduct: (_, args, { dataCenter }) => {
      dataCenter.Products.addProduct(args);

      return {
        name: "BB",
        price: 1200,
        Images: [],
        categoryId: 3,
      };
    },
  },
};
