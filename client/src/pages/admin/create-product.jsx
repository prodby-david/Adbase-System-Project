import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNav from '../../components/admin-nav';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stocks: '',
        status: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({...productData, [name]: value});
    }
 

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:4200/product', productData);

            Swal.fire({
                icon: 'success',
                title: 'Product Created',
                text: response.data.message,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });

            setProductData({
                name: '',
                description: '',
                price: '',
                stocks: '',
                status: '',
            });

        } catch (error) {
            console.error('Error creating product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message || 'Failed to create product',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
    }

  return (
      <>
      
      <div className='absolute top-0'>
       <AdminNav />
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen px-5'>

        <div className='shadow-sm shadow-main-color rounded-xl py-5 px-10 bg-bg-color w-full max-w-2xl'>

            <div>
                <h2 className='text-[28px] text-accent-color font-semibold'>Create new product</h2>
                <p className='text-md text-text-color'>Add a new product by entering the information below.</p>
            </div>

            <form className='mt-10' onSubmit={handleSubmit}>

                <div className='flex items-center justify-between'>
    
                    
                </div>

                <div className='flex items-center justify-between mt-3'>

                    <label htmlFor="product-name" className='text-md font-medium text-text-color'>
                    Product Name
                    </label>

                    <input type="text" 
                    name='name'
                    value={productData.name}
                    onChange={handleChange}
                    className='w-full max-w-sm mt-2 px-4 py-2 border border-accent-color outline-0 rounded-sm text-text-color text-md' 
                    placeholder='Enter product name'
                    />
                </div>

                <div className='flex items-center justify-between mt-3'>
                    <label htmlFor="product-description" 
                    className='text-md font-medium text-text-color'>
                    Product Description
                    </label>

                    <textarea 
                    name="description"
                    value={productData.description}
                    onChange={handleChange} 
                    id='product-description'
                    rows={3}
                    className='w-full max-w-sm mt-2 px-4 py-2 border border-accent-color outline-0 rounded-sm text-text-color text-md resize-none' 
                    placeholder='Enter product description'
                    />
                </div>

                <div className='flex items-center justify-between mt-3'>

                    <label htmlFor="product-price" className='text-md font-medium text-text-color'>
                    Price (₱)
                    </label>

                    <input type="number" 
                    name='price'
                    onChange={handleChange}
                    value={productData.price}
                    id='product-price'
                    min={0}
                    step={0.01}
                   
                    className='w-full max-w-sm mt-2 px-4 py-2 border border-accent-color outline-0 rounded-sm text-text-color text-md' 
                    />
                </div>

                <div className='flex items-center justify-between mt-3'>
                    <label htmlFor="product-stocks" className='text-md font-medium text-text-color'>
                    Stocks available
                    </label>

                    <input type="number" 
                    name='stocks'
                    value={productData.stocks}
                    onChange={handleChange}
                    id='product-stocks'
                    className='w-full max-w-sm mt-2 px-4 py-2 border border-accent-color outline-0 rounded-sm text-text-color text-md' 
                    />
                </div>

                <div className='flex justify-between items-center mt-3'>
                    <div>
                        <label htmlFor="" className='text-md font-medium text-text-color'>Product Status</label>
                    </div>
                    
                    <div className='flex gap-x-5 mt-3'>
                        {["Available", "Out of Stock", "Removed"].map((option) => (
                            <label key={option} className="mr-4">
                            <input
                                type="radio"
                                name="status"
                                value={option}
                                checked={productData.status === option}
                                onChange={(e) =>
                                    setProductData({ ...productData, status: e.target.value })
                                }
                                className="mr-1"
                            />
                            {option}
                            </label>
                        ))}
                    </div>
                
                </div>

                <div className='flex justify-end items-center mt-5 gap-x-3'>
                    <button type='button' onClick={() => navigate('/admin-dashboard')} className='p-3 border border-accent-color text-text-color rounded-md font-semibold hover:cursor-pointer hover:bg-main-color hover:text-accent-color transition'>
                        Cancel
                    </button>

                    <button type='submit' className='p-3 bg-accent-color text-text-color rounded-md font-semibold hover:cursor-pointer hover:text-main-color transition'>
                        Create 
                    </button>
                </div>

            </form>



        </div>

      </div>


      </>
  )
}

export default CreateProduct;
