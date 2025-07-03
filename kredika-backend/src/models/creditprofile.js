'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CreditProfile.init({
    userId: DataTypes.UUID,
    creditScore: DataTypes.INTEGER,
    creditLimit: DataTypes.DECIMAL,
    availableCredit: DataTypes.DECIMAL,
    totalDebt: DataTypes.DECIMAL,
    defaultCount: DataTypes.INTEGER,
    lastCreditReview: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CreditProfile',
    schema: 'kredika_app',
    tableName: 'credit_profiles'
  });
  return CreditProfile;
};