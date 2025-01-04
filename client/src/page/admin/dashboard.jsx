import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import { useAuthContext } from '../../hook/useAuthContext';


function Dashboard() {
   const { user } = useAuthContext();
  const[users,setUser] = useState([])

  //fetching data and showcase in dashboard
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/products/getAllProducts"
        
      )
      .then((result) => {
        // Set the fetched data to the state
        setUser(result.data); // Ensure 'data' points to your array of users
      })
      .catch((err) => console.log(err)); // Handle any error
  }, []);
  
  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8080/products/delete/${id}`
        )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200">
          Dashboard
        </button>
        <Link to="/products">
          <button className="px-6 py-3 bg-green-400 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200">
            Products
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-700 mb-4 text-center">Showing Product Bar</h1>

        
      {/* Row-based product layout  for product show */} 
  <div className="overflow-x-auto border-2 border-green-500 rounded-3xl">
    <table className="table-auto w-full bg-white shadow-lg rounded-3xl overflow-hidden">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Price (Rs)</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
          <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
  {users.map((result, index) => (
    <tr key={result._id || index} className="border-t">
      {/* ID */}
      <td className="px-6 py-3 text-sm text-gray-700">{result.id}</td>
      {/* Product Name */}
      <td className="px-6 py-3 text-sm font-bold text-gray-800">{result.name}</td>
      {/* Description */}
      <td className="px-6 py-3 text-sm text-gray-600">{result.description}</td>
      {/* Price */}
      <td className="px-6 py-3 text-sm font-bold text-green-700">{result.price}</td>
      {/* Image */}
      <td className="px-6 py-3">
        <img
          src={result.imageUrl}
          alt={result.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      {/* Actions */}
      <td className="px-6 py-3 text-center space-x-4">
        <Link
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg"
          to={`/productsUpdate/${result.id}`}
        >
          Update
        </Link>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg"
          onClick={() => handleDelete(result.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  </div>
</div>
        
      </div>


  );
}

export default Dashboard;
