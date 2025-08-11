import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Login from './pages/login'
import SignUp from './pages/SignUp'


function App() {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/sign-up' element={<SignUp />} />
    </Routes>

  )
}

export default App
