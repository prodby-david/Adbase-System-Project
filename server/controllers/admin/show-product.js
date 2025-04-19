import Product from "../../models/products.js";

const ShowProduct = async (req, res) => {

    try{
        const products = await Product.find();
        res.status(200).json({success: true, products});
    }
    catch(err){
        res.status(500).json({success: false, message: err.message});
    }
};

export default ShowProduct;