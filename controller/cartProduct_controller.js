const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Cart=db.Cart
const CartProducts=db.CartProducts
const Product=db.Product

async function get_cartProducts(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.findOne({ where: { userId: id } });
      if (cart) {
        const cartProducts = await CartProducts.findAll({
          where: { cartId: cart.id },
          include: {
            model: Product,
          },
        });
        res.json(cartProducts);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function cartAndcartProduct(req, res) {
    const { userId, productId, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }
      let cartProduct = await CartProducts.findOne({
        where: { cartId: cart.id, productId },
      });
      if (!cartProduct) {
        cartProduct = await CartProducts.create({
          cartId: cart.id,
          productId,
          quantity,
        });
      } else {
        cartProduct.quantity += quantity;
        await cartProduct.save();
      }
      res.status(200).json({ message: 'Cart and cart item created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating cart and cart item' });
    }
  }
  async function update_cartProduct_quantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
  
    try {
      const cartProduct = await CartProducts.findOne({ where: { id: id } });
  
      if (!cartProduct) {
        return res.status(404).json({ message: 'Продукт в корзине не найден' });
      }
  
      cartProduct.quantity = quantity;
      await cartProduct.save();
      if (quantity === 0) {
        await CartProducts.destroy({ where: { id: id } });
      }
      return res.status(200).json({ message: 'Количество продукта в корзине успешно обновлено' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при обновлении количества продукта в корзине' });
    }
  }

  function delete_cartProducts(req, res){
    const {id}=req.params
    CartProducts.destroy({where:{id}})
    .then((cartproducts)=>{
        res.status(201).json(cartproducts)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}
module.exports={ get_cartProducts,cartAndcartProduct,delete_cartProducts,update_cartProduct_quantity}
