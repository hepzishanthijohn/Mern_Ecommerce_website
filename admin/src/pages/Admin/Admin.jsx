import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom';
import AddProduct from '../../components/AddProduct/AddProduct';
import ListProduct from '../../components/ListProduct/ListProduct';
import LoginSignup from '../Login/LoginSignup';
import Portal from '../Portal';
import ChooseUser from '../ChooseUser';

const Admin = () => {
  return (
    <div className='admin'>
       
       
        <Routes>
          <Route path='/' element={<LoginSignup/>} />
          <Route path='/portal' element={<Portal/>}>
        
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='listproduct' element={<ListProduct/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default Admin