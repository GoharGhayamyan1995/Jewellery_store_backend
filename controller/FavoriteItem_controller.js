const db = require('../models');
// const { Cart, CartProducts, Product } = require('../models');
const Favorite=db.Favorite
const FavoriteItem=db.FavoriteItem
const Product=db.Product

async function get_favoriteItems(req, res) {
    const { id } = req.params;
    try {
      const favorite = await Favorite.findOne({ where: { userId: id } });
      if (favorite) {
        const favoriteItems = await FavoriteItem.findAll({
          where: { favoriteId: favorite.id },
          include: {
            model: Product,
          },
        });
        res.json(favoriteItems);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function favoriteAndFavoriteItems(req, res) {
    const { userId, productId } = req.body;
    try {
      let favorite = await Favorite.findOne({ where: { userId } });
      if (!favorite) {
        favorite = await Favorite.create({ userId });
      }
      let favoriteItem = await FavoriteItem.findOne({
        where: { favoriteId: favorite.id, productId },
      });
      if (!favoriteItem) {
        favoriteItem = await FavoriteItem.create({
          favoriteId: favorite.id,
          productId,
        });
      } else {
        return res.json({message:'product uje naxoditsya v favoritelist'});
      }
      res.status(200).json({ message: 'favoritelist and favorite item created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating favoritelist and favorite item' });
    }
  }

  function delete_favoriteItems(req, res){
    const {id}=req.params
    FavoriteItem.destroy({where:{id}})
    .then((favoriteItem)=>{
        res.status(201).json(favoriteItem)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}
module.exports={get_favoriteItems,favoriteAndFavoriteItems,delete_favoriteItems}