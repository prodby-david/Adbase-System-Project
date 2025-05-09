import express from 'express';
import CreateProduct from '../../controllers/admin/create-product.js';
import ShowProduct from '../../controllers/admin/show-product.js';
import DeleteProduct from '../../controllers/admin/delete-product.js';
import UpdateProduct from '../../controllers/admin/update-product.js';
import upload from '../../middleware/upload.js';


const ProductRouter = express.Router();

ProductRouter.post('/create-product', upload.single('image'), CreateProduct);

ProductRouter.get('/product', ShowProduct);

ProductRouter.put('/product/:id', UpdateProduct);

ProductRouter.delete("/product/:id", DeleteProduct);


export default ProductRouter;