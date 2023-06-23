'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Users, { foreignKey: 'userId' });
      Order.hasMany(models.OrderProducts, { foreignKey: 'orderId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    paymentCard: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    address: DataTypes.STRING,
    totalAmount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};