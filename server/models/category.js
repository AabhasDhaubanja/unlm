"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        hooks: true,
      });

      this.hasMany(models.Category, {
        foreignKey: "superId",
        onDelete: "CASCADE",
        hooks: true,
      });

      this.belongsTo(models.Category, {
        foreignKey: "superId",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      isRoot: DataTypes.BOOLEAN,
      superId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
