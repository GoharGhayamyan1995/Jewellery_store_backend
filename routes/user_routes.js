const user_controller = require('../controller/user_controller')

function create_users_routes(app){
   
    app.post('/register',user_controller.register)
    app.post('/login',user_controller.login)
    app.get('/verify',user_controller.verify)
    app.get('/users',user_controller.getAllUsers)
   

}
 
module.exports = {create_users_routes}