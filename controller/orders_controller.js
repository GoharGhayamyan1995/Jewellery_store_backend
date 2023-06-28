const { CartProducts, Order, OrderProducts ,Product} = require('../models');
const db = require('../models');

async function placeOrder(req, res) {
  try {
    const {
      userId,
      cartProducts,
      quantity,
      address,
      postalCode,
      paymentCardNumber
    } = req.body;

    let totalAmount = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      const cartProduct = cartProducts[i];
      const product = await Product.findByPk(cartProduct.productId);
      const price = product.price;
      totalAmount += price * quantity[i];
    }
    const order = await Order.create({
      userId,
      totalAmount,
      address,
      postalCode,
      paymentCard: paymentCardNumber
    });

    for (let i = 0; i < cartProducts.length; i++) {
      const cartProduct = cartProducts[i];
      await OrderProducts.create({
        orderId: order.id,
        cartProductId: cartProduct.id,
        quantity: quantity[i]
      });

      // Remove the cart product
      await CartProducts.destroy({
        where: {
          id: cartProduct.id
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order.'
    });
  }
}



  module.exports={placeOrder}

