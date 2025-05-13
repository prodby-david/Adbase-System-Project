import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:4200');


const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4200/orders`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();

      socket.on('orderStatusUpdated', fetchOrders);
      socket.on('productDeleted', fetchOrders);

      return () => {
        socket.off('productDeleted');
        socket.off('orderStatusUpdated');
      };
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-10 px-4">
      <h2 className="text-2xl font-semibold text-accent-color mb-4">Your Orders</h2>
      <table className="w-full text-left border-collapse bg-white shadow">
        <thead className="bg-accent-color text-text-color">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b text-text-color">
              <td className="p-3">{order.productName}</td>
              <td className="p-3">{order.quantity}</td>
              <td className="p-3">₱{order.totalPrice}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
