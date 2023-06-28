const db = require('../models');
const Cart = db.Cart
const CartProducts = db.CartProducts




const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cartProductsToDelete = await CartProducts.findAll({ where: { cartId } });

    await CartProducts.destroy({ where: { cartId } });

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
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    console.error('Error occurred while retrieving carts:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};






module.exports = { getCart, deleteCart }
