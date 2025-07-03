'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentTransaction.init({
    transactionNumber: DataTypes.STRING,
    userId: DataTypes.UUID,
    installmentPlanId: DataTypes.UUID,
    paymentScheduleId: DataTypes.UUID,
    amount: DataTypes.DECIMAL,
    paymentMethodCode: DataTypes.STRING,
    externalTransactionId: DataTypes.STRING,
    gatewayResponse: DataTypes.JSON,
    statusCode: DataTypes.STRING,
    processedAt: DataTypes.DATE,
    failureReason: DataTypes.TEXT,
    refundedAt: DataTypes.DATE,
    refundAmount: DataTypes.DECIMAL,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PaymentTransaction',
    schema: 'kredika_app',
    tableName: 'payment_transactions'
  });
  return PaymentTransaction;
};