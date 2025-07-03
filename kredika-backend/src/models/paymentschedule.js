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
      PaymentSchedule.belongsTo(models.InstallmentPlan, {
        foreignKey: 'installmentPlanId',
        as: 'installmentPlan'
      });
      PaymentSchedule.hasMany(models.PaymentTransaction, {
        foreignKey: 'paymentScheduleId',
        as: 'paymentTransactions'
      });
    }
  }
}
PaymentSchedule.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  installmentPlanId: DataTypes.UUID,
  installmentNumber: DataTypes.INTEGER,
  dueDate: DataTypes.DATE,
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  penaltyAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  paidAt: DataTypes.DATE,
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'PaymentSchedule',
  schema: 'kredika_app',
  tableName: 'payment_schedules',
  hooks: {
    beforeDestroy: (instance, _options) => {
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
return PaymentSchedule;
};