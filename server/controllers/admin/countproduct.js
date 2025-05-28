import Product from "../../models/products.js"

const CountProduct = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        res.status(200).json({ totalProducts });
    } catch (error) {
        console.error('Error counting products:', error);
        res.status(500).json({ message: 'Error counting products', error });
    }
};

export default CountProduct;