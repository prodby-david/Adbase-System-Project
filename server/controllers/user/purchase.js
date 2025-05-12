import Product from "../../models/products.js";
import {io} from "../../index.js";


const Purchase = async (req, res) => {

    const { productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);

      if (!product || product.stocks < quantity) {
        return res.status(400).json({ success: false, message: 'Not enough stocks.' });
      }

      if (product.stocks < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

      if (product.stocks === 0) {
        product.status = 'Out of Stock';
      }
  
      product.stocks -= quantity;
      await product.save();

      io.emit('productUpdated', { product });
  
      res.json({ success: true, message: 'Purchase successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  }

  export default Purchase;