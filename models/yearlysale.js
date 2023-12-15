'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YearlySale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  YearlySale.init({
    year: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL,
    totalQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'YearlySale',
  });
  return YearlySale;
};