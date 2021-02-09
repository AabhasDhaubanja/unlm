const categories = require("./categories");
const arrivals = require("./arrivals");
const images = require("./images");
const products = require("./products");
const productPage = require("./productPage");

const dataCenter = (models, user) => {
  return {
    Categories: categories(models),

    Arrivals: arrivals(models),

    Products: products(models, user),

    ProductPage: productPage(models),

    Images: images(models, user),
  };
};

module.exports = dataCenter;
