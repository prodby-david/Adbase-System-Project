import express from 'express';
import CountProduct from '../../controllers/admin/countproduct.js';

const ProductCountRouter = express.Router();

ProductCountRouter.get('/count-product', CountProduct);


export default ProductCountRouter;