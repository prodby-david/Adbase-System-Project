import Product from "../../models/products.js";


const Purchase = async (req, res) => {

    const { productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product || product.stocks < quantity) {
        return res.status(400).json({ success: false, message: 'Not enough stocks.' });
      }
  
      product.stocks -= quantity;
      
      if (product.stocks === 0) {
        product.status = 'Out of Stock';
      }
  
      await product.save();
  
      res.json({ success: true, message: 'Purchase successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  }

  export default Purchase;