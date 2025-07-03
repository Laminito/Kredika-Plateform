'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstallmentPlan extends Model {
    static associate(models) {
      InstallmentPlan.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      InstallmentPlan.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      InstallmentPlan.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      InstallmentPlan.hasMany(models.PaymentSchedule, {
        foreignKey: 'installmentPlanId',
        as: 'paymentSchedules'
      });
      InstallmentPlan.hasMany(models.PaymentTransaction, {
        foreignKey: 'installmentPlanId',
        as: 'paymentTransactions'
      });
    }
  }
  InstallmentPlan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    planNumber: DataTypes.STRING,
    userId: DataTypes.UUID,
    orderId: DataTypes.UUID,
    productId: DataTypes.UUID,
    principalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: false,
      comment: 'Commission rate as percentage (e.g., 0.1250 for 12.50%)'
    },
    commissionAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    installmentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    durationMonths: DataTypes.INTEGER,
    frequencyCode: DataTypes.STRING,
    totalInstallments: DataTypes.INTEGER,
    paidInstallments: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    statusCode: DataTypes.STRING,
    latePenalty: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    completedAt: DataTypes.DATE,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'InstallmentPlan',
    schema: 'kredika_app',
    tableName: 'installment_plans',
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

  return InstallmentPlan;
};