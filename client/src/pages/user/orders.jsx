import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const socket = io(baseUrl);

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
  const [showAll, setShowAll] = useState(false);
  const handleSeeMore = () => setShowAll(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseUrl}/orders`);
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

  const handleCancelOrder = async (orderId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to cancel this order?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, cancel it!',
    cancelButtonText: 'No, keep it'
  });

  if (result.isConfirmed) {
    try {
      const res = await axios.put(`${baseUrl}/orders/${orderId}`);
      if (res.data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: 'Cancelled' } : order
          )
        );
        socket.emit('orderStatusUpdated');

        Swal.fire({
          title: 'Cancelled!',
          text: 'Your order has been cancelled.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error('Failed to cancel order', err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to cancel the order. Please try again.',
        icon: 'error'
      });
    }
  }
};


  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
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
          {(showAll ? orders : orders.slice(0, 10)).map(order => (
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
              <td className="p-5 text-center">
                {order.status === 'Pending' ? (
                  <button
                    className="mt-3.5 p-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      
      {!showAll && orders.length > 10 && (
          <div className="text-center mt-4">
            <button
              className="bg-main-color text-white px-4 py-2 rounded hover:bg-accent-color transition duration-300 cursor-pointer"
              onClick={handleSeeMore}
            >
              See More
            </button>
          </div>
        )}

    </div>
  );
};

export default UserOrders;
