// App.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';

import Search from './pages/Search';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/AuthProvider'; // Import the useAuth hook
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './pages/Profile';


function App() {
  const { isLoggedIn} = useAuth();
  return (
    <div className="App bg-[#E6E7EC] min-h-screen items-center flex ">
     {/* <Routes>
  {isLoggedIn ? (
    <>
      <Route path="/" element={<TaskList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
    </>
  ) : (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
    </>
  )}
</Routes> */}




          <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route element={<TaskList/>} path="/" exact/>
            </Route>
            <Route element={<Login/>} path="/login"/>
          </Routes>
 
 
    </div>
  );
}

export default App;
