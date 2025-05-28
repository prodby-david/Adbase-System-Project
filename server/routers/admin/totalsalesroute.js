import express from 'express'; 
import TotalSales from '../../controllers/admin/totalsales.js';


const TotalSalesRouter = express.Router();


TotalSalesRouter.get('/total-sales', TotalSales);

export default TotalSalesRouter;