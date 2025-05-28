import React from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faTimes, faChartLine, faBoxOpen, faPenToSquare, faArrowRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
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
    <nav className={`fixed flex flex-col items-center justify-center gap-y-20 h-full w-[320px] bg-accent-color shadow-md shadow-main-color ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 z-50 dark:shadow-lg}`}>

      <ul className='flex flex-col items-center w-full'>

        <li className='w-full text-center text-md border-0 border-b border-t border-main-color p-5'>
          <a href="admin-dashboard" className='text-text-color' onClick={navController}><FontAwesomeIcon icon={faChartLine} className='text-main-color mr-2'/>Dashboard</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-main-color'>
          <a href="/admin-orders" className='text-text-color'><FontAwesomeIcon icon={faPenToSquare} className='text-main-color mr-2'/>Manage Orders</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-main-color'>
          <a href="/create-product" className='text-text-color'><FontAwesomeIcon icon={faPlus} className='text-main-color mr-2'/>Create Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-main-color'>
          <a href="show-products" onClick={navController} className='text-text-color'><FontAwesomeIcon icon={faBoxOpen} className='text-main-color mr-2'/>Show All Product</a>
        </li>

        <li className='w-full text-center text-md border-0 border-b-1 p-5 border-main-color'>
          <a href="" onClick={handleLogout} className='text-text-color'><FontAwesomeIcon icon={faArrowRightFromBracket} className='text-main-color mr-2'/>Sign out</a>
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
