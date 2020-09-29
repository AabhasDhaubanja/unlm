"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Image, {
        foreignKey: "imageableId",
        onDelete: "CASCADE",
        hooks: true,
        scope: {
          imageableType: "product",
        },
      });

      this.hasMany(models.Arrival, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        hooks: true,
      });

      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });

      this.belongsToMany(models.Bill, {
        through: "BillProducts",
      });

      this.belongsToMany(models.Cart, {
        through: "CartProducts",
      });

      this.belongsToMany(models.Wishlist, {
        through: "WishlistProducts",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
