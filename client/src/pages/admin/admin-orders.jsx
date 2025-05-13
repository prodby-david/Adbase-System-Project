import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import AdminNav from '../../components/admin-nav';

const socket = io('http://localhost:4200');

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
        const res = await axios.get('http://localhost:4200/admin-orders');
        setOrders(res.data.orders);
    };

    fetchOrders();

    socket.on('orderStatusUpdated', () => {
    fetchOrders();
    });

        return () => socket.off('orderStatusUpdated');
    }, []);

  const updateStatus = async (orderId, newStatus) => {
    await axios.put(`http://localhost:4200/admin-orders/${orderId}`, {
      status: newStatus,
    });
  };

  return (
    <>
    <AdminNav />
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order.productName}</td>
              <td className="p-2">{order.quantity}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                <select
                    value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};


export default AdminOrders;
