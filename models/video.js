'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Video.init({
    path: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    idAdmin: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    name: DataTypes.STRING,
    job: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};