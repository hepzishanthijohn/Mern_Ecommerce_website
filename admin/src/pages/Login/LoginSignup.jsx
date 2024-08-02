import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    console.log("Login Function Executed");

    try {
      const response = await axios.post('https://mern-e-commerce-website-7.onrender.com/login', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseData = response.data;
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        navigate("/portal");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error as needed
    }
  };

  const signup = async () => {
    console.log("Signup function executed");

    try {
      const response = await axios.post('https://mern-e-commerce-website-7.onrender.com/register', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseData = response.data;
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        navigate("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error as needed
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" placeholder='Your Name' name="username" value={formData.username} onChange={changeHandler} /> : null}
          <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder='Password' name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account?<span style={{ cursor: "pointer" }} onClick={() => setState("Login")}>Login here</span></p>
          :
          <p className='loginsignup-login'>Create an account?<span onClick={() => setState("Sign Up")} style={{ cursor: "pointer" }}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing , I agree to terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
