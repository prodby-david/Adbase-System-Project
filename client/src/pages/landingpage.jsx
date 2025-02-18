import React from 'react';
import Navigation from '../components/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookie, faCookieBite} from "@fortawesome/free-solid-svg-icons";
import About from './about';


const LandingPage = () => {
  return (
    <>
        <Navigation />

        <div className='flex items-center justify-around min-h-screen'>

            <div className='flex flex-col mt-20'>
                <h2 className='text-8xl font-lora text-text-color'>Welcome to</h2>
                <h2 className='text-8xl font-lora text-main-color'>Ovenly Hazel</h2>
                <p className='mt-5 ml-3 text-xl'>Bite into Happiness, One Cookie at a Time<FontAwesomeIcon icon={faCookieBite} className='text-text-color ml-1 text-xl hover:animate-bounce cursor-pointer'/></p>
            </div>

            <div className='mt-20'>
                <FontAwesomeIcon icon={faCookie} className='text-[250px]  text-main-color mr-20'/>
            </div>

        </div>

        <About />

      
    </>
        

  )
}

export default LandingPage;
