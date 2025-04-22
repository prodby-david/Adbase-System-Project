import express from 'express';
import CreateProduct from '../../controllers/admin/create-product.js';
import ShowProduct from '../../controllers/admin/show-product.js';
import DeleteProduct from '../../controllers/admin/delete-product.js';
import UpdateProduct from '../../controllers/admin/update-product.js';


const ProductRouter = express.Router();

ProductRouter.post('/product', CreateProduct);

ProductRouter.get('/product', ShowProduct);

ProductRouter.put('/product/:id', UpdateProduct);

ProductRouter.delete("/product/:id", DeleteProduct);


export default ProductRouter;