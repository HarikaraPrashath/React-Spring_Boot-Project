import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Shopping() {
  const [users, setUsers] = useState([]);

  // Fetching products data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/product/getAll")
      .then((result) => {
        setUsers(result.data.data); // Ensure correct data mapping
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl text-center my-6 text-green-700">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {users.map((product) => (
          <div
            key={product._id}
            className="flex flex-col bg-white shadow-lg border-4 border-green-600 rounded-3xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="flex-1 flex flex-col justify-between px-4 py-4">
              <div>
                <h1 className="font-bold text-gray-800 text-xl">
                  {product.productName}
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
                <p className="text-center font-bold text-xl text-green-700 mt-4">
                  {product.price} <span> =/ Rs</span>
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 text-center text-sm"
                  to={`/productDescShopping/${product._id}`}
                >
                  Get Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
