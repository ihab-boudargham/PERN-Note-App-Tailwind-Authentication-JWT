import React, { useState } from 'react';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="flex w-full max-w-4xl p-8 rounded-lg shadow-2xl bg-white">
        <div className="flex flex-col justify-center w-1/2 p-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-l-lg text-white">
          <h2 className="flex items-center text-4xl font-extrabold mb-4 text-white">Welcome to EasyWrite</h2>
          <p className="text-lg leading-relaxed text-white">
            Elevate your note-taking experience with EasyWrite. Join us and start capturing your thoughts effortlessly.
          </p>
        </div>
        <div className="w-1/2 p-8 rounded-r-lg">
          <div className="registerText text-3xl font-extrabold text-gray-800 pb-3 ">Register</div>
          <form onSubmit={registerUser} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-teal-500 text-black"
                placeholder="Enter your name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;