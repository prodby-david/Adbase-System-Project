import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNav from '../../components/admin-nav';
import { useNavigate } from 'react-router-dom';


const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stocks: '',
    status: '',
    image: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stocks', productData.stocks);
      formData.append('status', productData.status);
      formData.append('image', productData.image);

      const response = await axios.post(`${baseUrl}/create-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Product Created',
        text: response.data.message,
        confirmButtonText: 'OK',
      });

      setProductData({
        name: '',
        description: '',
        price: '',
        stocks: '',
        status: '',
        image: null
      });
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create product',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <div className='absolute top-0'>
        <AdminNav />
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen px-5'>

        <div className='shadow-sm shadow-main-color rounded-xl py-5 px-10 bg-bg-color w-full max-w-2xl'>

          <h2 className='text-[28px] text-accent-color font-semibold'>Create new product</h2>

          <form className='mt-10' onSubmit={handleSubmit}>

            <label className='text-md font-medium text-text-color'>Product Name</label>
            <input type="text" name='name' value={productData.name} onChange={handleChange}
              className='w-full px-4 py-2 border border-accent-color rounded-sm outline-0' placeholder='Enter product name' />

            <label className='mt-3 text-md font-medium text-text-color'>Product Description</label>
            <textarea name="description" maxLength={100} value={productData.description} onChange={handleChange} rows={3}
              className='w-full px-4 py-2 border border-accent-color rounded-sm outline-0 resize-none' placeholder='Enter product description' />

            <label className='mt-3 text-md font-medium text-text-color'>Price (₱)</label>
            <input type="number" name='price' value={productData.price} onChange={handleChange} step="0.01"
              className='w-full px-4 py-2 border border-accent-color outline-0 rounded-sm' />

            <label className='mt-3 text-md font-medium text-text-color'>Stocks Available</label>
            <input type="number" name='stocks' value={productData.stocks} onChange={handleChange}
              className='w-full px-4 py-2 border border-accent-color outline-0 rounded-sm' />

            <label className='mt-3 text-md font-medium text-text-color'>Product Status</label>
            <div className='flex gap-x-5 mt-1'>
              {["Available", "Unavailable"].map((status) => (
                <label key={status}>
                  <input type="radio" name="status" value={status} checked={productData.status === status}
                    onChange={handleChange} className='mr-1 outline-0 cursor-pointer' />
                  {status}
                </label>
              ))}
            </div>

            <label className='mt-3 text-md font-medium text-text-color'>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              name='image'
              className='w-full px-4 py-2 border border-accent-color rounded-sm cursor-pointer' 
            />

            <div className='flex justify-end gap-x-3 mt-5'>

              <button type='button' onClick={() => navigate('/admin-dashboard')}
                className='px-4 py-2 border border-accent-color text-text-color rounded-md hover:bg-main-color'>Cancel
              </button>

              <button type='submit'
                className='px-4 py-2 bg-accent-color text-white rounded-md hover:bg-main-color'>
                  Create
              </button>

            </div>

          </form>

        </div>
        
      </div>

    </>
  );
};

export default CreateProduct;
