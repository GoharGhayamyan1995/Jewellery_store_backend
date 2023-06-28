const db = require('../models');
const Product=db.Product

const getLatestProducts = async (req, res) => {
    try {
      const latestProducts = await Product.findAll({
        order: [['createdAt', 'DESC']],
        limit: 4, 
      });
  
      res.status(200).json({ latestProducts });
    } catch (error) {
      console.error('Ошибка при получении последних продуктов:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении последних продуктов' });
    }
  };
  module.exports={getLatestProducts}