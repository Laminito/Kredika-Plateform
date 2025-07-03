'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstallmentPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstallmentPlan.init({
    planNumber: DataTypes.STRING,
    userId: DataTypes.UUID,
    orderId: DataTypes.UUID,
    productId: DataTypes.UUID,
    principalAmount: DataTypes.DECIMAL,
    commissionRate: DataTypes.DECIMAL,
    commissionAmount: DataTypes.DECIMAL,
    totalAmount: DataTypes.DECIMAL,
    installmentAmount: DataTypes.DECIMAL,
    durationMonths: DataTypes.INTEGER,
    frequencyCode: DataTypes.STRING,
    totalInstallments: DataTypes.INTEGER,
    paidInstallments: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    statusCode: DataTypes.STRING,
    latePenalty: DataTypes.DECIMAL,
    completedAt: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'InstallmentPlan',
     schema: 'kredika_app',
    tableName: 'installment_plans'
  });
  return InstallmentPlan;
};