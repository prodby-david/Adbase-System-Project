import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import DashNavigation from '../../components/dashnav';

const Dashboard = () => {

  const [showProducts, setShowProducts] = useState([]);

      const fetchProducts = useCallback(async () => {
        try {
          const response = await axios.get('http://localhost:4200/product');
          setShowProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      });

    useEffect(() => {
      fetchProducts(); 
    }, []);

    const handleBuyNow = async (productId) => {

      const { value: quantity } = await Swal.fire({
        title: 'Enter Quantity',
        input: 'number',
        inputLabel: 'Quantity',
        inputValue: '1',
        inputAttributes: {
          min: 1,
          max: 100,
          step: 1,
        },
        showCancelButton: true,
      });
    
      if (quantity === null || quantity === '') return;

      const parsedQuantity = parseInt(quantity);

      if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        Swal.fire('Invalid Input', 'Please enter a valid quantity greater than 0.', 'error');
        return;
      }

      try {
        const response = await axios.post(`http://localhost:4200/purchase`, {
          productId,
          quantity: parsedQuantity
        });
  
        if (response.data.success) {
          Swal.fire('Success!', 'Product purchased successfully!', 'success');
          fetchProducts();
        } else {
          Swal.fire('Oops!', response.data.message || 'Something went wrong.', 'error');
        }
      } catch (error) {
        console.error('Purchase failed:', error);
        Swal.fire('Error!', 'Unable to complete the purchase.', 'error');
      }
    };


  return (

    <div className="min-h-screen bg-bg-color">
      <DashNavigation />

      <div className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-semibold text-accent-color mb-6">Available Products</h2>

        <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {showProducts.map(product => (
                  <div key={product._id} className="bg-bg-color shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-semibold text-accent-color">{product.name}</h3>
                    <p className="text-text-color">{product.description}</p>
                    <p className="mt-2 font-bold text-lg text-accent-color">₱{product.price}</p>
                    <p className="text-sm text-text-color">Stocks: {product.stocks}</p>
                    <p className={`text-sm ${product.status === 'Out of Stock' ? 'text-red-500' : 'text-gray-500'}`}>
                      Status: {product.status}
                    </p>

                    <button
                      onClick={() => handleBuyNow(product._id)}
                      className="bg-accent-color text-text-color py-2 px-4 rounded hover:bg-opacity-80 transition mt-3"
                      >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

        {showProducts.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No products available.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard;
