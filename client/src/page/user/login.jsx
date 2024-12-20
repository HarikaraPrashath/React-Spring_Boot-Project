import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useLogin } from "../../hook/useLogin"

function Login() {
  // State for email and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password)
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="bg-green-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-white font-semibold mb-2">Username</label>
              <input
                type="text"
                id="username"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white text-sm">Don't have an account? 
              {/* Link to the Sign Up page */}
              <Link to="/register" className="text-green-400 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
