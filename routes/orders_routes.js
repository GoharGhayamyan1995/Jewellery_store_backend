const orders_controller=require('../controller/orders_controller')
const authenticateToken=require('../middleware/authenticateToken')


function create_orders_routes(app){
    app.post('/orders',authenticateToken.authenticateToken,orders_controller.placeOrder)
}

module.exports={create_orders_routes}