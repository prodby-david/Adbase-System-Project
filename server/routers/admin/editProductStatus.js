import express from 'express';
import Order from '../../models/order.js';
import { io } from '../../index.js';

const EditProductStatus = express.Router();

EditProductStatus.put('/admin-orders/:orderId', async (req, res) => {

  try {

    const { status } = req.body;
    const { orderId } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

  
    io.emit('orderStatusUpdated', updatedOrder); 

    res.json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {

  }
});

export default EditProductStatus;
