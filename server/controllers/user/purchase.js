import Product from "../../models/products.js";
import Order from "../../models/order.js";
import { io } from "../../index.js";

const Purchase = async (req, res) => {
  
  const { productId, quantity, discountCode, deliveryOption } = req.body;

  try {
    const product = await Product.findById(productId);
    
    if (!product || product.stocks < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough stocks.' });
    }

    let totalPrice = product.price * quantity;
    if (deliveryOption === 'delivery') {
      totalPrice += 60;
    }

    if (discountCode === 'OvenlyHazelCookies') {
      totalPrice *= 0.8;
    } else if (discountCode === 'SweetCookies') {
      totalPrice *= 0.9;
    }

    const order = new Order({
      userId:  req.user.id,
      productId,
      quantity,
      totalPrice,
      discountCode,
      deliveryOption,
    });

    await order.save();

    product.stocks -= quantity;
    if (product.stocks === 0) {
      product.status = 'Out of Stock';
    }

    await product.save();

    io.emit('productUpdated', { product });
    io.emit('newOrder', { order });

    res.json({ success: true, message: 'Purchase successful.', orderId: order._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export default Purchase;
