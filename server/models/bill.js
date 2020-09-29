"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: "BillProducts",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Bill.init(
    {
      grandTotal: DataTypes.BIGINT,
      phoneNumber: DataTypes.BIGINT,
      shippingCost: DataTypes.INTEGER,
      shippingAddress: DataTypes.STRING,
      payed: DataTypes.BOOLEAN,
      delivered: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
