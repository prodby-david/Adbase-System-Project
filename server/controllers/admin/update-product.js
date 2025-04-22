import Product from "../../models/products.js";

const UpdateProduct = async (req, res) => {

    const { name, description, price, stocks } = req.body;

    try {

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, stocks },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ updatedProduct });

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

export default UpdateProduct;