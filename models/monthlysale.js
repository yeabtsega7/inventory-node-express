'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthlySale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonthlySale.init({
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL,
    totalQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MonthlySale',
  });
  return MonthlySale;
};