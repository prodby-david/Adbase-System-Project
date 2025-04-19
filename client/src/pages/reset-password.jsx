import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEyeSlash, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {

  const { token } = useParams();
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const passwordLength = password.length >= 8;
  const passwordMatch = password === confirmPassword && confirmPassword !== '';
  const isValid = passwordLength && passwordMatch;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

 
  const handleChange = (e) => {

    const { name, value } = e.target;
    
    if(name === 'password') {
      setPassword(value);
    }
    if(name === 'confirm-password') {
      setConfirmPassword(value);
    }
  }

  const handleSubmit= async (e) => {
    
    e.preventDefault();

    try{

      const resetpass = await axios.post(`http://localhost:4200/api/reset-password/${token}`, {
        password,
      }, { withCredentials: true });

      Swal.fire({
        title: 'Password Reset',
        text: resetpass.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/signin');
      })

    }
    catch(err){

      Swal.fire({
        title: 'Reset Failed',
        text: err.response?.data?.message,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/forgot-password');
      });

      setPassword('');
      setConfirmPassword('');
    }


  }

  

  return (

    <div className='flex flex-col items-center justify-center min-h-screen px-5'>

        <div className='flex flex-col border border-accent-color rounded-sm p-5 w-full max-w-md'>

            <h1 className='text-center mb-5 text-xl font-semibold text-accent-color'>Reset Password</h1>

            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>

                <div className='flex flex-col gap-2 relative'>

                    <label htmlFor="password"
                    className='text-text-color'
                    >New Password</label>

                    <input 
                    type={showPassword ? 'text' : 'password'}
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={handleChange}
                    required
                    className='p-2 outline-0 border border-accent-color rounded-md text-text-color text-sm'
                     />

                    <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash}
                    className='absolute right-5 top-11 cursor-pointer text-text-color text-sm'
                    onClick={togglePassword}
                     />

                </div>

                <div className='flex flex-col gap-2 relative'>

                    <label htmlFor="confirm-password"
                    className='text-text-color'
                    >Confirm Password</label>

                    <input 
                    type={showConfirmPassword ? 'text' : 'password'}  
                    id="confirm-password" 
                    name="confirm-password" 
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    className='p-2 outline-0 border border-accent-color rounded-md text-text-color text-sm'
                     />

                    <FontAwesomeIcon 
                    icon={showConfirmPassword ? faEye : faEyeSlash }
                    className='absolute right-5 top-11 cursor-pointer text-text-color text-sm'
                    onClick={toggleConfirmPassword}
                     />

                </div>

                <div className='flex flex-col gap-2 text-text-color'>

                  <p className={`text-sm flex items-center gap-x-1 ${passwordLength ? 'text-green-500' : 'text-text-color'}`}><FontAwesomeIcon icon={passwordLength ? faCheck : faXmark} className={`transition-all duration-500 ease-in-out ${passwordLength ? 'rotate-360' : 'rotate-0'}`}/>Password must be atleast 8 characters</p>

                  <p className={`text-sm flex items-center gap-x-1 ${passwordMatch ? 'text-green-500' : 'text-text-color'}`}><FontAwesomeIcon icon={passwordMatch ? faCheck  : faXmark} className={`transition-all duration-500 ease-in-out ${passwordMatch ? 'rotate-360' : 'rotate-0'}`}/>Password match</p>
                  
                </div>


                <button type="submit"
                disabled={!isValid}
                className={`p-3 bg-accent-color text-text-color rounded-sm w-full text-sm cursor-pointer outline-0 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >Reset Password</button>

            </form>

        </div>

    </div>

  )
}

export default ResetPassword;
