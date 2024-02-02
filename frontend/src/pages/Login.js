// Import necessary modules and components
import React, { useState } from 'react';
import useAuthStore from '../authStore';
import { Navigate } from 'react-router-dom';

// Login component
const Login = () => {
  // Access the authentication store
  const authStore = useAuthStore();

  // State to manage user input (email and password)
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // Function to handle the login process
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to authenticate the user
      const response = await fetch('http://localhost:8000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Authentication successful, update the authStore with the token
        const { token } = await response.json();
        authStore.login(token);
        console.log('Login Successful. Token:', token);
      } else {
        // Authentication failed, use the Navigate component to redirect to the login page
        console.error('Login failed.');
        return <Navigate to="/Login" />;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // If the user is already authenticated, navigate them to the Home page
  if (authStore.token) {
    return <Navigate to="/Home" />;
  }

  // Render the login form
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="flex w-full max-w-4xl p-8 rounded-lg shadow-2xl bg-white">
        <div className="flex flex-col justify-center w-1/2 p-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-l-lg text-white">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Welcome Back!
          </h2>
          <p className="text-lg leading-relaxed text-white">
            Login to EasyWrite and start managing your notes with ease.
          </p>
        </div>
        <div className="w-1/2 p-8 rounded-r-lg">
          <div className="text-3xl font-extrabold text-gray-800 pb-3">
            Login
          </div>
          <form onSubmit={loginUser} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-teal-500 text-black"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-teal-500 text-black"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:shadow-outline-teal active:bg-teal-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
