import express from 'express';
import Order from '../models/order.js';
import Product from '../models/products.js';
import { io } from '../index.js'; 


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
    const userId = req.user._id; 

    const orders = await Order.find({ userId })
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
      createdAt: order.createdAt
    }));

    res.json({ success: true, orders: mappedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch user orders' });
  }
});


OrderRouter.put('/orders/:id', async (req, res) => {

  const userId = req.user._id;

  try {

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

     if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to cancel this order' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending orders can be cancelled' });
    }

    const product = await Product.findById(order.productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.stocks += order.quantity;

    order.status = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully' });
    io.emit('orderStatusUpdated');

  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
});





export default OrderRouter;

