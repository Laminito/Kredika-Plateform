'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
}
CartItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cartId: DataTypes.UUID,
  productId: DataTypes.UUID,
  quantity: DataTypes.INTEGER,
  paymentMethodCode: DataTypes.STRING,
  creditDuration: DataTypes.INTEGER,
  creditFrequencyCode: DataTypes.STRING,
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  commissionRate: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: true,
    comment: 'Commission rate as percentage (e.g., 0.1250 for 12.50%)'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  installmentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'CartItem',
  schema: 'kredika_app',
  tableName: 'cart_items',
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
return CartItem;
};