import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import DashNavigation from '../../components/dashnav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { io } from  'socket.io-client';



const socket = io('http://localhost:4200');

const handleAddToFavorites = () => {
  toast.success("Added to favorites", {
    style: {
      background: "#F4A460", 
      color: "#5C4033",     
    },
  });
};

const handleAddToCart = () => {
  toast.success("Added to cart", {
    style: {
      background: "#F4A460", 
      color: "#5C4033",     
    },
  });
};



const Dashboard = () => {

  const [showProducts, setShowProducts] = useState([]);

  useEffect(() => {

    socket.on('productDeleted', (data) => {
      setShowProducts((prevProducts) => prevProducts.filter(product => product._id !== data.productId));
    });
    socket.on('productUpdated', handleProductUpdated);

    return () => {
      socket.off('productDeleted');
      socket.off('productUpdated', handleProductUpdated);
    };

    }, []);

    const handleProductUpdated = (data) => {
      const updatedProduct = data.product;
      setShowProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    };


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
      
        const handleNewProduct = (newProduct) => {
          setShowProducts((prev) => [newProduct, ...prev]);
          Swal.fire({
            title: 'New Product!',
            text: `${newProduct.name} is now available.`,
            icon: 'info',
            confirmButtonText: 'Check it out'
          });
        };
      
        socket.on('newProduct', handleNewProduct);
      
        return () => {
          socket.off('newProduct', handleNewProduct); 
        };
      }, []);

   
    const handleBuyNow = async (productId) => {

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

      <div className="max-w-6xl mx-auto px-4 py-15">

        <h2 className="text-2xl font-semibold text-accent-color mb-6">Available Products</h2>

        <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {showProducts.map(product => (
                  <div key={product._id} className="bg-bg-color shadow-md rounded-lg p-3">
                  <img src={`http://localhost:4200/uploads/${product.image}`}
                  alt={product.name}
                  className='rounded-sm mb-2 h-48 w-full object-cover'/>
                    <h3 className="text-xl font-semibold text-accent-color">{product.name}</h3>
                    <p className="text-text-color">{product.description}</p>
                    <p className="mt-2 font-bold text-lg text-accent-color">₱{product.price}</p>
                    <p className="text-sm text-text-color">Stocks: {product.stocks}</p>
                    <p className={`text-sm ${product.status === 'Out of Stock' ? 'text-red-500' : 'text-gray-500'}`}>
                      Status: {product.status}
                    </p>

                    <div className="flex items-center justify-between items-center mt-2 p-2">

                      <button
                        className="bg-accent-color text-text-color py-2 px-4 rounded hover:bg-opacity-80 transition mt-3"
                        >
                        Buy Now
                      </button>
                      
                      <div className='flex gap-4'>

                        <div className="relative group inline-block">

                          <FontAwesomeIcon icon={faCartShopping} className='text-lg text-main-color mt-3 hover:cursor-pointer hover:text-accent-color' onClick={handleAddToCart}/>

                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-color text-text-color text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none w-16 text-center">
                          Add to cart
                          </span>

                        </div>
                        
                        <div className="relative group inline-block">

                          <FontAwesomeIcon icon={faHeart} className='text-lg text-main-color mt-3 hover:cursor-pointer hover:text-accent-color' onClick={handleAddToFavorites}/>

                           <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-color text-text-color text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                          Add to favorites
                          </span>
                        </div>

                      </div>
       
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>

        {showProducts.length === 0 && (
          <div className="flex items-center justify-center flex-col py-20">
            <FontAwesomeIcon icon={ faSpinner } className='animate-spin text-accent-color text-6xl'/>
            <p className='text-text-color text-lg'>Hold on, your cookies are almost ready!</p>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default Dashboard;
