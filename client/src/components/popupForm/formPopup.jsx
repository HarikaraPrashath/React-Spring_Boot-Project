import React, { useState, useEffect } from "react";
import { useOrderPlacement } from "../../hook/useOrderPlacement";
import { useAuthContext } from "../../hook/useAuthContext";

function PopupForm({ onClose, productName, productPrice }) {
  const { dispatch } = useOrderPlacement();
  const { user } = useAuthContext();

  const [cardNumber, setCardNumber] = useState("");
  const [yearMonth, setYearMonth] = useState("");
  const [cnn, setCnn] = useState("");
  const [price, setPrice] = useState("");
  const [visaMasterCard, setVisaMasterCard] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    setPrice(productPrice); // Set initial price
  }, [productPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const orderPayment = { cardNumber, yearMonth, cnn, price, visaMasterCard,productName,productPrice };
    
    console.log("User from AuthContext:", user);
    console.log("User context:", user);

    console.log("Headers sent:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
  });
  

    const response = await fetch("http://localhost:5000/api/order/make", {
      method: "POST",
      body: JSON.stringify(orderPayment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setCardNumber("");
      setYearMonth("");
      setCnn("");
      setPrice("");
      setVisaMasterCard("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_ORDER", payload: json });
      onClose(); // Close the popup after successful submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Complete Your Purchase
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Product: <strong>{productName}</strong>
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Price: <strong>{productPrice}</strong>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cname" className="block text-gray-700 font-medium">
              Card Number:
            </label>
            <input
              type="number"
              id="cname"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yandm" className="block text-gray-700 font-medium">
              Year & Month:
            </label>
            <input
              type="text"
              id="yandm"
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cnn" className="block text-gray-700 font-medium">
              CNN:
            </label>
            <input
              type="number"
              id="cnn"
              value={cnn}
              onChange={(e) => setCnn(e.target.value)}
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="visaMasterCard" className="block text-gray-700 font-medium">
              Card Type (Visa/MasterCard):
            </label>
            <input
              type="text"
              id="visaMasterCard"
              value={visaMasterCard}
              onChange={(e) => setVisaMasterCard(e.target.value)}
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
