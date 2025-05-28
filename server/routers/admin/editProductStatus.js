import express from 'express';
import Order from '../../models/order.js';
import { io, userSocketMap } from '../../index.js';

const EditProductStatus = express.Router();

EditProductStatus.put('/admin-orders/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    const { orderId } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: normalizedStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const userId = updatedOrder.userId; 
    const socketId = userSocketMap.get(userId);

    if (socketId) {
      io.to(socketId).emit('orderStatusUpdated', updatedOrder);
    }
    
    io.emit('orderStatusUpdated', updatedOrder);

    res.json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default EditProductStatus;
