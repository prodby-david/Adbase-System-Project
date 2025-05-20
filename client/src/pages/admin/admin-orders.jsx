import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import AdminNav from '../../components/admin-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign } from '@fortawesome/free-solid-svg-icons';

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
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4 text-accent-color">Manage Orders</h2>
      <table className="w-full border border-main-color">
        <thead>
          <tr className="bg-accent-color text-text-color">
            <th className='p-5'>Product</th>
            <th className='p-5'>Quantity</th>
            <th className='p-5'>Total Price</th>
            <th className='p-5'>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-main-color text-text-color">
              <td className="p-4 text-center">{order.productName}</td>
              <td className="p-4 text-center">{order.quantity}</td>
              <td className='p-4 text-center'> <FontAwesomeIcon icon={faPesoSign} className='text-sm text-main-color'/>{order.totalPrice}</td>
              <td className="p-4 text-center">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className=" text-center p-2 hover:cursor-pointer text-text-color outline-0" 
                  disabled={order.status === 'Completed' || order.status === 'Cancelled'}
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
