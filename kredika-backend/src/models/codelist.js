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
    type: DataTypes.STRING,
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER,
    metadata: DataTypes.JSON,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CodeList',
    schema: 'kredika_app',
    tableName: 'code_lists' 
  });
  return CodeList;
};