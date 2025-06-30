import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className='bg-[url("./assets/bgImage.svg")] bg-contain'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App
