import Product from "../../models/products.js";
import { io } from '../../index.js';

const UpdateProduct = async (req, res) => {

    const { name, description, price, stocks, status } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, stocks, status },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      io.emit('productUpdated', { product: updatedProduct });
      
      console.log('Emitting productUpdated with:', updatedProduct); 

      res.json({ updatedProduct });

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

export default UpdateProduct;