import express from 'express';
import Favorites from '../../models/favorites.js';
import authToken from '../../middleware/authToken.js';

const FavoritesRouter = express.Router();

FavoritesRouter.post('/favorites', authToken,  async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  console.log('UserId:', userId);

  let favorites = await Favorites.findOne({ userId });
  if (!favorites) {
    favorites = new Favorites({ userId, productIds: [productId] });
  } else if (!favorites.productIds.includes(productId)) {
    favorites.productIds.push(productId);
  }
  await favorites.save();
  res.json({ success: true });
});

FavoritesRouter.get('/favorites', authToken, async (req, res) => {
  try {

    const userId = req.user.id; 
    const favorites = await Favorites.findOne({ userId }).populate('productIds');

    if (!favorites) {
      return res.json({ productIds: [] });
    }
    res.json({ productIds: favorites.productIds });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default FavoritesRouter;