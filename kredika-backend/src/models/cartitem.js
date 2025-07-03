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
      // define association here
    }
  }
  CartItem.init({
    cartId: DataTypes.UUID,
    productId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    paymentMethodCode: DataTypes.STRING,
    creditDuration: DataTypes.INTEGER,
    creditFrequencyCode: DataTypes.STRING,
    commissionRate: DataTypes.DECIMAL,
    totalAmount: DataTypes.DECIMAL,
    installmentAmount: DataTypes.DECIMAL,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CartItem',
    schema: 'kredika_app',
    tableName: 'cart_items'
  });
  return CartItem;
};