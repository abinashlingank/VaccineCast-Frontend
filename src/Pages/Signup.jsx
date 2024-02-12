import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { getUser } from '../Components/getUser';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const user = getUser();
  const navigate = useNavigate();
  const handleMain = () =>{
    if(user=='admin'){
        navigate('/admin');
    }else{
        navigate('/user');
    }
}
  return (
    <>
    <Navbar user={user}/>
    <div className="container">
    
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          mobileNumber: '',
          age: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          username: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Invalid mobile number')
            .required('Required'),
          age: Yup.number()
            .positive('Age must be a positive number')
            .integer('Age must be an integer')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
        })}
        onSubmit={async(values, { setSubmitting }) => {
          try{
          const response = await axios.post("/api/signup", values);
          if (response.data === "Username is already taken") {
            alert("Username is already taken. Please try with another username.");
          } else if (response.data === "Data received and inserted successfully") {
            sessionStorage.setItem("ActiveUser", values.username);
            alert("Registered Successfully");
            handleMain();
            // Update the user state and trigger a re-render
          } else {
            alert(response.data);
          }
          }catch(err){
            console.error("Error submitting form", err);
          }finally{
            setSubmitting(false);
          }
        }}
      >
        <Form autoComplete="off">
          <div className="left-column">
            <label className="input-label" htmlFor="firstName">First Name</label>
            <Field className="input-field" type="text" name="firstName" />
            <ErrorMessage name="firstName">{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="age">Age</label>
            <Field className="input-field" type="number" name="age" />
            <ErrorMessage className='error-message' name="age" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="username">Username</label>
            <Field className="input-field" type="text" name="username" />
            <ErrorMessage className='error-message' name="username" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="mobileNumber">Mobile Number</label>
            <Field className="input-field" type="text" name="mobileNumber" />
            <ErrorMessage className='error-message' name="mobileNumber" >{msg=><span>{msg}</span>}</ErrorMessage>
          </div>
          <div className="right-column">
            <label className="input-label" htmlFor="lastName">Last Name</label>
            <Field className="input-field" type="text" name="lastName" />
            <ErrorMessage className='error-message' name="lastName" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="email">Email</label>
            <Field className="input-field" type="email" name="email" />
            <ErrorMessage className='error-message' name="email" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="password">Password</label>
            <Field className="input-field" type="password" name="password" />
            <ErrorMessage className='error-message' name="password" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <Field className="input-field" type="password" name="confirmPassword" />
            <ErrorMessage className='error-message' name="confirmPassword" >{msg=><span>{msg}</span>}</ErrorMessage>
          </div>
          <button className="submit-btn" type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
    </>
  );
};

export default SignUpForm;
