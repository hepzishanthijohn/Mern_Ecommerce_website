import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import navlogo from '../../assets/Admin_Assets/logo3.jpg'
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-item'>
      <img src={navlogo} alt="" className='nav-logo' id='logo-nav'/>
      <h2>SHOPEASY</h2>
      </div>
      <Link to='/' ><button className="login-btn" >Login</button></Link>
    </div>
  )
}

export default Navbar

//60434