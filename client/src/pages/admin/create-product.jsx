import React, {useEffect} from 'react'
import axios from 'axios';
import AdminNav from '../../components/admin-nav';

const CreateProduct = () => {

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await axios.get('http://localhost:3800/api/products');
                console.log(products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, []);


  return (
    <div>
      <AdminNav />
    </div>
  )
}

export default CreateProduct;
