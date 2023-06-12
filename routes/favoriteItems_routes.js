const favoriteItem_controller = require('../controller/FavoriteItem_controller');

// Маршруты корзины
function create_favoriteItems_routes(app){
app.post('/favoriteitem', favoriteItem_controller.favoriteAndFavoriteItems);
app.get("/favoriteitem/:id", favoriteItem_controller.get_favoriteItems);
app.delete('/favoriteitems/:id', favoriteItem_controller.delete_favoriteItems);



}
module.exports={create_favoriteItems_routes}