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
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
      });
      Category.belongsTo(models.Category, {
        foreignKey: 'parentId',
        as: 'parent'
      });
      Category.hasMany(models.Category, {
        foreignKey: 'parentId',
        as: 'children'
      });
    }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    parentId: DataTypes.UUID,
    position: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    seoTitle: DataTypes.STRING,
    seoDescription: DataTypes.TEXT,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    schema: 'kredika_app',
    tableName: 'categories',
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
  return Category;
};