'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     FavoriteItem .belongsTo(models.Product, {foreignKey:'productId'});
     FavoriteItem.belongsTo(models.Favorite, {
      foreignKey: 'favoriteId', // Укажите другое имя поля для связи с моделью Cart
    });
      // define association here
    }
  }
  FavoriteItem.init({
    favoriteId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteItem',
  });
  return FavoriteItem;
};