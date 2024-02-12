import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { getUser } from '../Components/getUser';
import { useNavigate } from 'react-router-dom';

const Adminvc = () => {
  const user = getUser();
  const navigate = useNavigate();
  const handleUn = () =>{
    navigate('/');
  }
  if(user==='admin'){
  return (
    <>
    <Navbar user={user}/>
    <div className="container"> {/* Added classname AdminForm */}
    
      <h1>New Vaccination Centres</h1>
      <Formik
        initialValues={{
          centreName: '',
          latitude: '',
          totalSeats: '',
          address: '',
          functionTime: '',
          centreArea: '',
          longitude: '',
          centreHead: '',
          contactNumber: '',
          password: ''
        }}
        validationSchema={Yup.object({
          centreName: Yup.string()
            .required('Required'),
          latitude: Yup.number()
            .required('Required'),
          totalSeats: Yup.number()
            .required('Required'),
          address: Yup.string()
            .required('Required'),
          functionTime: Yup.string()
            .required('Required'),
          centreArea: Yup.string()
            .required('Required'),
          longitude: Yup.number()
            .required('Required'),
          centreHead: Yup.string()
            .required('Required'),
          contactNumber: Yup.string()
            .required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
              // console.log("crossed");
              // alert("crossed");
              // console.log(values)
              const response = await axios.post("/api/admin", values);
              // console.log("Crossed2")
              // alert("crossed2");
              if (response.status === 200) {
                  alert(response.data);
              } else {
                  alert("Failed to insert data. Please try again later.");
              }
          } catch (err) {
              console.error("Error submitting form", err);
              alert("An error occurred while submitting the form. Please try again later.");
          } finally {
              setSubmitting(false); // Make sure to always set submitting to false, regardless of success or failure.
          }
      }}
      >
        <Form>
          <div className="left-column">
            <label className="input-label" htmlFor="centreName">Centre Name</label>
            <Field className="input-field" type="text" name="centreName" placeholder="Enter centre name" />
            <ErrorMessage name="centreName">{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="latitude">Latitude</label>
            <Field className="input-field" type="number" name="latitude" placeholder="Enter latitude" />
            <ErrorMessage className='error-message' name="latitude" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="totalSeats">Total Seats</label>
            <Field className="input-field" type="number" name="totalSeats" placeholder="Enter total seats" />
            <ErrorMessage className='error-message' name="totalSeats" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="address">Address</label>
            <Field className="input-field" type="text" name="address" placeholder="Enter address" />
            <ErrorMessage className='error-message' name="address" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="functionTime">Functioning Time</label>
            <Field className="input-field" type="text" name="functionTime" placeholder="Enter Functioning Time" />
            <ErrorMessage className='error-message' name="functionTime" >{msg=><span>{msg}</span>}</ErrorMessage>
          </div>
          <div className="right-column">
            <label className="input-label" htmlFor="centreArea">Centre Area</label>
            <Field className="input-field" type="text" name="centreArea" placeholder="Enter centre area" />
            <ErrorMessage className='error-message' name="centreArea" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="longitude">Longitude</label>
            <Field className="input-field" type="number" name="longitude" placeholder="Enter longitude" />
            <ErrorMessage className='error-message' name="longitude" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="centreHead">Centre Head</label>
            <Field className="input-field" type="text" name="centreHead" placeholder="Enter centre head" />
            <ErrorMessage className='error-message' name="centreHead" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="contactNumber">Contact Number</label>
            <Field className="input-field" type="text" name="contactNumber" placeholder="Enter contact number" />
            <ErrorMessage className='error-message' name="contactNumber" >{msg=><span>{msg}</span>}</ErrorMessage>

            <label className="input-label" htmlFor="password">Password</label>
            <Field className="input-field" type="password" name="password" placeholder="Enter password" />
            <ErrorMessage className='error-message' name="password" >{msg=><span>{msg}</span>}</ErrorMessage>
          </div>
          <button type="submit" className='submit-btn'>Submit</button>
        </Form>
      </Formik>
    </div>
    </>
  );}else{
    return(<>
      {alert("Unauthorized Access")}
      </>);
  }
};

export default Adminvc;
