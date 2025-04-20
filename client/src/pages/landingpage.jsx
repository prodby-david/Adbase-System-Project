import React from 'react';
import Navigation from '../components/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookie, faCookieBite, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";



const LandingPage = () => {
  return (
    <>
        <Navigation />

        <div className='flex items-center justify-center lg:justify-around min-h-screen relative '>

            <div className='flex items-center text-center flex-col mt-20 relative'>

              <div className='block lg:hidden'>
                <FontAwesomeIcon icon={faCookie} className='text-[180px] sm:text-[200px] text-accent-color mr-20 absolute -top-10 left-6 sm:left-10 md:-top-7 md:left-23 -z-100'/>
              </div>

              <div className='flex flex-col items-center justify-center'>

                <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-lora text-text-color' data-aos="fade-right" data-aos-duration="2000">Welcome to</h2>

                  <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-lora text-main-color' data-aos="fade-left" data-aos-duration="2000">Ovenly Hazel</h2>

                  <p className='mt-3 ml-1 text-lg sm:text-xl lg:text-2xl text-center md:text-left text-text-color' data-aos="fade-up" data-aos-duration="2000">Bite into Happiness, <br className='block md:hidden'/>One Cookie at a Time
                  </p>
                  
              </div>
              
              <div className='mt-7 lg:mt-10 flex flex-col md:flex-row items-center justify-center gap-5 '>
                   <a href="/signup" className='p-4 lg:p-5 bg-accent-color text-text-color rounded-md cursor-pointer' data-aos="fade-right" data-aos-duration="2000">Order Now<FontAwesomeIcon icon={faCookieBite} className='text-text-color ml-1 text-xl cursor-pointer'/></a>

                   <a href="/about" className='text-accent-color bg-text-color p-4 lg:p-5 rounded-md cursor-pointer' data-aos="fade-left" data-aos-duration="2000">Know more <FontAwesomeIcon icon={faMagnifyingGlass}className='text-accent-color ml-1 text-xl cursor-pointer' /></a>
              </div>

            </div>
            
        </div>
    </>
        

  )
}

export default LandingPage;
