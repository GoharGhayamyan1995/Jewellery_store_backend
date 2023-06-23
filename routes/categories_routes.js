const categories_controller = require('../controller/categories_controller')
// const authenticate=require('../controller/user_controller')
const checkAdmin=require('../middleware/checkadmin')

function create_categories_routes(app){
    app.get('/category', categories_controller.getCategory)
    app.get('/category/:id', categories_controller.getCategoryById)
    app.post('/category',checkAdmin.checkAdmin,categories_controller.createCategory )
    app.delete('/category/:id',checkAdmin.checkAdmin,categories_controller.deleteCategory)
    app.put('/category/:id', checkAdmin.checkAdmin,categories_controller.updateCategory)
}
 
module.exports = {create_categories_routes}