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

      <div className='grid grid-cols-3 gap-5 mt-10 px-5 w-full'>

        <div className='col-span-2 bg-main-color h-75 w-full p-5 rounded-xl'>

        </div>

        <div className='bg-main-color h-45 w-full max-w-sm p-5 rounded-xl relative'>

          <h2 className='text-2xl text-text-color font-semibold'>Total Product Listed</h2>

          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faClipboardList} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-lg font-semibold'>16</p>

          </div>

        </div>

      </div>

      

      <div className='grid grid-cols-3 gap-5 mt-10 px-5 w-full'>

        <div className='bg-main-color h-45 w-full max-w-sm p-5 rounded-xl'>

          <h2 className='text-2xl text-text-color font-semibold'>Total Sales</h2>
          
          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faPesoSign} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-lg font-semibold'>512,357</p>

          </div>

        </div>

        <div className='bg-main-color h-45 w-full max-w-sm p-5 rounded-xl'>

          <h2 className='text-2xl text-text-color font-semibold'>Weekly Sales</h2>

          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faPesoSign} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-lg font-semibold'>25,186</p>

          </div>

        </div>

        <div className='bg-main-color h-45 w-full max-w-sm p-5 rounded-xl'>

        <h2 className='text-2xl text-text-color font-semibold'>Registered Users</h2>

          <div className='flex items-center mt-7 gap-x-2'>

            <FontAwesomeIcon icon={faUser} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-lg font-semibold'>128,092</p>

          </div>

        </div>

      </div>

      </>
  )
}

export default AdminDashboard;
