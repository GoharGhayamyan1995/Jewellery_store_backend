const favoritelist_controller = require('../controller/Favoritelist_controller');

// Маршруты корзины
function create_favoritelist_routes(app){
app.post('/favorite', favoritelist_controller.createFavoriteList);
app.get('/favorite', favoritelist_controller.getFavoriteList);
app.post('/favorite/add', favoritelist_controller.addToFavoritelist);
app.delete('/favorite/:id', favoritelist_controller.removeFromFavorite);
app.delete('/delete/favorite/:id', favoritelist_controller.deleteFavoritelist);

}
module.exports={create_favoritelist_routes}

