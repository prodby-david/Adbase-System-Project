import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {

  const [ email, setEmail ] = useState('');
  const[ loading, setLoading ] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!email) {
      Swal.fire({
        title: 'Email Required',
        text: 'Email field should not be empty.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setLoading(true);

    try{
        const response = await axios.post('http://localhost:3800/api/forgot-password', {
          email,
        }, { withCredentials: true });

            Swal.fire({
              title: 'Reset Link Sent',
              text: 'Reset link sent successfully. Please check your email.',
              icon: 'success',
              confirmButtonText: 'OK',
            });

    }catch(err){

      Swal.fire({
        title: 'Email Not Found',
        text: err.response?.data?.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });

 
      console.error("Error in forgot-password route:", err);
    }

    setLoading(false);
    setEmail('');
  }


  return (

    <>
      <a href="/signin" className='text-text-color absolute top-5 left-5 hidden lg:block hover:text-accent-color'>
        <FontAwesomeIcon icon={faChevronLeft} className='mr-1'/>Return to sign in dashboard
      </a>
        


    <div className='flex flex-col justify-center items-center min-h-screen px-5'>

        <div className='flex flex-col items-center justify-center border border-accent-color rounded-sm w-full max-w-md p-5'>

          <h2 className='font-semibold text-accent-color my-3 text-md md:text-lg'>Forgot Password</h2>

            <form className='w-full max-w-sm px-3 flex flex-col items-center justify-center gap-3' onSubmit={handleSubmit}>

              <input type="text"
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={handleChange}
              className={'w-full border border-accent-color rounded-sm p-2 my-3 text-sm md:text-md outline-0 text-text-color'}
              />

              <button className='p-3 bg-accent-color text-text-color rounded-sm w-full max-w-2xs text-sm cursor-pointer hover:opacity-85 outline-0'>Send Reset Link</button>

              {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-color">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-accent-color border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-accent-color font-medium">Processing...</p>
                  </div>
                </div>
              )}


            </form>

        </div>

    </div>

    </>
  )
}

export default ForgotPassword;
