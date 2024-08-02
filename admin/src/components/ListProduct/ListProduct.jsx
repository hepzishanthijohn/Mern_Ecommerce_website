import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png';
import axios from 'axios';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const response = await axios.get('https://mern-e-commerce-website-7.onrender.com/allproducts');
            setAllProducts(response.data); // Assuming response.data is an array of products
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error as needed
        }
    };

    const remove_product = async (id) => {
        try {
            await axios.post('https://mern-e-commerce-website-7.onrender.com/removeproduct', { id: id }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            await fetchInfo(); // Refresh the product list after removal
        } catch (error) {
            console.error('Error removing product:', error);
            // Handle error as needed
        }
    };

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => (
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={`https://mern-e-commerce-website-7.onrender.com/${product.image}`} alt="" className='listproduct-product-icon'/>
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => {remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                ))}
                <hr />
            </div>
        </div>
    );
};

export default ListProduct;
