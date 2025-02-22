import React from 'react';
import Navigation from '../components/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookie, faCookieBite} from "@fortawesome/free-solid-svg-icons";



const LandingPage = () => {
  return (
    <>
        <Navigation />

        <div className='flex items-center justify-center lg:justify-around min-h-screen '>

            <div className='flex items-center flex-col mt-20 lg:items-stretch relative '>
              <div className='block lg:hidden'>
                <FontAwesomeIcon icon={faCookie} className='text-[180px] sm:text-[200px] text-accent-color mr-20 absolute -top-10 left-6 sm:left-10 md:-top-7 md:left-23 -z-100'/>
              </div>
           
                <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lora text-text-color'>Welcome to</h2>
                <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lora text-main-color'>Ovenly Hazel</h2>
                <p className='mt-3 ml-1 text-lg sm:text-xl lg:text-2xl text-center md:text-left text-text-color'>Bite into Happiness, <br className='block md:hidden'/>One Cookie at a Time</p>
                
              <div className='mt-7 lg:mt-10'>
                   <a href="/signup" className='p-4 lg:p-5 bg-accent-color text-text-color rounded-md cursor-pointer hover:opacity-90 group'>Order Now<FontAwesomeIcon icon={faCookieBite} className='text-text-color ml-1 text-xl group-hover:animate-bounce cursor-pointer'/></a>
              </div>
            </div>


            <div className='mt-20 hidden lg:block'>
                <FontAwesomeIcon icon={faCookie} className='lg:text-[270px] text-accent-color mr-20'/>
            </div>

        </div>
    </>
        

  )
}

export default LandingPage;
