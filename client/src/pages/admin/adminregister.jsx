import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminRegistration = () => {

  const [adminData, setAdminData] = useState({
    adminusername: '',
    adminpassword: '',
    adminconfirmpass: ''
  });

  const [adminError, setAdminError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  
  const handleChange = (e) => {

    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });

    setAdminError('');
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (adminData.adminpassword !== adminData.adminconfirmpass) {
      setPasswordError('Password does not match. Please try again');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3800/api/admin-registration', adminData);

      if (response.data.message) {
        Swal.fire({
          title: 'Registration Successful',
          text: 'Press the OK button to continue',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        setAdminData({
          adminusername: '',
          adminpassword: '',
          adminconfirmpass: ''
        });

        navigate('/admin');
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <div className="flex flex-col items-center p-10 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-accent-color">Admin Registration</h2>

        <form className="flex flex-col items-center gap-y-5 mt-10 w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
            <input
              type="text"
              placeholder="Username"
              name="adminusername"
              value={adminData.adminusername} // Corrected
              onChange={handleChange}
              className={`p-2 w-full border-0 border-b border-main-color outline-0 text-sm ${adminError ? 'border-red-500' : ''}`}
              required
            />
          </div>

          <div className="w-full">
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <input
              type="password"
              placeholder="Password"
              name="adminpassword"
              value={adminData.adminpassword} // Corrected
              onChange={handleChange}
              className={`p-2 w-full border-0 border-b border-main-color outline-0 text-sm ${passwordError ? 'border-red-500' : ''}`}
              required
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              name="adminconfirmpass"
              value={adminData.adminconfirmpass} // Corrected
              onChange={handleChange}
              className={`p-2 w-full border-0 border-b border-main-color outline-0 text-sm ${passwordError ? 'border-red-500' : ''}`}
              required
            />
          </div>

          <button className="text-md p-3 mt-10 bg-accent-color hover:opacity-100 opacity-90 w-[130px] rounded-md text-text-color cursor-pointer">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
