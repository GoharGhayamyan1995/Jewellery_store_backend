'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Review)
      Users.hasOne(models.Cart)
      Users.hasOne(models.Favorite)
      // define association here
    }
  }
  Users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    is_verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};