"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blacklist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
      },
      expired: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Blacklist",
      tableName: "Blacklist",
      timestamps: false
    }
  )
  return Blacklist
}
