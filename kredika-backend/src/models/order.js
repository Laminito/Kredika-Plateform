'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Order.belongsTo(models.UserAddress, {
        foreignKey: 'deliveryAddressId',
        as: 'deliveryAddress'
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'items'
      });
      Order.hasMany(models.InstallmentPlan, {
        foreignKey: 'orderId',
        as: 'installmentPlans'
      });
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deliveryAddressId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    statusCode: DataTypes.STRING,
    paymentStatusCode: DataTypes.STRING,
    notes: DataTypes.TEXT,
    deliveryDate: DataTypes.DATE,
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
    modelName: 'Order',
    schema: 'kredika_app',
    tableName: 'orders',
    hooks: {
      beforeDestroy: (instance, _options) => {
        instance.isDeleted = true;
        instance.save();
        return false;
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

  return Order;
};
