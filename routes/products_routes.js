const product_controller = require('../controller/product_controller')
const upload=require('../middleware/multer')
const authenticateToken=require('../middleware/authenticateToken')

function create_products_routes(app){
   
    app.get('/all',product_controller.getProduct)
    app.get('/product/category/:categoryId',product_controller.getProductByCategory)
    app.get('/one/:id',product_controller.getProductById)
    app.post('/product',upload.single('image'),product_controller.createProduct)
    app.put('/edit/:id',product_controller.updateProduct)
    app.delete('/delete/product/:id',product_controller.deleteProduct)
   

}
 
module.exports = {create_products_routes}