'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders'
      });
      User.hasOne(models.CreditProfile, {
        foreignKey: 'userId',
        as: 'creditProfile'
      });
      User.hasMany(models.UserAddress, {
        foreignKey: 'userId',
        as: 'addresses'
      });
      User.hasMany(models.Cart, {
        foreignKey: 'userId',
        as: 'carts'
      });
      User.hasMany(models.InstallmentPlan, {
        foreignKey: 'userId',
        as: 'installmentPlans'
      });
      User.hasMany(models.PaymentTransaction, {
        foreignKey: 'userId',
        as: 'paymentTransactions'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^[+]?[\d\s-()]+$/
      }
    },
    dateOfBirth: DataTypes.DATE,
    nationalId: DataTypes.STRING,
    profession: DataTypes.STRING,
    monthlyIncome: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0
      }
    },
    roleCode: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    emailVerified: DataTypes.BOOLEAN,
    phoneVerified: DataTypes.BOOLEAN,
    keycloakId: DataTypes.STRING,
    statusCode: DataTypes.STRING,
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
    modelName: 'User',
    schema: 'kredika_app',
    tableName: 'users',
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
  return User;
};