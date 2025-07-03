'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    nationalId: DataTypes.STRING,
    profession: DataTypes.STRING,
    monthlyIncome: DataTypes.DECIMAL,
    roleCode: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    emailVerified: DataTypes.BOOLEAN,
    phoneVerified: DataTypes.BOOLEAN,
    keycloakId: DataTypes.STRING,
    statusCode: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    schema: 'kredika_app',
    tableName: 'users'
  });
  return User;
};