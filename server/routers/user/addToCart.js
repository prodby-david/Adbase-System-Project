import express from 'express';
import Cart from '../../models/cart.js';
import authToken from '../../middleware/authToken.js';

const AddToCartRouter = express.Router();

AddToCartRouter.post('/cart', authToken, async (req, res) => {
  const userId = req.user._id;
  console.log('UserId:', userId);
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const index = cart.items.findIndex(item => item.productId.toString() === productId);
      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Product added to cart."  });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


export default AddToCartRouter;
