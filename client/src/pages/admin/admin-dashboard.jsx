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

      <div className='grid grid-cols-3 gap-5 my-10 p-5 bg-accent-color rounded-xl min-h-screen'>

      <div className='col-span-2 flex bg-main-color w-full p-5 rounded-xl text-text-color relative'>

        <div>
          <h2 className='text-[32px]'>Welcome Admin,</h2>
          <p className='text-[40px] text-accent-color font-bold'>John David Gaspar</p>
          <p className='text-[20px]'>Let's make today sweet!</p>
        </div>
        
        <div className='absolute right-15 cursor-pointer hover:animate-bounce'>
          <img src="happy-cookie.png" alt="energetic-cookie" className='w-[250px]' />
        </div>

      </div>

        <div className='bg-main-color w-full p-5 rounded-xl relative'>
          <h2 className='text-2xl text-text-color font-semibold'>Total Product Listed</h2>
          <div className='flex items-center mt-7 gap-x-2'>
            <FontAwesomeIcon icon={faClipboardList} className='text-[28px] text-accent-color'/>
            <p className='text-accent-color text-[32px] font-semibold'>16</p>
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

        </div>

      </div>

      </div>

      </>
  )
}

export default AdminDashboard;
