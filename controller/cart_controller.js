const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Cart=db.Cart
const CartProducts=db.CartProducts
const Product=db.Product
const Users=db.Users


const createCart = async (req, res) => {
    try {
      const userId = req.body.userId;
      const cart = await Cart.create({ userId });
      console.log('Создана новая запись в модели Cart:', cart);
      res.status(200).json({ message: 'Корзина успешно создана', cart });
    } catch (error) {
      console.error('Ошибка при создании записи в модели Cart:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании корзины' });
    }
  };
// Получение содержимого корзины
const getCart = async (req, res) => {
    try {
      const { userId } = req.query;
      const cart = await CartProducts.findAll()
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при получении корзины' });
    }
  };
  


  const addToCart= async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
  
      // Поиск корзины по идентификатору
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Корзина не найдена' });
      }
  
      // Проверка, существует ли уже запись товара в корзине
      let cartProduct = await CartProducts.findOne({
        where: { cartId, productId },
      });
  
      if (cartProduct) {
        // Если товар уже есть в корзине, обновляем количество
        cartProduct.quantity += quantity;
        await cartProduct.save();
      } else {
        // Если товара нет в корзине, создаем новую запись
        cartProduct = await CartProducts.create({
          cartId,
          productId,
          quantity,
        });
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при добавлении товара в корзину' });
    }
  };
  


  

  const removeFromCart = async (req, res) => {
    try {
      const { cartProductId } = req.params;
  
      // Поиск записи товара в корзине по идентификатору
      const cartProduct = await CartProducts.findByPk(cartProductId);
  
      if (!cartProduct) {
        return res.status(404).json({ message: 'Товар не найден в корзине' });
      }
  
      // Удаление записи товара из корзины
      await cartProduct.destroy();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при удалении товара из корзины' });
    }
  };

  module.exports={createCart,addToCart,removeFromCart,getCart}
