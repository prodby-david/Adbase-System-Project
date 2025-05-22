import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import DashNavigation from '../../components/dashnav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faSpinner, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from  'socket.io-client';



const socket = io('http://localhost:4200');

const Dashboard = () => {

  const [showProducts, setShowProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [showAll, setShowAll] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const visibleProducts = showAll ? showProducts : showProducts.slice(0, 6);
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
  toast.success("Added to favorites", {
    style: {
      background: "#F4A460", 
      color: "#5C4033",     
    },
  });
};

const handleAddToCart = async(product) => {
      toast.success("Added to cart", {
        style: {
        background: "#F4A460", 
        color: "#5C4033",     
      },
      });
};
  
  const handleBuyNow = (product) => {

    setSelectedProduct(product);

      Swal.fire({
      title: 'Enter Quantity',
      html: `<p><strong>Available Stocks:</strong> ${product.stocks}</p>`,
      input: 'number',
      inputValue: 1,
      inputAttributes: {
        min: 1,
        max: product.stocks,
        step: 1
      },
      showCancelButton: true,
      inputPlaceholder: 'Enter quantity',
      confirmButtonText: 'Next',
      preConfirm: (quantity) => {
        quantity = Number(quantity);
        if (quantity <= 0) {
          Swal.showValidationMessage('Quantity must be greater than 0');
        } else if (quantity > product.stocks) {
          Swal.showValidationMessage('Not enough stocks');
        }else {
          return quantity;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
         const enteredQuantity = result.value;
        Swal.fire({
          title: 'Enter Discount Code (Optional)',
          input: 'text',
          inputPlaceholder: 'Discount code',
          showCancelButton: true,
          confirmButtonText: 'Next'
        }).then((discountResult) => {
          const enteredDiscountCode = discountResult.value || '';
          const calculatedTotal = calculateTotalPrice(product.price, enteredQuantity, enteredDiscountCode);

      
          Swal.fire({
            title: 'Confirm Purchase',  
            html: `
              <strong>Product:</strong> ${product.name} <br>
              <strong>Quantity:</strong> ${enteredQuantity} <br>
              <strong>Price per item:</strong> ₱${product.price} <br>
              <strong>Shipping Fee:</strong> ₱${deliveryOption === 'delivery' ? '60' : '0'} <br>
              <strong>Discount:</strong> ${enteredDiscountCode === 'OvenlyHazelCookies' ? '20%' : 'None'} <br>
              <strong>Total Price:</strong> ₱${calculatedTotal.toFixed(2)} <br>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm Purchase',
            cancelButtonText: 'Cancel'
          }).then((finalConfirm) => {
            if (finalConfirm.isConfirmed) {
              handlePurchase(product._id, enteredQuantity);
            }
          });
        });
      }
    });
};

  const calculateTotalPrice = (productPrice, quantity, discountCode) => {

    let price = productPrice * quantity;
    const shippingFee = deliveryOption === 'delivery' ? 60 : 0;
    price += shippingFee;

    console.log("Initial Price (without discount):", price);
    
     if (discountCode === 'OvenlyHazelCookies') {
      price = price * 0.8;
    }else if (discountCode === 'SweetCookies') {
      price = price * 0.9;
    }
    return price;
  };

  useEffect(() => {

    socket.on('productDeleted', (data) => {
      setShowProducts((prevProducts) => prevProducts.filter(product => product._id !== data.productId));
    });
    socket.on('productUpdated', handleProductUpdated);

    return () => {
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
          const products = response.data.products.map(product => {
            if (product.stocks <= 0 && product.status !== 'Out of Stock') {
              return { ...product, status: 'Out of Stock' };
            }
            return product;
          });
          setShowProducts(products.reverse());
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
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/dashboard');
            }
          });
        };
      
        socket.on('newProduct', handleNewProduct);
      
        return () => {
          socket.off('newProduct', handleNewProduct); 
        };
      }, []);

   
    const handlePurchase = async (productId, quantity) => {

      if (!quantity || quantity <= 0) {
      Swal.fire('Oops!', 'Please select a valid quantity.', 'error');
      return;
    }

      try {
        const response = await axios.post(`http://localhost:4200/purchase`, {
          productId,
          quantity,
          deliveryOption
        });
  
          if (response.data.success) {
            toast.success("🎉 Order placed successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            style: {
              background: "#60A5FA",  
              color: "#fff",
              fontWeight: 'bold'
            }
          });

          Swal.fire({
            title: 'Success!',
            text: 'Product purchased successfully!',
            icon: 'success',
            confirmButtonText: 'Check Order'
          }).then(() => {
            navigate('/orders');
          });
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

    <>

    <div className="min-h-screen bg-bg-color">

      <DashNavigation />

       <div className='bg-accent-color flex items-center justify-end gap-x-5 px-10 py-3 text-text-color sticky top-0 z-10 shadow-xs shadow-accent-color'>

        <div className="relative">
          <FontAwesomeIcon icon={faCartShopping} className='text-md cursor-pointer hover:text-main-color' />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-main-color text-text-color text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        <div className="relative">
          <FontAwesomeIcon icon={faHeart} className='text-md cursor-pointer hover:text-main-color' />
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-main-color text-text-color text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favoritesCount}
            </span>
          )}
        </div>

        <FontAwesomeIcon icon={faBell} className='text-md cursor-pointer hover:text-main-color' />
          

      </div>

      <div className="max-w-6xl mx-auto px-4 py-15">

        <h2 className="text-2xl font-semibold text-accent-color mb-6">Available Products</h2>

        <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleProducts.map(product => (
                  <div key={product._id} className="bg-bg-color shadow-md rounded-lg p-5">
                  <img src={`http://localhost:4200/uploads/${product.image}`}
                  alt={product.name}
                  className='rounded-sm mb-2 h-48 w-full object-contain'/>
                    <h3 className="text-2xl font-semibold text-accent-color">{product.name}</h3>
                    <p className="text-text-color text-sm mt-2">{product.description}</p>
                    <p className="mt-2 font-bold text-lg text-accent-color">₱{product.price}</p>
                    <p className={`text-sm ${product.status === 'Out of Stock' ? 'text-red-500' : 'text-gray-500'}`}>
                      Status: {product.status}
                    </p>

                    <div className="flex items-center justify-between mt-2 p-2">

                      <button
                        className={`bg-accent-color text-text-color py-2 px-4 rounded mt-3  transition-all ease-in-out duration-300 ${product.status === 'Unavailable' || product.status === "Out of Stock" ? 'cursor-not-allowed ' : 'cursor-pointer hover:text-accent-color hover:bg-main-color'}`}
                        disabled={product.status === 'Unavailable' || product.status === "Out of Stock"}
                        onClick={() => handleBuyNow(product)}
                        >
                        Buy Now
                      </button>

                      <div className='flex gap-4'>

                        <div className="relative group inline-block">

                          <FontAwesomeIcon icon={faCartShopping} className='text-lg text-main-color mt-3 hover:cursor-pointer hover:text-accent-color' 
                          onClick={() => {
                            setCartCount(prev => prev + 1);
                            handleAddToCart(); 
                          }}/>

                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-color text-text-color text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none w-16 text-center">
                          Add to cart
                          </span>

                        </div>
                        
                        <div className="relative group inline-block">

                          <FontAwesomeIcon icon={faHeart} className='text-lg text-main-color mt-3 hover:cursor-pointer hover:text-accent-color'
                           onClick={() => {
                              setFavoritesCount(prev => prev + 1);
                              handleAddToFavorites();
                            }}  />

                           <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-color text-text-color text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                          Add to favorites
                          </span>
                        </div>

                      </div>
       
                    </div>
                    
                  </div>
                ))}
              </div>

              {!showAll && showProducts.length > 6 && (
                <div className="text-end mt-4">
                  <button
                    onClick={() => setShowAll(true)}
                    className="text-accent-color underline font-medium transition duration-300 cursor-pointer"
                  >
                    See More
                  </button>
                </div>
              )}
            </div>

        {showProducts.length === 0 && (
          <div className="flex items-center justify-center flex-col py-20">
            <FontAwesomeIcon icon={ faSpinner } className='animate-spin text-accent-color text-6xl'/>
            <p className='text-text-color text-lg mt-3'>Hold on, your cookies are almost ready!</p>
          </div>
          
        )}
      </div>
    </div>
    </>
  )
}


export default Dashboard;
