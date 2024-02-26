"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Phone, {
        foreignKey: "user_id",
        as: "phone",
      })

      User.hasMany(models.Post, {
        foreignKey: "user_id",
      })

      User.belongsToMany(models.Course, {
        foreignKey: "user_id",
        through: "users_courses",
        as: "courses",
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  )
  return User
}
