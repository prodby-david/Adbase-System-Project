import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/admin-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faPesoSign, faUser, faArrowRight, faClipboardList, faCoins, faChartLine, faUsers, faSquarePen, faTableList } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';


const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const socket = io(baseUrl);

const AdminDashboard = () => {

    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
      const fetchCounts = async () => {
        try {
          const productRes = await axios.get(`${baseUrl}/count-product`,{ withCredentials: true });
          const userRes = await axios.get(`${baseUrl}/user-count`,{ withCredentials: true });
          const res = await axios.get(`${baseUrl}/orders`,{ withCredentials: true } );
          const salesRes = await axios.get(`${baseUrl}/total-sales`,{ withCredentials: true });


          setProductCount(productRes.data.totalProducts); 
          setUserCount(userRes.data.totalUsers);
          setOrders(res.data.orders);  
          setTotalSales(salesRes.data.totalSales);

        } catch (error) {
          console.error('Failed to fetch counts', error);
        }
      };

      fetchCounts();

      socket.on('orderStatusUpdated', fetchCounts);
      socket.on('productDeleted', fetchCounts);

      return () => {
        socket.off('orderStatusUpdated');
        socket.off('productDeleted');
      };
    }, []);

  return (
    
      <div className='bg-bg-color min-h-screen'>
        
      <div className='absolute top-0'>
        <AdminNav />
      </div>

      <div className='mx-3'>

      <div className='grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 justify-items-center gap-3 mt-3 p-5 hadow-sm shadow-accent-color rounded-xl' data-aos="fade-down" data-aos-duration="1000">

      <div className='col-span-2 flex bg-accent-color w-full p-5 rounded-xl text-text-color relative' data-aos="fade-down" data-aos-duration="2000">

        <div>
          <h2 className='text-sm font-semibold lg:text-[32px]'>Welcome Admin,</h2>
          <p className='text-lg lg:text-[40px] text-main-color font-bold'>John David Gaspar</p>
          <p className='text-[20px]'>Let's make today sweet!</p>
        </div>
        
        <div className='absolute right-15 top-6 hidden lg:block' data-aos="fade-down" data-aos-duration="3000">
          <img src="happy-cookie.png" alt="energetic-cookie" className='w-[200px]'/>
        </div>

      </div>

        <div className='flex bg-accent-color w-full p-5 rounded-xl justify-between' data-aos="fade-down" data-aos-duration="2000">

          <div> 

            <h2 className='text-2xl text-text-color font-semibold'>Total Product Listed</h2>

            <div className='flex items-center mt-7 gap-x-2'>
              <FontAwesomeIcon icon={faClipboardList} className='text-[28px] text-main-color'/>
              <p className='text-text-color text-[32px] font-semibold'>{productCount}</p>
            </div>

            <div className='mt-25'>
              <a href="/show-products" className='text-main-color text-lg font-semibold hover:text-text-color'>
                Check Product Listed<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
              </a>
            </div>
          
          </div>

          <div>
            <FontAwesomeIcon icon={faSquarePen} className='text-3xl text-main-color'/> 
          </div>
         
        </div>

        <div className='bg-accent-color w-full p-5 rounded-xl flex justify-between'>

          <div>

            <h2 className='text-2xl text-text-color font-semibold'>Total Sales</h2>
            
            <div className='flex items-center mt-7 gap-x-2'>

              <FontAwesomeIcon icon={faPesoSign} className='text-[28px] text-main-color'/>
              <p className='text-text-color text-[32px] font-semibold'>{totalSales.toLocaleString()}</p>

            </div>

            <div className='mt-25'>
              <a href="product-list" className='text-main-color hover:text-text-color text-lg font-semibold'>
                View Total Sales<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
              </a>
            </div>

          </div>

          <div>
             <FontAwesomeIcon icon={faCoins} className='text-3xl text-main-color' />
          </div>

        </div>

        <div className='bg-accent-color w-full p-5 rounded-xl flex justify-between'>

          <div>

            <h2 className='text-2xl text-text-color font-semibold'>Orders</h2>
            
            <div className='flex items-center mt-7 gap-x-2'>

              <FontAwesomeIcon icon={faTableList} className='text-[28px] text-main-color' />
              <p className='text-text-color text-[32px] font-semibold'>{orders.length}</p>

            </div>

            <div className='mt-25'>
              <a href="admin-orders" className='text-main-color hover:text-text-color text-lg font-semibold'>
                Check Orders<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
              </a>
            </div>

          </div>

          <div>
             <FontAwesomeIcon icon={faChartLine} className='text-3xl text-main-color' />
          </div>

        </div>

        <div className='bg-accent-color w-full p-5 rounded-xl flex justify-between'>

        <div>

          <h2 className='text-2xl text-text-color font-semibold'>Total Users</h2>

            <div className='flex items-center mt-7 gap-x-2'>
              <FontAwesomeIcon icon={faUser} className='text-[28px] text-main-color'/>
              <p className='text-text-color text-[32px] font-semibold'>{userCount}</p>
            </div>

            <div className='mt-25'>
              <a href="product-list" className='text-main-color hover:text-text-color text-lg font-semibold'>
                View All Users<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
              </a>
            </div>
          </div>

          <div>
            <FontAwesomeIcon icon={faUsers}  className='text-[28px] text-main-color' />
          </div>

        </div>

      </div>

      </div>

    </div>
  )
}

export default AdminDashboard;
