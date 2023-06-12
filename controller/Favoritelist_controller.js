const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Favorite=db.Favorite
const FavoriteItem=db.FavoriteItem
const Product=db.Product
const Users=db.Users

const createFavoriteList = async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Проверка, существует ли список избранного для данного пользователя
      const existingFavoriteList = await Favorite.findOne({ where: { userId } });
      if (existingFavoriteList) {
        console.log('У данного пользователя уже есть список избранного:', existingFavoriteList);
        return res.status(200).json({ message: 'Список избранного уже существует', favoriteList: existingFavoriteList });
      }
  
      // Создание нового списка избранного
      const favoriteList = await Favorite.create({ userId });
      console.log('Создана новая запись в модели Favorite:', favoriteList);
      res.status(200).json({ message: 'Список избранного успешно создан', favoriteList });
    } catch (error) {
      console.error('Ошибка при создании записи в модели Favorite:', error);
      res.status(500).json({ message: 'Произошла ошибка при создании списка избранного' });
    }
  };

  const deleteFavoritelist = async (req, res) => {
    try {
      const favoriteId = req.params.id;
  
      // Поиск всех записей в таблице favoriteItems, связанных с заданным favoriteId
      const favoriteItemsToDelete = await FavoriteItem.findAll({ where: { favoriteId } });
  
      // Удаление найденных записей из таблицы favoriteItems
      await FavoriteItem.destroy({ where: { favoriteId } });
  
      // Удаление самого списка избранного (FavoriteList)
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


  module.exports={createFavoriteList, addToFavoritelist,getFavoriteList,removeFromFavorite,deleteFavoritelist}