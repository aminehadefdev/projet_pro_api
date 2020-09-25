'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class regles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  regles.init({
    content: DataTypes.TEXT,
    title: DataTypes.STRING,
    idAdmin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'regles',
  });
  return regles;
};