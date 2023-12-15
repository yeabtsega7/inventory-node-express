'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailySale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DailySale.init({
    date: DataTypes.DATE,
    totalAmount: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL,
    totalQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailySale',
  });
  return DailySale;
};