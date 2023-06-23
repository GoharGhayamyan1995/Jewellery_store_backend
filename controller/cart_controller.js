const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Cart=db.Cart
const CartProducts=db.CartProducts




  const deleteCart = async (req, res) => {
    try {
      const cartId = req.params.id;
  
      // Поиск всех записей в таблице cartproduct, связанных с заданным cartid
      const cartProductsToDelete = await CartProducts.findAll({ where: { cartId } });
  
      // Удаление найденных записей из таблицы cartproduct
      await CartProducts.destroy({ where: { cartId } });
  
      // Удаление самого carta
      const rowsDeleted = await Cart.destroy({ where: { id: cartId } });
  
      if (rowsDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Cart не найден' });
      }
    } catch (error) {
      console.error('Ошибка при удалении списка carta:', error);
      res.status(500).json({ message: 'Произошла ошибка при удалении carta' });
    }
  };

const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await CartProducts.findAll({
      where: { userId },
    });

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the cart' });
  }
};
  


  
  

  module.exports={getCart,deleteCart}
