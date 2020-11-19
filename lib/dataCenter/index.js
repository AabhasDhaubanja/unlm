const { Op } = require("sequelize");
const categories = require("./categories");
const arrivals = require("./arrivals");
const products = require("./products");
const productPage = require("./productPage");

const dataCenter = (models, authenticated) => {
  return {
    Categories: categories(models),

    Arrivals: arrivals(models),

    Products: products(models, authenticated),

    ProductPage: productPage(models),
  };
};

module.exports = dataCenter;
