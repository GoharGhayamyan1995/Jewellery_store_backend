'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Categories)
      Product.hasMany(models.Review)
      Product.hasOne(models.ProductRating)
      // Product.belongsToMany(models.Users, { through: 'Favorite' })
      // Product.belongsToMany(models.Cart,{through:'CartProducts'})

      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    metal: DataTypes.STRING,
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};