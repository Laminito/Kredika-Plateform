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
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      Product.hasMany(models.ProductImage, {
        foreignKey: 'productId',
        as: 'images'
      });
      Product.hasMany(models.CartItem, {
        foreignKey: 'productId',
        as: 'cartItems'
      });
      Product.hasMany(models.OrderItem, {
        foreignKey: 'productId',
        as: 'orderItems'
      });
      Product.hasMany(models.InstallmentPlan, {
        foreignKey: 'productId',
        as: 'installmentPlans'
      });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    shortDescription: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    comparePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    sku: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    minStock: DataTypes.INTEGER,
    weight: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true
    },
    dimensions: DataTypes.JSON,
    categoryId: DataTypes.UUID,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    warranty: DataTypes.INTEGER,
    isFeatured: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    creditEligible: DataTypes.BOOLEAN,
    minCreditAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    maxCreditDuration: DataTypes.INTEGER,
    tags: DataTypes.JSON,
    seoTitle: DataTypes.STRING,
    seoDescription: DataTypes.TEXT,
    slug: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    schema: 'kredika_app',
    tableName: 'products',
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
  return Product;
};