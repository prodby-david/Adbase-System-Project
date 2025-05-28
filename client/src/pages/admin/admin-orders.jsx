import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import AdminNav from '../../components/admin-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign } from '@fortawesome/free-solid-svg-icons';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const socket = io(baseUrl);

 
const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10);



  useEffect(() => {
    const fetchOrders = async () => {
        const res = await axios.get(`${baseUrl}/admin-orders`);
        setOrders(res.data.orders);
    };

    fetchOrders();

    socket.on('orderStatusUpdated', fetchOrders);
    socket.on('newOrder', fetchOrders);      
    socket.on('productUpdated', fetchOrders); 

    return () => {
    socket.off('orderStatusUpdated');
    socket.off('newOrder');        
    socket.off('productUpdated'); 
  };
}, []);

  const updateStatus = async (orderId, newStatus) => {
    await axios.put(`${baseUrl}/admin-orders/${orderId}`, {
      status: newStatus,
    });
  };

  return (
    <>
    <AdminNav />
      <div className="p-10">
        <h2 className="text-xl font-bold mb-4 text-accent-color">Manage Orders</h2>
        <div className="mb-4">
      <label htmlFor="statusFilter" className="mr-2 font-semibold text-main-color">Filter by Status:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 border border-main-color rounded outline-none cursor-pointer"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

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
          {orders.filter(order => statusFilter === 'All' || order.status === statusFilter)
          .slice(0,visibleCount).map((order) => (
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

      {orders.filter(order => statusFilter === 'All' || order.status === statusFilter).length > visibleCount && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="bg-main-color text-white px-4 py-2 rounded hover:bg-accent-color transition duration-300 cursor-pointer"
          >
            See More
          </button>
        </div>
      )}

    </div>
    </>
  );
};


export default AdminOrders;
