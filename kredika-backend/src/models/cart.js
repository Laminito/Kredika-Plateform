'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cartId',
        as: 'items'
      });
    }
  }
  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    statusCode: DataTypes.STRING,
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    expiresAt: DataTypes.DATE,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Cart',
    schema: 'kredika_app',
    tableName: 'carts',
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
  return Cart;
};