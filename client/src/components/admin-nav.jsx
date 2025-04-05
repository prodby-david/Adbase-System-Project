import React from 'react'
import { useAdminContext } from '../context/adminContext';

const AdminNav = () => {

  const { Logout } = useAdminContext();
  
  return (
    <nav className='w-[300px] bg-accent-color h-screen flex flex-col justify-center items-center'>

      <div>

      </div>

      <ul className='flex flex-col items-center w-full'>

        <li className='w-full text-center text-md border-0 border-b border-t border-text-color p-5'>
          <a href="">Dashboard</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="">Show All Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="">Create Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="">Sign out</a>
        </li>

      </ul>
      
    </nav>
  )
}

export default AdminNav;
