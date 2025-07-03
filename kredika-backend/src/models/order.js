'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    orderNumber: DataTypes.STRING,
    userId: DataTypes.UUID,
    deliveryAddressId: DataTypes.UUID,
    statusCode: DataTypes.STRING,
    paymentStatusCode: DataTypes.STRING,
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    notes: DataTypes.TEXT,
    deliveryDate: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Order',
    schema: 'kredika_app',
    tableName: 'orders',
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
  return Order;
};