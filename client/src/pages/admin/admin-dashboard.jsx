import React from 'react'
import AdminNav from '../../components/admin-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign, faUser, faArrowRight, faClipboardList } from '@fortawesome/free-solid-svg-icons';



const AdminDashboard = () => {
  return (
      <>
        
      <div className='absolute top-0'>
        <AdminNav />
      </div>

      <div className='px-3'>

      <div className='grid grid-cols-3 grid-rows-2 justify-items-center gap-5 my-10 p-5 bg-accent-color shadow-sm shadow-accent-color rounded-xl min-h-screen' data-aos="fade-down" data-aos-duration="1000">

      <div className='col-span-2 flex bg-main-color w-full p-5 rounded-xl text-text-color relative' data-aos="fade-down" data-aos-duration="2000">

        <div>
          <h2 className='text-[32px]'>Welcome Admin,</h2>
          <p className='text-[40px] text-accent-color font-bold'>John David Gaspar</p>
          <p className='text-[20px]'>Let's make today sweet!</p>
        </div>
        
        <div className='absolute right-15' data-aos="fade-down" data-aos-duration="3000">
          <img src="happy-cookie.png" alt="energetic-cookie" className='w-[250px]'/>
        </div>

      </div>

        <div className='flex flex-col bg-main-color w-full p-5 rounded-xl'>

          <h2 className='text-2xl text-text-color font-semibold'>Total Product Listed</h2>

          <div className='flex items-center mt-7 gap-x-2'>
            <FontAwesomeIcon icon={faClipboardList} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-[32px] font-semibold'>16</p>
          </div>

          <div className='mt-25'>
            <a href="product-list" className='text-accent-color text-lg font-semibold hover:text-text-color'>
              Check Product Listed<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
            </a>
          </div>
         

        </div>

        <div className='bg-main-color w-full p-5 rounded-xl'>

          <h2 className='text-2xl text-text-color font-semibold'>Total Sales</h2>
          
          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faPesoSign} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-[32px] font-semibold'>512,357</p>

          </div>

        </div>

        <div className='bg-main-color w-full p-5 rounded-xl'>

          <h2 className='text-2xl text-text-color font-semibold'>Weekly Sales</h2>

          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faPesoSign} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-[32px] font-semibold'>25,186</p>

          </div>

        </div>

        <div className='bg-main-color w-full p-5 rounded-xl'>

        <h2 className='text-2xl text-text-color font-semibold'>Registered Users</h2>

          <div className='flex items-center mt-7 gap-x-2'>
            <FontAwesomeIcon icon={faUser} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-[32px] font-semibold'>128,092</p>
          </div>

          <div className='mt-25'>
            <a href="product-list" className='text-accent-color hover:text-text-color text-lg font-semibold'>
              View All Users<FontAwesomeIcon icon={faArrowRight} className='ml-1' />
            </a>
          </div>
         
        </div>

      </div>

      </div>

      </>
  )
}

export default AdminDashboard;
