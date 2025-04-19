import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../context/adminContext';


const AdminLogin = () => {

  const [adminData, setAdminData] = useState({
    adminusername: '',
    adminpassword: ''
  });

  const { Login } = useAdminContext();


  const [error, setError] = useState('');
  const [userError, setUserError] = useState('');
  const [passError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    
    const {name, value} = e.target;
    setAdminData({...adminData, [name]: value});

    setUserError('');
    setPasswordError('');
    setError('');
    
  }


  const handleSubmit = async (e) => {

    e.preventDefault();

    setUserError('');
    setPasswordError('');

    if(!adminData.adminusername && !adminData.adminpassword){
      setError('Username and password must not be empty.');
      return;
    }

    if(!adminData.adminusername){
      setUserError('Username is required');
      return;
    }

    if(!adminData.adminpassword){
      setPasswordError('Password is required');
      return;
    }

    try {

      const adminLogin = await axios.post('http://localhost:3800/api/admin/sign-in', adminData, {withCredentials: true});

      if(adminLogin?.data?.success){
        setAdminData({
          adminusername: '',
          adminpassword: ''
        });
        
        Swal.fire({
          title: 'Login successful',
          text: 'Click OK to continue',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
        Login(adminLogin.data.admin);
         navigate('/admin-dashboard');
        });
      }

    }
    catch (err) {

      if (err.response && err.response.data.message) {
        if (err.response.data.message.includes('Admin username not found')) {
          setUserError('Admin username does not exist');
        } else if (err.response.data.message.includes('Incorrect password')) {
          setPasswordError('Incorrect password. Please try again');
        } else {
          setUserError('Login failed. Please try again.');
        } 
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }

  return (

    <div className='flex items-center justify-center min-h-screen px-5'>

      <div className='flex items-center flex-col gap-y-10 p-10 rounded-md w-full max-w-md shadow-lg'>

        <h2 className='text-xl text-accent-color font-semibold'>Admin Sign In</h2>

        <form className='flex flex-col items-center gap-y-5 w-full' onSubmit={handleSubmit}>

          <input type="text"
          name="adminusername" 
          value={adminData.adminusername}
          onChange={handleChange}
          placeholder='Username'
          className={`p-3 w-full border-0 border-b border-main-color outline-0 text-sm ${userError && 'border-red-500'} ${error && 'border-red-500'}`}
          />

          <input type="password"
          name="adminpassword"
          value={adminData.adminpassword}
          onChange={handleChange}
          placeholder='Password'
          className={`p-3 w-full border-0 border-b border-main-color outline-0 text-sm ${passError && 'border-red-500'} ${error && 'border-red-500'}`}
          />

          {userError && <p className='text-red-500 text-sm'>{userError}</p>}
          {passError && <p className='text-red-500 text-sm'>{passError}</p>}
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button className='text-md p-3 mt-6 bg-accent-color hover:opacity-100 opacity-90 w-[130px] rounded-md text-text-color cursor-pointer'>Sign In
          </button>
            
        </form>

      </div>
    </div>

  )
}

export default AdminLogin;
