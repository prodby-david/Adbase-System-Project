import express from 'express';
import Purchase from "../../controllers/user/purchase.js";
import authToken from '../../middleware/authToken.js';


const PurchaseRouter = express.Router();

PurchaseRouter.post('/purchase', authToken, Purchase);


export default PurchaseRouter;