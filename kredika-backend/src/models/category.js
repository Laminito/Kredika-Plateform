'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    parentId: DataTypes.UUID,
    position: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    seoTitle: DataTypes.STRING,
    seoDescription: DataTypes.TEXT,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
    schema: 'kredika_app',
    tableName: 'categories' 
  });
  return Category;
};