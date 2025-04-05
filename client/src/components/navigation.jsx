import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';



const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const navController = () => {
        setIsOpen(false);
    }


  return (

    <div className='flex items-center justify-around py-3 shadow-sm w-full fixed top-0 left-0 z-20 bg-main-color' data-aos="fade-down" data-aos-duration="2000">

        <div>
            <a href="/">
                <img src="logo.png" alt="" width={50}  className='cursor-pointer'/>
            </a>
        </div>

        <div className={`absolute top-full left-0 w-full md:flex md:relative md:w-auto md:items-center overflow-hidden transition-all duration-500 ease-in-out   ${isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}`}>

            <ul className='flex flex-col items-center md:flex-row bg-accent-color md:bg-transparent'>

                <li className='p-4' onClick={navController}>
                    <NavLink to={'/'} className={({isActive}) => `${isActive ? 'text-text-color' : ''} text-bg-color hover:text-accent-color`}>Home</NavLink>
                </li>

                <li className='p-4' onClick={navController}>
                    <NavLink to={'/about'} className={({isActive}) => `${isActive ? 'text-text-color' : ''} text-bg-color hover:text-accent-color`}>About us</NavLink>
                </li>

                <li className='p-4' onClick={navController}>
                    <NavLink to={'/feedback'} className={({isActive}) => `${isActive ? 'text-text-color ' : ''} text-bg-color hover:text-accent-color`}>Feedback</NavLink>
                </li>

                <li className='p-4' onClick={navController}>
                    <NavLink to={'/faq'} className={({isActive}) => `${isActive ? 'text-text-color ' : ''} text-bg-color hover:text-accent-color`}>FAQ</NavLink>
                </li>

            </ul>
        </div>

        <div className='md:hidden'>
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} onClick={() => (setIsOpen(!isOpen))} className={`md:hidden transform transition-all duration-300 ease-in-out text-accent-color ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </div>
        
    

        
    </div>
  )
}

export default Navigation;
