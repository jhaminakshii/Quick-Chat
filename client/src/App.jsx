import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import {Toaster} from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className='bg-[url("./assets/bgImage.svg")] bg-contain'>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={ authUser? <Profile />:<Navigate to = "/"/>} />
      </Routes>
    </div>
  );
}

export default App
