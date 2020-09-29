"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillProduct.init(
    {
      BillId: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Bill,
          key: "id",
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Product,
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BillProduct",
    }
  );
  return BillProduct;
};
