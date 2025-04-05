import React, {useEffect} from 'react'
import axios from 'axios';

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

    const addProduct = async () => {
        await axios.post("/api/admin/products", newProduct);
        setNewProduct({ name: "", price: "", image: "", stock: "" });
        window.location.reload();
    };




  return (
    <div>
      
    </div>
  )
}

export default CreateProduct;
