import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNav from '../../components/admin-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4200');

const ShowProducts = () => {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios('/api/products');
      setProducts(response.data);
    };

    fetchProducts();


    socket.on('productUpdated', (data) => {
      const updatedProduct = data.product;


      setProducts((prevProducts) => 
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });

    return () => {
      socket.off('productUpdated');
    };
  }, [socket]);

    useEffect(() => {

      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:4200/product');
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {
      try {

        const result = await Swal.fire({
          title: 'Are you sure you want to delete this product?',
          text: 'This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        });

        if(result.isConfirmed) {
          await axios.delete(`http://localhost:4200/product/${productId}`);
          setProducts(products.filter(product => product._id !== productId));
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    const editProduct = async (product) => {
      
      const { value: formValues } = await Swal.fire({
        title: 'Edit Product',
        html:
          `<input id="name" class="swal2-input" placeholder="Product Name" value="${product.name}" style="width: 80%; font-size: 16px;"/>` +
          `<input id="description" class="swal2-input" placeholder="Description" value="${product.description}"  style="width: 80%; font-size: 16px;" />` +
          `<input id="price" class="swal2-input" placeholder="Price" value="${product.price}"  style="width: 80%; font-size: 16px;" />` +
          `<input id="stocks" class="swal2-input" placeholder="Stocks" value="${product.stocks}"  style="width: 80%; font-size: 16px;" />`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          return {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            stocks: document.getElementById('stocks').value,
          };
        }
      });
  
      if (formValues) {
        
        const updatedProduct = formValues;

      try {

        const response = await axios.put(`http://localhost:4200/product/${product._id}`, updatedProduct);

        Swal.fire('Updated!', 'The product has been updated.', 'success');

        socket.emit('productUpdated', { 
          productId: product._id,
          product: response.data.updatedProduct
        });

        setProducts(products.map(p => p._id === product._id ? response.data.updatedProduct : p));
      } 
      catch (error) {
        console.error('Error updating product:', error);
        Swal.fire('Error!', 'There was an issue updating the product.', 'error');
      }

    }
  }

  return (
    <>

      <div>
          <AdminNav />
      </div>

      <div className="p-10">
      <h2 className="text-2xl font-bold text-accent-color mb-5">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (products.map(product => (
          <div key={product._id} className="bg-bg-color shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold text-accent-color">{product.name}</h3>
            <p className="text-text-color">{product.description}</p>
            <p className="mt-2 font-bold text-lg text-accent-color">₱{product.price}</p>
            <p className="text-sm text-text-color">Stocks: {product.stocks}</p>
            <p className="text-sm text-gray-500">Status: {product.status}</p>
            <FontAwesomeIcon
                icon={faEdit}
                className="text-accent-color cursor-pointer mr-3"
                onClick={() => editProduct(product)}
              />
            <FontAwesomeIcon 
            icon={faTrash} 
            className='text-accent-color cursor-pointer' 
            onClick={() => deleteProduct(product._id)} 
            />
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-500">No products available.</div>
      )}
      </div>
    </div>
      
    </>
  )
}

export default ShowProducts;
