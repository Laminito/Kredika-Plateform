'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductImage.init({
    productId: DataTypes.UUID,
    imageUrl: DataTypes.STRING,
    altText: DataTypes.STRING,
    position: DataTypes.INTEGER,
    isPrimary: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductImage',
    schema: 'kredika_app',
    tableName: 'product_images' 
  });
  return ProductImage;
};