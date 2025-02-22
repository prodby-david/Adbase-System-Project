import React, { useState } from 'react'

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
                    <a href="" className='text-accent-color hover:text-text-color'>Home</a>
                </li>

                <li className='p-4'>
                    <a href="" className='text-accent-color hover:text-text-color'>About us</a>
                </li>

                <li className='p-4'>
                    <a href="" className='text-accent-color hover:text-text-color'>Products</a>
                </li>

                <li className='p-4'>
                    <a href="" className='text-accent-color hover:text-text-color'>Contacts</a>
                </li>

            </ul>
        </div>
      

        <div className='hidden md:block'>
            <a href="/signup" className='p-4 bg-accent-color text-text-color rounded-md cursor-pointer hover:opacity-90'>Order Now</a>
        </div>
    </div>
  )
}

export default Navigation;
