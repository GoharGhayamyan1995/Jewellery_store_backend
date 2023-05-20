const user_controller = require('../controller/user_controller')

function create_users_routes(app){
   
    app.post('/register',user_controller.register)
    app.post('/login',user_controller.login)
   

}
 
module.exports = {create_users_routes}