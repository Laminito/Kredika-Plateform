'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CreditProfile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  CreditProfile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    creditScore: DataTypes.INTEGER,
    creditLimit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    availableCredit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalDebt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    defaultCount: DataTypes.INTEGER,
    lastCreditReview: DataTypes.DATE,
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
    modelName: 'CreditProfile',
    schema: 'kredika_app',
    tableName: 'credit_profiles',
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
  return CreditProfile;
};