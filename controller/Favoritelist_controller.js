const db = require('../models');
const Favorite=db.Favorite
const FavoriteItem=db.FavoriteItem




  const deleteFavoritelist = async (req, res) => {
    try {
      const favoriteId = req.params.id;
  
      const favoriteItemsToDelete = await FavoriteItem.findAll({ where: { favoriteId } });
  
      await FavoriteItem.destroy({ where: { favoriteId } });
  
      const rowsDeleted = await Favorite.destroy({ where: { id: favoriteId } });
  
      if (rowsDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Список избранного не найден' });
      }
    } catch (error) {
      console.error('Ошибка при удалении списка избранного:', error);
      res.status(500).json({ message: 'Произошла ошибка при удалении списка избранного' });
    }
  };

  const getFavoriteList = async (req, res) => {
    try {
      // const { userId } = req.query;
      const favoritelist = await Favorite.findAll()
  
      res.json(favoritelist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при получении favoritelist' });
    }
  };

  

  module.exports={getFavoriteList,deleteFavoritelist}