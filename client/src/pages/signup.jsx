import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookieBite, faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  return (

<>
  
  <a href="/" className='text-text-color absolute top-5 left-5 hidden lg:block hover:text-accent-color'>
    <FontAwesomeIcon icon={faChevronLeft} className='mr-1'/>Return to dashboard
  </a>

  <div className='flex items-center justify-center min-h-screen p-5'>

    <div className='flex flex-col items-center shadow shadow-accent-color w-full max-w-xl p-5 rounded-2xl relative'>

      <div className='hidden md:block'>
        <FontAwesomeIcon icon={faCookieBite} className='absolute top-50 right-50 text-accent-color text-[150px] flex items-center justify-center'/>
      </div>

        <div className='flex flex-col items-center'>
          <h1 className='text-lg md:text-xl lg:text-2xl text-accent-color font-semibold'>Sign up</h1>
          <p className='text-sm md:text-md lg:text-base mt-1'>Already have an account? <a href="/signin" className='text-accent-color hover:underline'>Sign in here</a></p>
        </div>

        <button className='mt-3 flex items-center justify-center gap-x-2 p-3 w-full rounded-md text-text-color bg-accent-color hover:text-main-color cursor-pointer hover:opacity-90'>
          <img src="google-icon.png" alt="google-icon" className='w-4 sm:w-5 md:w-6' />
          <p className='text-sm md:text-md lg:text-base'>Sign up with google</p>
        </button>

        <div className='mt-5 flex items-center justify-center w-full'>
            <div className='h-px w-full border border-accent-color'></div>
            <div className='px-2 text-xs text-text-color'>OR</div>
            <div className='h-px w-full border border-accent-color'></div>
        </div>

        <form className='w-full z-100'>

            <div className='mt-4 flex flex-col sm:flex-row gap-5'>
              <input type="text"
              name='firstname'
              placeholder='First name'
              className='placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md'
              />
              <input type="text"
              name='lastname'
              placeholder='Last name'
              className='placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md'
              />
            </div>

            <div className='mt-4'>
              <input type="email"
              name='email'
              required
              placeholder='Email' 
              className='placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md'
              />
            </div>

            <div className='flex flex-col sm:flex-row gap-5 mt-4'>
              <input type="password"
              name='password'
              placeholder='Password'
              className='placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md'
              />
              <input type="password"
              name='confirm-password'
              placeholder='Confirm Password'
              className='placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md' />
            </div>
            
            <div className='mt-5'>
              <a href="" className='text-text-color hover:text-accent-color text-sm underline flex justify-end'>Forgot Password?</a>
              <button className=' m-1 p-3 w-full text-sm md:text-md lg:text-base bg-accent-color text-text-color rounded-md hover:opacity-90 cursor-pointer'>
                  Submit
              </button>
            </div>
              
        </form>

      </div>
    </div>
</>

   
  )
}

export default SignIn;
