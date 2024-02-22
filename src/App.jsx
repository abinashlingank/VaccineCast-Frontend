import React, { useState, useEffect } from 'react'; // Import useEffect from React
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from "axios";
import Home from './Pages/Home';
import { Routes, Route } from 'react-router';
import User from './Pages/User';
import SignUpForm from './Pages/Signup';
import Adminvc from './Pages/Admin';
import Adminmain from './Pages/Adminmain';
import GoogleMap from './Components/Map';
import Vaccinecentres from './Pages/Vaccinecentres';

// axios.defaults.baseURL = "http://localhost:5000/";
// axios.defaults.headers = {
//   "Content-Type": "application/json",
// };    
// axios.defaults.baseURL = "https://8f0d-182-19-35-177.ngrok-free.app";
// axios.defaults.headers = {
//   "Content-Type": "application/json",
//   "ngrok-skip-browser-warning": "69420"
// };

axios.defaults.baseURL = "https://adf3-2409-40f4-39-4773-c731-b7b9-34b6-3382.ngrok-free.app";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "69420"
}; 


function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(screenWidth >= 950) {
    return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='/addvc' element={<Adminvc/>}/>
        <Route path='/admin' element={<Adminmain/>}/>
        <Route path='/test' element={<GoogleMap/>}/>
        <Route path='/vaccinecentres' element={<Vaccinecentres/>}/>
      </Routes>
    );
  } else {
    return (
      <>
      <h1>This application is only available for desktop mode right now</h1>
      <h3>Mobile Responsiveness is under progress</h3>
      </>
    );
  }
}

export default App;
