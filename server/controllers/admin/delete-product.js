import Product from "../../models/products.js";
import { io } from '../../index.js'


const DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; 
    const deletedProduct = await Product.findByIdAndDelete(productId); 

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    io.emit('productDeleted', { productId });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default DeleteProduct;
