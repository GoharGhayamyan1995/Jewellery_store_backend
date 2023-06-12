
const cart_controller = require('../controller/cart_controller');

// Маршруты корзины
function create_cart_routes(app){
app.post('/cart', cart_controller.createCart);
app.get('/cart', cart_controller.getCart);
app.post('/cart/add', cart_controller.addToCart);
app.delete('/cart/:id', cart_controller.removeFromCart);
app.delete('/delete/cart/:id', cart_controller.deleteCart)

}
module.exports={create_cart_routes}

