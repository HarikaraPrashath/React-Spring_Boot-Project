import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PopupForm from "../components/popupForm/formPopup"; 
import { useAuthContext } from '../../src/hook/useAuthContext';

function ShoppingDescPage() {
  const { user } = useAuthContext();
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Fetch product details based on the ID
  useEffect(() => {
    axios
      .get(
      `http://localhost:8080/products/singleProduct/${id}`,
      )
      .then((response) => {
        setProduct(response.data  ); // Ensure correct data structure
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="w-full bg-gray-50 p-8">
      <div className="flex gap-6 bg-white shadow-lg rounded-lg p-8 w-full">
        <div className="flex-[30%]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
        <div className="flex-[70%] space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h2>
          <p className="text-xl text-gray-700 font-semibold">
            Rs {product.price}/=
          </p>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <button
            onClick={() => setShowPopup(true)} // Show popup on button click
            className="bg-green-500 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md hover:bg-green-600 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Render the popup modal if showPopup is true */}
      {showPopup && (
        <PopupForm
          onClose={() => setShowPopup(false)} // Close the popup
          productName={product.name} // Pass product name as a prop
          productPrice={product.price}
        />
      )}
    </div>
  );
}

export default ShoppingDescPage;
