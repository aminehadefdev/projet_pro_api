'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requestMentoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      requestMentoring.belongsTo(models.user, {
        foreignKey: 'idMentor'
      })
    }
  };
  requestMentoring.init({
    idMentor: DataTypes.INTEGER,
    idMentorer: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    isAccepted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requestMentoring',
  });
  return requestMentoring;
};