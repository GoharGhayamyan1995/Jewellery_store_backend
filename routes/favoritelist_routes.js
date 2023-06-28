const favoritelist_controller = require('../controller/Favoritelist_controller');
const authenticateToken=require('../middleware/authenticateToken')


function create_favoritelist_routes(app){
app.get('/favorite', favoritelist_controller.getFavoriteList);
app.delete('/delete/favorite/:id', favoritelist_controller.deleteFavoritelist);

}
module.exports={create_favoritelist_routes}

