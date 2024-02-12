import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import Home from './Pages/Home'
import { Routes, Route } from 'react-router'
import User from './Pages/User'
import SignUpForm from './Pages/Signup'
import Adminvc from './Pages/Admin'
import Adminmain from './Pages/Adminmain'
import GoogleMap from './Components/Map'
import Vaccinecentres from './Pages/Vaccinecentres';

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers = {
  "Content-Type": "application/json",
};      


function App() {
  const [count, setCount] = useState(0)

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
  )
}

export default App
