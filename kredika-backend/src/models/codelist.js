'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodeList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CodeList.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: DataTypes.STRING,
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER,
    metadata: DataTypes.JSON,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'CodeList',
    schema: 'kredika_app',
    tableName: 'code_lists',
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
  return CodeList;
};