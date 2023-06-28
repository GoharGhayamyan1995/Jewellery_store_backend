'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProducts extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartProducts.belongsTo(models.Product, {foreignKey:'productId'});
      CartProducts.belongsTo(models.Cart, {
        foreignKey: 'cartId', 
      });

   
     
      // define association here
    }
  }
  CartProducts.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartProducts',
  });
  return CartProducts;
};