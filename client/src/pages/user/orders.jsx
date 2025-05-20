import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:4200');

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-400'; 
    case 'Preparing':
      return 'bg-blue-400'; 
    case 'Out for Delivery':
      return 'bg-purple-500';
    case 'Completed':
      return 'bg-green-500'; 
    case 'Cancelled':
      return 'bg-red-500'; 
    default:
      return 'bg-gray-400'; 
  }
};

const shouldPulse = (status) => {
  return ['Pending', 'Preparing', 'Out for Delivery'].includes(status);
};


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
    <div className="max-w-5xl mx-auto pt-10 px-4">
      <h2 className="text-2xl font-semibold text-accent-color mb-4">Your Orders</h2>
      <table className="w-full text-left border-collapse bg-white shadow">
        <thead className="bg-accent-color text-text-color">
          <tr>
            <th className="p-3 text-center">Product</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Order Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b text-text-color">
              <td className="p-5 text-center">{order.productName}</td>
              <td className="p-5 text-center">{order.quantity}</td>
              <td className="p-5 text-center">₱{order.totalPrice}</td>
               <td className="p-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(order.status)} ${shouldPulse(order.status) ? 'animate-pulse' : ''}`}
                  ></div>
                  <span>{order.status}</span>
                </div>
              </td>
              <td className="p-5 text-center"><span>{new Date(order.createdAt).toLocaleString()}</span></td>
              <div>
                {order.status === 'Pending' ? (
                  <button
                    className="mt-3.5 p-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                ) : null}
              </div>
              
                      
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
