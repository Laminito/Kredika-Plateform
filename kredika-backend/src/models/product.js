'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    shortDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    comparePrice: DataTypes.DECIMAL,
    cost: DataTypes.DECIMAL,
    sku: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    minStock: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL,
    dimensions: DataTypes.JSON,
    categoryId: DataTypes.UUID,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    warranty: DataTypes.INTEGER,
    isFeatured: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    creditEligible: DataTypes.BOOLEAN,
    minCreditAmount: DataTypes.DECIMAL,
    maxCreditDuration: DataTypes.INTEGER,
    tags: DataTypes.JSON,
    seoTitle: DataTypes.STRING,
    seoDescription: DataTypes.TEXT,
    slug: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    schema: 'kredika_app',
    tableName: 'products'
  });
  return Product;
};