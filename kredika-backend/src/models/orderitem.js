'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
}
OrderItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: DataTypes.UUID,
  productId: DataTypes.UUID,
  quantity: DataTypes.INTEGER,
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethodCode: DataTypes.STRING,
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'OrderItem',
  schema: 'kredika_app',
  tableName: 'order_items',
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
return OrderItem;
};