'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avantages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  avantages.init({
    socityName: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT,
    idAdmin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'avantages',
  });
  return avantages;
};