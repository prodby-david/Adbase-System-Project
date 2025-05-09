
import Product from '../../models/products.js';
import { io } from '../../index.js';

const CreateProduct = async (req, res) => {

    const { name, price, description, stocks, status } = req.body;
    const image = req.file?.filename;

    try {
        const newProduct = new Product({
           name,
           price,
           description,
           stocks,
           status,
           image
        });

        await newProduct.save();

        console.log('Emitting newProduct:', newProduct);
        io.emit('newProduct', newProduct); 
        
        res.status(201).json({ message: 'Product created successfully', product: newProduct });

    } catch(error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export default CreateProduct;