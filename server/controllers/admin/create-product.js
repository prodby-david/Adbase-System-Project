
import Product from '../../models/products.js';

const CreateProduct = async (req, res) => {

    const { name, price, image, description, stocks, status  } = req.body;

    try {
        const newProduct = new Product({
           name,
           price,
           image,
           description,
           stocks,
           status   
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export default CreateProduct;