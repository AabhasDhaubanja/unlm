const { Op } = require("sequelize");

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
      return dataCenter.Products.search(text, Op);
    },

    productPage: (_, { id }, { dataCenter }) => {
      return dataCenter.ProductPage.one(id);
    },
  },
  Mutation: {
    addProduct: async (_, args, { dataCenter }) => {
      const product = await dataCenter.Products.addProduct(args);
      return product;
    },

    updateProduct: async (_, args, { dataCenter }) => {
      const updatedProduct = await dataCenter.Products.updateProduct(args);
      return updatedProduct;
    },

    deleteImage: (_, args, { dataCenter }) => {
      dataCenter.Images.deleteImage(args);
      return { status: "Image Deleted Successfully!", code: 200 };
    },

    deleteProduct: (_, args, { dataCenter }) => {
      dataCenter.Products.deleteProduct(args);
      return { status: "Product Deleted Successfully!", code: 200 };
    },
  },
};
