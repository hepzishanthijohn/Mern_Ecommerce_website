import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [files, setFiles] = useState(null);
  const [category, setCategory] = useState("women");
  const [new_price, setNew_price] = useState('');
  const [old_price, setOld_price] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Function to handle form submission
  const Add_Product = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('category', category);
    data.append('new_price', new_price);
    data.append('old_price', old_price);
    if (files) {
      data.append('file', files[0]);
    }

    try {
      // Send request
      const response = await axios.post('https://mern-e-commerce-website-7.onrender.com/addproduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // This is important when sending FormData
        }
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error creating post:", error); // Handle error
    }
  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder='Type here'
          name='name'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={old_price}
            onChange={e => setOld_price(e.target.value)}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={new_price}
            onChange={e => setNew_price(e.target.value)}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          name="category"
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={files ? URL.createObjectURL(files[0]) : upload_area}
            alt="Upload area"
            className='addproduct-thumbnail-img'
          />
        </label>
        <input
          onChange={e => setFiles(e.target.files)}
          type="file"
          name='file'
          id='file-input'
          hidden
        />
      </div>
      <button
        onClick={Add_Product}
        className='addproduct-btn'
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
