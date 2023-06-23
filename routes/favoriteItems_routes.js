const favoriteItem_controller = require('../controller/FavoriteItem_controller');
const authenticateToken=require('../middleware/authenticateToken')


// Маршруты корзины
function create_favoriteItems_routes(app){
app.post('/favoriteitem', authenticateToken.authenticateToken,favoriteItem_controller.favoriteAndFavoriteItems);
app.get("/favoriteitem/:id", favoriteItem_controller.get_favoriteItems);
app.delete('/favoriteitems/:id', favoriteItem_controller.delete_favoriteItems);



}
module.exports={create_favoriteItems_routes}