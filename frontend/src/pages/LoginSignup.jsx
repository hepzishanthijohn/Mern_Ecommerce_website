import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './CSS/LoginSignup.css';

// Validation schemas for Formik
const validationSchemas = {
  login: Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  }),
  signup: Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  })
};

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const url = state === "Login" ? 'https://mern-e-commerce-website-7.onrender.com/login' : 'https://mern-e-commerce-website-7.onrender.com/signup';
      const response = await axios.post(url, values, {
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
      console.error(`Error during ${state.toLowerCase()}:`, error);
      // Handle error as needed
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: ''
          }}
          validationSchema={validationSchemas[state.toLowerCase()]}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="loginsignup-fields">
                {state === "Sign Up" && (
                  <div>
                    <Field type="text" name="username" placeholder='Your Name' />
                    {errors.username && touched.username ? <div>{errors.username}</div> : null}
                  </div>
                )}
                <div>
                  <Field type="email" name="email" placeholder='Email Address' />
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div>
                <div>
                  <Field type="password" name="password" placeholder='Password' />
                  {errors.password && touched.password ? <div>{errors.password}</div> : null}
                </div>
              </div>
              <button type="submit">Continue</button>
            </Form>
          )}
        </Formik>
        {state === "Sign Up" ? (
          <p className='loginsignup-login'>
            Already have an account?
            <span style={{ cursor: "pointer" }} onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account?
            <span onClick={() => setState("Sign Up")} style={{ cursor: "pointer" }}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, I agree to terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
