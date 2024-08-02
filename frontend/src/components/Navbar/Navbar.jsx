import React, {  useContext, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/Admin_Assets/logo3.jpg';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext)
  const menuRef = useRef();
  const navigate = useNavigate();
  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='navbar'>
        <div className="nav-logo">
        <img src={logo} alt="" id='logo-sp' />
          <p>SHOPEASY</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
          <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none"}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ? <button onClick={() => {localStorage.removeItem('auth-token');
           navigate('/')}}>Logout</button>: <Link style={{textDecoration:"none"}} to='/login'><button>Login</button></Link>}
          
          <Link style={{textDecoration:"none"}} to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar