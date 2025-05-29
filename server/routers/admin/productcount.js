import express from 'express';
import CountProduct from '../../controllers/admin/countproduct.js';
import authToken from '../../middleware/authToken.js';

const ProductCountRouter = express.Router();

ProductCountRouter.get('/count-product', authToken, CountProduct);


export default ProductCountRouter;