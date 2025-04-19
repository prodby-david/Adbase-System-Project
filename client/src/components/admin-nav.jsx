import React from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../context/adminContext';

const AdminNav = () => {

  const { Logout } = useAdminContext();

  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const navController = () => {
    setOpen(false);
  }

   const handleLogout = (e) => {
  
          e.preventDefault();
  
          Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'info',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            denyButtonText: 'No',
  
          }).then((result) => {
  
            if(result.isConfirmed){

              let countdown = 3;
              let timerInterval;

                Swal.fire({
                title: 'Logging out...',
                text: `This will automatically logged out in ${countdown} seconds...`,
                icon: 'success',
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  timerInterval = setInterval(() => {
                    countdown--;
                    Swal.update({
                       text: `This will automatically logged out in ${countdown} seconds...`
                    });
                    
                    if (countdown === 0) {
                      Swal.close();
                      clearInterval(timerInterval);
                      Logout();
                      navigate('/admin')
                    }
                  }, 1000);
                }
            });
          }
        });
    }
  
  return (
    <>
    <nav className={`fixed flex flex-col items-center justify-center gap-y-20 h-full w-[320px] bg-accent-color ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 z-50 dark:shadow-lg}`}>

      <div className='flex flex-col items-center'>
        <h2 className='text-xl font-semibold text-text-color'>Welcome Back, Admin</h2>
        <p className='text-sm text-text-color'>Let's make today sweet.</p>
      </div>

      <ul className='flex flex-col items-center w-full'>

        <li className='w-full text-center text-md border-0 border-b border-t border-text-color p-5'>
          <a href="" onClick={navController}>Dashboard</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="" onClick={navController}>Show All Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="/create-product">Create Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-text-color'>
          <a href="" onClick={handleLogout}>Sign out</a>
        </li>

      </ul>

    </nav>

    <div>
        <button className="fixed top-4 left-4 bg-main-color text-text-color rounded-xl px-5 py-3 shadow-md opacity-75 hover:opacity-100 z-50 cursor-pointer" onClick={() => setOpen(!isOpen)}> 
          <FontAwesomeIcon icon={isOpen ? faTimes : faArrowRightLong } className={`transform transition-all duration-300 ease-in-out text-accent-color ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
    </div>
    </>
  )
}

export default AdminNav;
