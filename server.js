const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./_uploads'));
const DataTypes=require('sequelize')
const Users = require('./models/users');
const user_routes=require('./routes/user_routes')
const product_routes=require('./routes/products_routes')
const categories_routes=require('./routes/categories_routes');
const cart_routes=require('./routes/cart_routes')
const favoritelist_routes=require('./routes/favoritelist_routes')

// Разрешить приложению парсить JSON и urlencoded данные
app.use(bodyParser.json());
app.use(express.json());

user_routes.create_users_routes(app)
product_routes.create_products_routes(app)
categories_routes.create_categories_routes(app)
cart_routes.create_cart_routes(app)
favoritelist_routes.create_favoritelist_routes(app)

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




app.listen(3002, () => {
  console.log('Сервер запущен на порту 3002.');
});