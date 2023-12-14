// App.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';

import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/useAuth'; // Import the useAuth hook
import { ProtectedRoute } from './components/ProtectedRoute';
import Profile from './pages/Profile';


function App() {
  const { user} = useAuth();
  console.log(user)
  return (
    <div className="App bg-[#E6E7EC] min-h-screen items-center flex ">
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<TaskList />} />
        <Route path="/profile"  element={<Profile />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
