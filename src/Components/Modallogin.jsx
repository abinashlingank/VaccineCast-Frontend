import "./Modallogin.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { getUser } from "./getUser";

function ModalLogin({ isOpen, onClose }) {
  // const user = getUser();
  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const navigate = useNavigate();
  // const handleSubmit = (values, { setSubmitting, resetForm }) => {
  //   // Here you can add your logic for authentication, e.g., sending the username and password to a server
  //   console.log('Username:', values.username);
  //   console.log('Password:', values.password);
  //   // Resetting the form fields after submission
  //   resetForm();
  //   setSubmitting(false);
  // };
  const handleSignup = () =>{
    navigate('/signup');
  }
  const handleMain = () =>{
    const user = sessionStorage.getItem("ActiveUser");
    if(user=== 'admin'){
      navigate('/admin');
    }else{
      navigate('/user');
    }
    // alert("clicked");
}
  return (
    <>
      {isOpen && (
        <div className="outer-box">
          <div className="inner-box">
            <center>
              <h2>Sign In</h2>
            <span onClick={onClose} className="close-btn">Close</span>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async(values, { setSubmitting }) => {
                  try{
                  const response = await axios.post("/api/login", values);
                  if (response.status === 200) {
                    sessionStorage.setItem("ActiveUser", values.username);
                    alert(response.data);
                    handleMain();

                  } else if (response.status === 401) {
                    alert(response.data);
                  } else {
                    console.log(response.data);
                  }
                  }catch(err){
                    console.error("Error submitting form", err);
                  }finally{
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form autoComplete="off">
                    <div>
                      <label htmlFor="username">Username</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        required
                      />
                      <ErrorMessage name="username" className="error-msg">{msg=><p>{msg}</p>}</ErrorMessage>
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        required
                      />
                      <ErrorMessage name="password" className="error-msg">{msg=><p>{msg}</p>}</ErrorMessage>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="submit-btn">Sign In</button>
                  </Form>
                )}
              </Formik>
              <h2 style={{color:'white', display:'inline', position:'relative', top:'40px'}}>Not Registered?</h2>
              <h2 style={{color:'green', position:'relative', top:'40px'}} onClick={handleSignup}>Sign Up</h2>
            </center>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalLogin;
