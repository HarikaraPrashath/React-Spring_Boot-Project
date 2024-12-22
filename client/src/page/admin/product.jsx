import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useAuthContext } from '../../hook/useAuthContext';

const initialFormData = {
  image: null,
  productName: "",
  price: "",
  description: "",
  size: [],
  color: "",
};

function Products() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const inputRef = useRef(null);

  // Handle the form change
  const handleFormChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // Handle image file change
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  // Get access token here that why we can move
  useEffect(() => {
    if (user) {
      console.log("Current user in product:", user);
    }
  }, [user]);

  // Upload to cloudinary API
  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", imageFile);
    console.log("Uploading image data:", [...data]);  // Check the form data being sent

    try {
      if (user && user.Access_token) {
        console.log("Sending request with token:", user.Access_token);

        const response = await axios.post(
          "http://localhost:8080/products/uploadimage",
          data,
          {
            headers: {
              Authorization: `Bearer ${user.Access_token}`, // Ensure correct token
            },
          }
        );

        console.log("Upload successful:", response.data);
        const imageUrl = response.data.secure_url || response.data.url;

        if (imageUrl) {
          setUploadedImageUrl(imageUrl); // Update the state with the image URL
          console.log("Image URL updated:", imageUrl);
        } else {
          console.error("Image URL not found in response:", response.data);
        }
      } else {
        console.error("User is not authenticated.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      console.error("Error details:", error.response ? error.response.data : error.message);  // Check detailed error response
    } finally {
      setImageLoadingState(false);
    }
  };

  // Upload the image to cloudinary and get it link from cloudinary
  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  // Merge the image URL with product data
  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prevData) => ({
        ...prevData,
        image: uploadedImageUrl, // Synchronize the URL with formData
      }));
    }
  }, [uploadedImageUrl]);

  // Onsubmit method
    const onSubmit = async (e) => {
      e.preventDefault();
    
      if (imageLoadingState) {
        alert("Please wait for the image upload to complete.");
        return;
      }
    
      if (!uploadedImageUrl) {
        alert("Please upload an image before submitting.");
        return;
      }
    
      if (user && user.Access_token) {
        console.log("Form Data before submission:", formData);
        console.log("Authorization Token:", user.Access_token);
    
        try {
          const result = await axios.post(
            "http://localhost:8080/products/productCreate",
            formData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.Access_token}`,
              },
            }
          );
    
          console.log("Product added successfully:", result.data);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        } catch (error) {
          console.error("Error adding product:", error.response?.data || error.message);
        }
      } else {
        alert("User is not authenticated. Please log in.");
      }
    };
    

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-8">
        <Link to="/admin-dashboard">
          <button className="px-6 py-3 bg-green-400 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-700">
            Dashboard
          </button>
        </Link>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-500">
          Products
        </button>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Add Product</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Image Upload Section */}
          <div className="border-4 rounded-lg border-dotted border-green-500 w-full p-4">
            {!imageFile ? (
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center cursor-pointer text-center text-green-700"
              >
                <UploadCloudIcon className="w-10 h-10 text-green-500 mb-2" />
                <span className="font-semibold">Click to upload an image</span>
                <span className="text-sm text-green-500">
                  (Supported formats: JPG, PNG, GIF)
                </span>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageFileChange}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 h-8 text-green-500 mr-2" />
                  <p className="text-sm font-medium truncate">
                    {imageFile.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-green-500 hover:text-red-500"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => handleFormChange("productName", e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleFormChange("price", e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Size */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Size</label>
            <div className="flex items-center gap-4">
              {["Small", "Large", "XL"].map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300 focus:ring-green-500"
                    value={size.toLowerCase()}
                    checked={formData.size.includes(size.toLowerCase())}
                    onChange={(e) => {
                      const newSize = e.target.value;
                      const updatedSize = formData.size.includes(newSize)
                        ? formData.size.filter((s) => s !== newSize)
                        : [...formData.size, newSize];
                      handleFormChange("size", updatedSize);
                    }}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Color
            </label>
            <div className="flex items-center gap-4">
              {["Blue", "Red", "Yellow", "Green"].map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="radio"
                    name="color"
                    value={color.toLowerCase()}
                    checked={formData.color === color.toLowerCase()}
                    onChange={(e) => handleFormChange("color", e.target.value)}
                    className="mr-2 border-gray-300 focus:ring-green-500"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Products;