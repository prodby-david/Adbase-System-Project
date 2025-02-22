import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


const Navigation = () => {

    const [isOpen, setIsOpen] = useState();

    const navController = () => {
        setIsOpen(false);
    }


  return (

    <div className='flex items-center justify-around py-3 shadow-sm w-full fixed top-0 left-0 z-20 bg-main-color'>

        <div>
            <h2>Logo</h2>
        </div>

        <div className={`absolute top-full left-0 w-full bg-darkmode-bg md:bg-transparent text-white md:text-font-color1 md:flex md:relative md:w-auto md:items-center ${isOpen ? 'block ' : 'hidden'}`}>
            <ul className='flex items-center'>
                <li className='p-4'>
                    <NavLink to={'/'} className={({isActive}) => `${isActive ? 'text-text-color' : ''} text-bg-color `}>Home</NavLink>
                </li>

                <li className='p-4'>
                    <NavLink to={'/about'} className={({isActive}) => `${isActive ? 'text-text-color' : ''} text-bg-color `}>About us</NavLink>
                </li>

                <li className='p-4'>
                    <NavLink to={'/products'} className={({isActive}) => `${isActive ? 'text-text-color ' : ''} text-bg-color `}>Products</NavLink>
                </li>

                <li className='p-4'>
                    <NavLink to={'/contacts'} className={({isActive}) => `${isActive ? 'text-text-color ' : ''} text-bg-color `}>Contacts</NavLink>
                </li>

            </ul>
        </div>
        
    

        
    </div>
  )
}

export default Navigation;
