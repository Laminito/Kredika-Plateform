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
      // define association here
    }
  }
  OrderItem.init({
    orderId: DataTypes.UUID,
    productId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL,
    paymentMethodCode: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderItem',
     schema: 'kredika_app',
    tableName: 'order_items'
  });
  return OrderItem;
};