import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../../hook/useRegister';


function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log("Form submitted with: ", { username,password,firstName,lastName});
  await register(username,password,firstName,lastName);
  };

  return (
   <div>
     <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* first name Input */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white font-semibold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* last name Input */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white font-semibold mb-2">Last name</label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 rounded-lg text-black focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* username Input */}
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

          {/*  Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-semibold mb-2"> Password</label>
            <input
              type="password"
              id="confirmPassword"
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
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">Already have an account? 
            {/* Link to the Login page */}
            <Link to="/login" className="text-green-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
   </div>
  );
}

export default Register;
