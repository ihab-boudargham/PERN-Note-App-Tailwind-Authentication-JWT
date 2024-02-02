// Import necessary modules
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuthStore from '../authStore';

// NavBar component
const NavBar = () => {
  const authStore = useAuthStore();

  const handleLogout = () => {
    authStore.logout().then(() => {
      // After successful logout, navigate to the Login page
      Navigate('/Login'); // You need to import 'Navigate' from 'react-router-dom'
    });
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-lg">
          Home
        </Link>

        <div className="flex space-x-4">
          {authStore.token ? (
            <>
              <Link
                to="/logout"
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/Register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Add a long white line under the navigation bar */}
      <div className="border-b border-white py-2"></div>
    </nav>
  );
};

export default NavBar;
