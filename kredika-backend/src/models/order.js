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
      // define association here
    }
  }
  Order.init({
    orderNumber: DataTypes.STRING,
    userId: DataTypes.UUID,
    deliveryAddressId: DataTypes.UUID,
    totalAmount: DataTypes.DECIMAL,
    statusCode: DataTypes.STRING,
    paymentStatusCode: DataTypes.STRING,
    notes: DataTypes.TEXT,
    deliveryDate: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
    schema: 'kredika_app',
    tableName: 'orders'
  });
  return Order;
};