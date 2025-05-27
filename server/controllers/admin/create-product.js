import fs from 'fs';
import crypto from 'crypto';
import Product from '../../models/products.js';
import { io } from '../../index.js';

const CreateProduct = async (req, res) => {

    const { name, price, description, stocks, status } = req.body;
    const image = req.file?.filename;

    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Image is required' });

    const imagePath = `uploads/${file.filename}`;
    const imageBuffer = fs.readFileSync(imagePath);
    const hash = crypto.createHash('sha256').update(imageBuffer).digest('hex');

    try {

        const existingImage = await Product.findOne({ imageHash: hash  });

        if (existingImage) {
        return res.status(400).json({ message: 'Image already used. Please choose a different image.' });
        }
        const newProduct = new Product({
           name,
           price,
           description,
           stocks,
           status,
           image: file.filename,
           imageHash: hash,
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