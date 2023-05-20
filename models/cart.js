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
      Cart.belongsTo(models.Users)
  Cart.hasMany(models.CartProducts,{foreignKey: "CartId"})
      // define association here
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};