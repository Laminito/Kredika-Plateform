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
      PaymentTransaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      PaymentTransaction.belongsTo(models.InstallmentPlan, {
        foreignKey: 'installmentPlanId',
        as: 'installmentPlan'
      });
      PaymentTransaction.belongsTo(models.PaymentSchedule, {
        foreignKey: 'paymentScheduleId',
        as: 'paymentSchedule'
      });
    }
  }
}
PaymentTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionNumber: DataTypes.STRING,
  userId: DataTypes.UUID,
  installmentPlanId: DataTypes.UUID,
  paymentScheduleId: DataTypes.UUID,
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethodCode: DataTypes.STRING,
  externalTransactionId: DataTypes.STRING,
  gatewayResponse: DataTypes.JSON,
  statusCode: DataTypes.STRING,
  processedAt: DataTypes.DATE,
  failureReason: DataTypes.TEXT,
  refundedAt: DataTypes.DATE,
  refundAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'PaymentTransaction',
  schema: 'kredika_app',
  tableName: 'payment_transactions',
  hooks: {
    beforeDestroy: (instance, options) => {
      // Suppression logique au lieu de physique
      instance.isDeleted = true;
      instance.save();
      return false; // Empêche la suppression physique
    }
  },
  defaultScope: {
    where: {
      isDeleted: false
    }
  },
  scopes: {
    withDeleted: {
      where: {}
    },
    onlyDeleted: {
      where: {
        isDeleted: true
      }
    }
  }
});
return PaymentTransaction;
};