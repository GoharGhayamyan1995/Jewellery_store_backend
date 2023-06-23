'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderProducts.belongsTo(models.Order, { foreignKey: 'orderId' });
      OrderProducts.belongsTo(models.CartProducts, { foreignKey: 'cartProductId' });
      // define association here
    }
  }
  OrderProducts.init({
    orderId: DataTypes.INTEGER,
    cartProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};