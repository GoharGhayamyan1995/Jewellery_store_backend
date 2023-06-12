const { Op } = require('sequelize');
const db = require('../models');
const Product=db.Product

const searchProducts = async (req, res) => {
  const { query } = req.body;

  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports={searchProducts}