const db = require('../models');
const Product=db.Product

const getLatestProducts = async (req, res) => {
    try {
      const latestProducts = await Product.findAll({
        order: [['createdAt', 'DESC']],
        limit: 4, // Укажите количество последних продуктов, которые вы хотите получить
      });
  
      res.status(200).json({ latestProducts });
    } catch (error) {
      console.error('Ошибка при получении последних продуктов:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении последних продуктов' });
    }
  };
  module.exports={getLatestProducts}