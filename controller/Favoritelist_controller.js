const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Favorite=db.Favorite
const FavoriteItem=db.FavoriteItem
const Product=db.Product
const Users=db.Users

const createFavoriteList = async (req, res) => {
    try {
      const userId = req.body.userId;
      const favorite = await Favorite.create({ userId });
      console.log('Создана новая запись в модели Favorite:', favorite);
      res.status(200).json({ message: 'favoritelist успешно создана', favorite });
    } catch (error) {
      console.error('Ошибка при создании записи в модели favoritelist:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании favoritelist' });
    }
  };

  const getFavoriteList = async (req, res) => {
    try {
      const { userId } = req.query;
      const favoritelist = await FavoriteItem.findAll()
  
      res.json(favoritelist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при получении favoritelist' });
    }
  };

  const addToFavoritelist= async (req, res) => {
    try {
      const { favoriteId, productId } = req.body;
  
      // Поиск корзины по идентификатору
      const favorite = await Favorite.findByPk(favoriteId);
      if (!favorite) {
        return res.status(404).json({ message: 'favoritelist не найдена' });
      }
  
      // Проверка, существует ли уже запись 
      let favoriteItem = await FavoriteItem.findOne({
        where: { favoriteId, productId },
      });
  
      if (favoriteItem) {
      
        return res.status(400).json({ message: 'Товар уже добавлен в favoritelist' });
      } else {
        // Если товара нет в корзине, создаем новую запись
        favoriteItem = await FavoriteItem.create({
          favoriteId,
          productId,
    
        });
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при добавлении товара в favoritelist' });
    }
  };
  
  const removeFromFavorite = async (req, res) => {
    try {
      const { FavoriteItemId } = req.params;
  
      // Поиск записи товара в корзине по идентификатору
      const favoriteItem = await FavoriteItem.findByPk(FavoriteItemId);
  
      if (!favoriteItem) {
        return res.status(404).json({ message: 'Товар не найден в favoritelist' });
      }
  
      // Удаление записи товара из корзины
      await FavoriteItem.destroy();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Возникла ошибка при удалении товара из favoritelist' });
    }
  };


  module.exports={createFavoriteList, addToFavoritelist,getFavoriteList,removeFromFavorite}