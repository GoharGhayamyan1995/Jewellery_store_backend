const cartProduct_controller = require('../controller/cartProduct_controller');

// Маршруты корзины
function create_cartProducts_routes(app){
app.post('/cartproduct', cartProduct_controller.cartAndcartProduct);
app.get("/cartProduct/:id", cartProduct_controller.get_cartProducts);
app.delete('/cartproduct/:id', cartProduct_controller.delete_cartProducts);
app.put('/cartProducts/:id', cartProduct_controller.update_cartProduct_quantity);


}
module.exports={create_cartProducts_routes}