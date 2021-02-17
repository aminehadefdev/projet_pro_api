'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.Admin, {
        foreignKey: 'idAdmin'
      })
    }
  };
  user.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.DATE,
    email: DataTypes.STRING,
    keyConfirmeEmail: DataTypes.STRING,
    emailIsConfirmed: DataTypes.INTEGER,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    role: DataTypes.INTEGER,
    isAccepted: DataTypes.INTEGER,
    idAdmin: DataTypes.INTEGER,
    job: DataTypes.STRING,
    photoProfile: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};