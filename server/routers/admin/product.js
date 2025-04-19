import express from 'express';
import CreateProduct from '../../controllers/admin/create-product.js';
import ShowProduct from '../../controllers/admin/show-product.js';

const ProductRouter = express.Router();

ProductRouter.post('/api/product', CreateProduct);

ProductRouter.get('/api/product', ShowProduct);


export default ProductRouter;