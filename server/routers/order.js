import express from 'express';
import Order from '../models/order.js';


const OrderRouter = express.Router();

OrderRouter.get('/admin-orders', async (req, res) => {
  try {

    const orders = await Order.find({}).populate('productId', 'name price image').sort({ createdAt: -1 });

    const mappedOrders = orders.map(order => ({
      _id: order._id,
      productName: order.productId?.name || 'Unknown Product',
      productPrice: order.productId?.price || 0,
      productImage: order.productId?.image || '',
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt
    }));

    res.json({ success: true, orders: mappedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

OrderRouter.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('productId', 'name price image')
      .sort({ createdAt: -1 });

    const mappedOrders = orders.map(order => ({
      _id: order._id,
      productName: order.productId?.name || 'Unknown Product',
      productPrice: order.productId?.price || 0,
      productImage: order.productId?.image || '',
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));

    res.json({ success: true, orders: mappedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});




export default OrderRouter;

