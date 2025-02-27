import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {

  const [adminData, setAdminData] = useState({
    adminusername: '',
    adminpassword: ''
  });

  const [userError, setUserError] = useState('');
  const [passError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    
    const {name, value} = e.target;
    setAdminData({...adminData, [name]: value});

    setUserError('');
    setPasswordError('');
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!adminData.adminusername || !adminData.adminpassword){
      setUserError('Username and password are required');
      return;
    }

    try {

      const adminLogin = await axios.post('http://localhost:3800/api/admin', adminData);

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
         navigate('/admin-dashboard');
        });
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  return (

    <div className='flex items-center justify-center min-h-screen px-5'>

      <div className='flex items-center flex-col border gap-y-10 border-accent-color p-10 rounded-md w-full max-w-md shadow-md'>

        <h2 className='text-xl text-accent-color font-semibold'>Admin Sign In</h2>

        <form className='flex flex-col items-center gap-y-5 w-full' onSubmit={handleSubmit}>

          <input type="text"
          name="adminusername"
          required
          value={adminData.adminusername}
          onChange={handleChange}
          placeholder='Username'
          className='p-3 w-full border-0 border-b border-main-color outline-0 text-sm'
          />

          <input type="password"
          name="adminpassword"
          required
          value={adminData.adminpassword}
          onChange={handleChange}
          placeholder='Password'
          className='p-3 w-full border-0 border-b border-main-color outline-0 text-sm'
          />

          <button className='text-md p-3 mt-10 bg-accent-color hover:opacity-100 opacity-90 w-[130px] rounded-md text-text-color cursor-pointer'>Sign In
          </button>
            
        </form>

      </div>
    </div>

  )
}

export default AdminLogin;
