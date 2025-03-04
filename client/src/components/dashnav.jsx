import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowRightLong, faComments, faHouse, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../context/authContext';

const DashNavigation = () => {

    const [isOpen, setOpen] = useState(false);
    const { user } = useAuthContext();

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
          denyButtonText: 'No',
        }).then((result) => {
          if(result.isConfirmed){
            localStorage.removeItem('token');
            localStorage.removeItem('client');
            navigate('/');
          }
        });
      }


  return (

    <>
        <div className={`fixed flex flex-col gap-3 h-full w-[320px] bg-accent-color ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 z-50 dark:shadow-lg}`}>
          {user ? (
              <div>
                <p>Welcome, {user.name}</p>
              </div>
          ) : (<p>Login</p>)}

            <ul className='flex flex-col items-center my-auto w-full'>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b border-t' onClick={navController}>
                    <a href="/dashboard" onClick={navController}><FontAwesomeIcon icon={faHouse} className='mr-1'/>Dashboard</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={navController}>
                    <a href="/show-cart" onClick={navController}><FontAwesomeIcon icon={faCartShopping} className='mr-1'/>Show Cart</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={navController}>
                    <a href="/user-feedback" onClick={navController}><FontAwesomeIcon icon={faComments} className='mr-1'/>Feedback</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={handleLogout}>
                    <a href="" onClick={navController}><FontAwesomeIcon icon={faRightFromBracket} className='mr-1'/>Sign out</a>
                </li>

            </ul>
        </div>

        <div>
            <button className="fixed top-4 left-4 bg-main-color text-text-color rounded-xl px-5 py-3 shadow-md opacity-75 hover:opacity-100 z-50 cursor-pointer" onClick={() => setOpen(!isOpen)}> 
                <FontAwesomeIcon icon={isOpen ? faTimes : faArrowRightLong } className={`transform transition-all duration-300 ease-in-out text-accent-color ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
        </div>
    </>
  )
}

export default DashNavigation;
