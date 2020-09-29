"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageableType)}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "imageableId",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      url: DataTypes.STRING,
      imageableId: DataTypes.INTEGER,
      imageableType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );

  Image.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (
        instance.imageableType === "product" &&
        instance.product !== undefined
      ) {
        instance.imageable = instance.product;
      }

      // To prevent mistakes:
      delete instance.product;
      delete instance.dataValues.product;
    }
  });

  return Image;
};
