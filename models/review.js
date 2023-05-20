'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Users)
      // define association here
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};