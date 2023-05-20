const fs=require('fs')
const upload = require('../middleware/multer');
const db = require('../models');
const Product = db.Product;

async function getProduct(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Номер страницы, по умолчанию 1
      const limit = parseInt(req.query.limit) || 10; // Количество элементов на странице, по умолчанию 10
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: startIndex,
      });
  
      const totalItems = products.count;
      const totalPages = Math.ceil(totalItems / limit);
  
      // Проверка на выход за границы страниц
      let nextPage = null;
      let prevPage = null;
      if (endIndex < totalItems) {
        nextPage = page + 1;
      }
      if (startIndex > 0) {
        prevPage = page - 1;
      }
  
      res.json({
        totalPages: totalPages,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        totalItems: totalItems,
        products: products.rows,
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
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
  
      const products = await Product.findAndCountAll({
        where: { categoryId },
        offset,
        limit,
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  async function createProduct(req, res) {
    const { name, price,description,metal,size,quantity, categoryId } = req.body;
   
    console.log(name,description)
    console.log(req)
    try {
    
      const product = await Product.create({ name, price,image:req.file.originalname,description,metal,size,quantity,categoryId });
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
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
      upload.single('image')(req, res, function (err) {
        if (err) {
          return res.status(400).json({ error: 'Ошибка загрузки файла' });
        }
    
        // Ваш код для обновления продукта
        const { id } = req.params;
        const { name, price, description, metal, size, quantity, categoryId } = req.body;
        const image = req.file; // Загруженный файл доступен через req.file
    
        Product.update({name, price, image,description,metal,size,quantity,categoryId}, {where:{id:id}}).then((product)=>{
                  res.status(201).json(product)
             }).catch((err)=>{
                 res.status(500).json({error:err.message})})
      });
    }
  //   function updateProduct(req, res){
  //     const{id}=req.params
  //     const {name, price, image,description,metal,size,quantity,isfavorite,categoryId}=req.body
  //     Product.update({name:name, price:price, image:image,description:description,metal:metal,size:size,quantity:quantity,isfavorite:isfavorite,categoryId:categoryId}, {where:{id:id}}).then((product)=>{
  //         res.status(201).json(product)
  //     }).catch((err)=>{
  //         res.status(500).json({error:err.message})
  //     })
  // }
      
    async function deleteProduct(req, res) {
      const { id } = req.params;
      try {
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
  
      module.exports={getProduct, createProduct, getProductById, deleteProduct,updateProduct,getProductByCategory}
  
    