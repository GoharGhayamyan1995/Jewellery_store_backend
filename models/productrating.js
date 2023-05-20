'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductRating.belongsTo(models.Product)
      // define association here
    }
  }
  ProductRating.init({
    productId: DataTypes.INTEGER,
    averageRating: DataTypes.DECIMAL,
    totalRatings: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductRating',
  });
  return ProductRating;
};