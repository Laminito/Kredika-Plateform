'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentSchedule.init({
    installmentPlanId: DataTypes.UUID,
    installmentNumber: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    paidAmount: DataTypes.DECIMAL,
    penaltyAmount: DataTypes.DECIMAL,
    statusCode: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PaymentSchedule',
    schema: 'kredika_app',
    tableName: 'payment_schedules'
  });
  return PaymentSchedule;
};