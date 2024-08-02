import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Popular.css';
import Item from '../Item/Item'
import data_product from '../Assets/Frontend_Assets/data'

const Popular = () => {
const [popularProducts, setPopularProducts] = useState([]);
   
useEffect(() => {
  axios.get('https://mern-e-commerce-website-7.onrender.com/popularinwomen')
      .then((response) => {
          setPopularProducts(response.data);
      })
      .catch((error) => {
          console.error('There was an error fetching the popular products!', error);
      });
}, []);

  return (
    <div className='popular'>
       <h1>POPULAR IN WOMEN</h1>
       <hr/>
       <div className="popular-item">
        {popularProducts.map((item,i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
       </div>
    </div>
  )
}

export default Popular