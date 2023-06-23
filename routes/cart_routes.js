
const cart_controller = require('../controller/cart_controller');

// Маршруты корзины
function create_cart_routes(app){
app.get('/cart', cart_controller.getCart);
app.delete('/delete/cart/:id', cart_controller.deleteCart)

}
module.exports={create_cart_routes}

