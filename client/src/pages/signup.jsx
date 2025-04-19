import React, {useState} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCookieBite, faChevronLeft} from "@fortawesome/free-solid-svg-icons";


const SignUp = () => {

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [error, setError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const emailValidation =  /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.(com|org|edu|ph)$/;
  const namesValidation = /^[a-zA-Z\s]+$/


  const handleChange = (e) => {
      const {name, value} = e.target;
      setUserData({...userData, [name]: value});

      setFirstnameError('');
      setLastnameError('');
      setEmailError('');
      setPasswordError('');
  }

  const handleSubmit = async (e) => {
    
      e.preventDefault();

      setFirstnameError('');
      setLastnameError('');
      setEmailError('');
      setPasswordError('');

      if(!namesValidation.test(userData.firstname)){
        setFirstnameError('Names should be letters and spaces only.');
        return;
      }

      if(!namesValidation.test(userData.lastname)){
        setLastnameError('Names should be letters and spaces only.');
        return;
      }

      if(!emailValidation.test(userData.email)){
        setEmailError('Email not recognized. Please enter a valid email address.');
        return;
      }

      if(userData.password !== userData.confirmpassword){
        setPasswordError('Password does not match. Please try again');
        return;
      }

      if(userData.password.length < 8){
        setPasswordError('Password must be at least 8 characters long');
        return;
      }

      try{

        const register = await axios.post('http://localhost:4200/api/signup', userData);
        console.log('User registered', register.data);

        const data = register.data;

        if(register?.data?.success){

          setUserData({
            lastname: '',
            firstname: '',
            email: '',
            password: '',
            confirmpassword: ''
          });

            Swal.fire({
              title: 'Sign up success',
              text: 'Press the OK button to proceed.',
              icon: 'success',
              confirmButtonText: 'OK'
          }).then((result) => {
              if(result.isConfirmed){
                navigate('/signin')
            }
          });
        }
        
        else{
          setError(data.message);
        }
      }
      catch(err){
        if (err.response && err.response.status === 400) {
          setEmailError(err.response.data.message);
      } else {
          console.error('Sign up failed. Something went wrong');
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
          <FontAwesomeIcon icon={faCookieBite} className='absolute top-50 right-50 text-accent-color text-[150px] flex items-center justify-center'/>
        </div>

          <div className='flex flex-col items-center'>
            <h1 className='text-lg md:text-xl lg:text-2xl text-accent-color font-semibold'>Sign up</h1>
            <p className='text-sm md:text-md lg:text-base mt-1'>Already have an account? <a href="/signin" className='text-accent-color hover:underline'>Sign in here</a></p>
          </div>

          <button className='mt-3 flex items-center justify-center gap-x-2 p-3 w-full rounded-md text-text-color bg-accent-color hover:text-main-color cursor-pointer hover:opacity-90'>
            <img src="google-icon.png" alt="google-icon" className='w-4 sm:w-5 md:w-6' />
            <p className='text-sm md:text-md lg:text-base'>Continue with google</p>
          </button>

          <div className='mt-5 flex items-center justify-center w-full'>
              <div className='h-px w-full border border-accent-color'></div>
              <div className='px-2 text-xs text-text-color'>OR</div>
              <div className='h-px w-full border border-accent-color'></div>
          </div>

          <form className='w-full z-100' onSubmit={handleSubmit}>

              <div className='pt-5 flex flex-col items-center sm:flex-row gap-x-5'>
              
                <div className='w-full flex flex-col my-2 relative'>
                  {firstnameError && <p className='text-sm text-red-500 absolute -top-5'>{firstnameError}</p>}
                    <input type="text"
                    name='firstname'
                    id='firstname'
                    value={userData.firstname}
                    onChange={handleChange}
                    placeholder='First name'
                    className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${firstnameError && !namesValidation.test(userData.firstname) ? 'border-red-500' : ''}`}
                    />
                </div>

                  
                <div className='flex flex-col items-center w-full my-2 relative'>
                  {lastnameError && <p className='text-sm text-red-500 absolute -top-5'>{lastnameError}</p>}
                    <input type="text"
                    name='lastname'
                    id='lastname'
                    value={userData.lastname}
                    onChange={handleChange}
                    placeholder='Last name'
                    className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${lastnameError && !namesValidation.test(userData.lastname) ? 'border-red-500' : ''}`}
                    />
                </div>

              </div>

              <div className='my-4 relative'>
                {emailError && <p className='text-sm text-red-500 absolute -top-5'>{emailError}</p>}
                <input type="email"
                name='email'
                id='email'
                value={userData.email}
                onChange={handleChange}
                required
                placeholder='Email' 
                className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${emailError ? 'border-red-500': ''}`}
                />
              </div>

              <div className='flex flex-col sm:flex-row gap-5 mt-5 relative'>
                <div className='w-full'>
                  <input type="password"
                  name='password'
                  id='password'
                  value={userData.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${passwordError ? 'border-red-500': ''}`}
                  />
                  {passwordError && <p className='text-sm text-red-500 absolute -top-5'>{passwordError}</p>}
                </div>
                
                <div className='w-full'>
                  <input type="password"
                  name='confirmpassword'
                  id='confirmpassword'
                  value={userData.confirmpassword}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                  className={`placeholder-text-color text-sm md:text-md lg:text-base text-text-color p-2 outline-none border border-main-color w-full max-w-xl rounded-md ${passwordError ? 'border-red-500': ''}`} />
                </div>
                
              </div>
              
              <div className='mt-5 text-right'>
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

export default SignUp;
