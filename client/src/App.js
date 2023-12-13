// App.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CharactersList from './pages/CharactersList';
import Character from './pages/Character';
import Search from './pages/Search';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/AuthProvider'; // Import the useAuth hook


function App() {
  const { isLoggedIn} = useAuth();


  return (
    <div className="App">
      <Routes>
        {isLoggedIn ? (
          // Redirect to '/' if logged in user tries to access /login or /register
          <>
            <Route path="/" element={<TaskList />} />
            <Route path="/:id" element={<Character />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/login"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/register"
              element={<Navigate to="/" replace />}
            />
          </>
        ) : (
          // Render the login and register components
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect to /login if not logged in and trying to access protected routes */}
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
