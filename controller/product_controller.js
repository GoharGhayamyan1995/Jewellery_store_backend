const fs = require('fs')
const upload = require('../middleware/multer');
const db = require('../models');
const Product = db.Product;
const Categories = db.Categories
const CartProducts = db.CartProducts
const FavoriteItem = db.FavoriteItem

async function getProduct(req, res) {
  try {
    const products = await Product.findAll({
      include: {
        model: Categories,
      },
    });

    const productArray = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        metal: product.metal,
        size: product.size,
        quantity: product.quantity,
        categoryId: product.categoryId
      };
    });

    res.json({
      products: productArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

const getProductByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = req.query.page || 1;
    const limit = 8;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: { categoryId },
      offset,
      limit,
    });

    const products = rows.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      metal: product.metal,
      size: product.size,
      quantity: product.quantity,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      CategoryId: product.CategoryId
    }));

    const totalPages = Math.ceil(count / limit);

    res.json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

async function createProduct(req, res) {
  try {
    const image = `uploads/products/${req.file.filename}`;
    const { name, price, description, metal, size, quantity, categoryId } = req.body;

    const product = await Product.create({
      name: name,
      price: price,
      image: image,
      description: description,
      metal: metal,
      size: size,
      quantity: quantity,
      categoryId: categoryId
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}


async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, description, metal, size, quantity, isfavorite, categoryId } = req.body;

  if (req.file) {
    const image = `uploads/products/${req.file.filename}`;

    Product.findByPk(id).then((product) => {
      if (product) {
        const oldImage = product.image;
        fs.unlink(oldImage, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });

    Product.update(
      { name, price, image, description, metal, size, quantity, isfavorite, categoryId },
      { where: { id: id } }
    )
      .then(() => {
        res.status(200).json({ message: 'Product updated successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  } else {
    Product.update(
      { name, price, description, metal, size, quantity, isfavorite, categoryId },
      { where: { id: id } }
    )
      .then(() => {
        res.status(200).json({ message: 'Product updated successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;
  const { id } = req.params;
  try {
    const productsToDelete = await CartProducts.findAll({ where: { productId } });

    await CartProducts.destroy({ where: { productId } });

    const productsDelete = await FavoriteItem.findAll({ where: { productId } });

    await FavoriteItem.destroy({ where: { productId } });
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = { getProduct, createProduct, getProductById, deleteProduct, updateProduct, getProductByCategory }

