"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Cart, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      this.hasOne(models.Wishlist, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      this.hasMany(models.Bill, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "deliverer", "user"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("afterCreate", (instance, options) => {
    sequelize.models.Wishlist.create({ userId: instance.dataValues.id });
    sequelize.models.Cart.create({ userId: instance.dataValues.id });
  });

  return User;
};
