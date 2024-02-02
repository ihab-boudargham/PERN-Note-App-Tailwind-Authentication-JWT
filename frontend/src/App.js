import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import useAuthStore from './authStore';

const App = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    // Check the authentication status when the component mounts
    if (!authStore.token && window.location.pathname !== '/Login') {
      // Redirect to the login page if not authenticated and not already on the login page
      window.location.replace('/Login');
    }
  }, [authStore.token]);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
