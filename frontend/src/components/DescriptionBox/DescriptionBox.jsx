import React from 'react';
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (122)
            </div>
            
        </div>
        <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products and services over the internet. It typically includes a product catalog with detailed descriptions, images, and prices, allowing customers to browse and select items. Customers use a shopping cart to save products they wish to purchase and proceed through a secure checkout process to enter shipping and payment information. These websites integrate payment gateways to handle transactions securely, offering various payment methods such as credit cards and online payment systems.</p>
            <p>
            User accounts enable customers to save preferences, track orders, and view purchase history. E-commerce websites feature search and filtering tools to help customers find products quickly and are designed to be responsive, ensuring a seamless experience across different devices.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox