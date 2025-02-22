import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookieBite, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Swal from 'sweetalert2'

const SignIn = () => {

  const [userData, setUserData] = useState({
        email: '',
        password: ''
  });

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {

      const {name, value} = e.target;
      setUserData({...userData, [name]: value});

      setEmailError('');
      setPasswordError('');
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!userData.email || !userData.password){
        setError('Both field required')
        return;
    }

    try{
        const login = await axios.post('http://localhost:3800/api/signin', userData, {withCredentials: true});

        if(login?.data?.success){

          setUserData({
            email: '',
            password: ''
          })

          Swal.fire({
            title: 'Login successfull',
            text: 'Click the OK button to continue.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
  }
    catch(err){

      console.error("Login error:", err);

      if(err?.response?.data?.message){

        const message = err?.response?.data?.message;

        if(message.includes("Email doesn't exist.")){
          setEmailError("Email doesn't exist.");
        }else if(message.includes('Incorrect password.')){
            setPasswordError('Incorrect password. Please try again.');
        }else{
          setError('An unexpected error occured.');
        }
         }
 
      }

  }




  return (

    <>
      
      <a href="/" className='text-text-color absolute top-5 left-5 hidden lg:block hover:text-accent-color'>
        <FontAwesomeIcon icon={faChevronLeft} className='mr-1'/>Return to dashboard
      </a>

      <div className='flex items-center justify-center min-h-screen p-5'>

        <div className='flex flex-col items-center shadow shadow-accent-color w-full max-w-xl p-5 rounded-2xl relative'>

          <div className='hidden md:block'>
            <FontAwesomeIcon icon={faCookieBite} className='absolute top-50 left-60 text-accent-color text-[110px] flex items-center justify-center'/>
          </div>

            <div className='flex flex-col items-center'>
              <h1 className='text-lg md:text-xl lg:text-2xl text-accent-color font-semibold'>Sign in</h1>
              <p className='text-sm md:text-md lg:text-base mt-1'>Dont have an account yet? <a href="/signup" className='text-accent-color hover:underline'>Sign up here</a></p>
            </div>

            <button className='mt-3 flex items-center justify-center gap-x-2 p-3 w-full rounded-md text-text-color bg-accent-color hover:text-main-color cursor-pointer hover:opacity-90'>
              <img src="google-icon.png" alt="google-icon" className='w-4 sm:w-5 md:w-6' />
              <p className='text-sm md:text-md lg:text-base'>Sign in with google</p>
            </button>

            <div className='mt-5 flex items-center justify-center w-full'>
                <div className='h-px w-full border border-accent-color'></div>
                <div className='px-2 text-xs text-text-color'>OR</div>
                <div className='h-px w-full border border-accent-color'></div>
            </div>

            <form className='w-full z-100 mt-5' onSubmit={handleSubmit}>

                <div className='mt-4'>
                  
                  <input type="email"
                  name='email'
                  id='email'
                  onChange={handleChange}
                  value={userData.email}
                  required
                  placeholder='Email' 
                  className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${emailError ? 'border-red-500' : ''}`}
                  />
                  {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                </div>

                <div className='flex flex-col sm:flex-row gap-5 mt-4'>
                  <input type="password"
                  name='password'
                  id='password'
                  value={userData.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${passwordError ? 'border-red-500' : ''}`}
                  />
                  {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
                </div>
                
                <div className='mt-5'>
                  <a href="" className='text-text-color text-sm underline flex justify-end hover:text-accent-color'>Forgot Password?</a>
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
