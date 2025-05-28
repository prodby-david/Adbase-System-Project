import express from 'express';
import Purchase from "../../controllers/user/purchase.js";


const PurchaseRouter = express.Router();

PurchaseRouter.post('/purchase', Purchase);


export default PurchaseRouter;