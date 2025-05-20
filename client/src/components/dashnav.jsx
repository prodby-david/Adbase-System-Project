import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowRightLong, faComments, faHouse, faCartShopping, faRightFromBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../context/authContext';

const DashNavigation = () => {

    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '' });
    const { Logout } = useAuthContext();

    const navigate = useNavigate();



    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('client-user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  

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
              confirmButtonText: 'OK',  
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
                    navigate('/');
                  }
                }, 1000);
              },
              willClose: () => {
                clearInterval(timerInterval); 
              }
          }).then(() => {
            Logout();
            navigate('/');
          });
        }
      });
  }




  return (

    <>
        <div className={`fixed flex flex-col justify-center gap-y-20 h-full w-[320px] bg-accent-color shadow-md shadow-accent-color ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 z-100}`}>

            <div className='flex flex-col items-center p-5 text-text-color w-full'>
              <FontAwesomeIcon icon={faUserCircle} className='text-6xl'/>
              <p className='text-lg'>{user.firstname} {user.lastname}</p>
              <p className='text-sm'>{user.email}</p>
            </div>
    
            <ul className='flex flex-col items-center w-full'>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b border-t' onClick={navController}>
                    <a href="/dashboard" onClick={navController} className='text-text-color'><FontAwesomeIcon icon={faHouse} className='mr-1 text-text-color'/>Dashboard</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={navController}>
                    <a href="/orders" onClick={navController} className='text-text-color'><FontAwesomeIcon icon={faCartShopping} className='mr-1 text-text-color'/>Check Orders</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={navController}>
                    <a href="/user-feedback" onClick={navController} className='text-text-color'><FontAwesomeIcon icon={faComments} className='mr-1 text-text-color'/>Feedback</a>
                </li>

                <li className='flex flex-col items-center hover:bg-main-color p-5 w-full border-b' onClick={handleLogout}>
                    <a href="" onClick={navController} className='text-text-color'><FontAwesomeIcon icon={faRightFromBracket} className='mr-1 text-text-color'/>Sign out</a>
                </li>

            </ul>
        </div>

        <div>
            <button className="fixed top-2 left-4 bg-main-color text-text-color rounded-xl px-5 py-3 shadow-sm opacity-75 hover:opacity-100 z-50 cursor-pointer" onClick={() => setOpen(!isOpen)}> 
                <FontAwesomeIcon icon={isOpen ? faTimes : faArrowRightLong } className={`transform transition-all duration-300 ease-in-out text-accent-color ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
        </div>
    </>
  )
}

export default DashNavigation;
