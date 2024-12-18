import React, { useEffect,useState} from 'react';
import demoPic from '../../assets/image/best-2.jpg';
import { useParams } from 'react-router-dom';
import { useLogout } from '../../hook/useLogout';
import { useNavigate } from 'react-router-dom';
import { useOrderPlacement } from "../../hook/useOrderPlacement"
import { useAuthContext } from "../../hook/useAuthContext"



// need to check Profile
function UserProfile() {
  const {orderPlacement, dispatch} = useOrderPlacement()
  const [productForUser, setProductForUser] = useState([]);
  const {user} = useAuthContext()
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);

  const { logout } = useLogout();
  const navigate = useNavigate();

  // Logout Method
  const handleClick = () => {
      logout()
      navigate('/'); 
  };

 



  useEffect(() => {
    const fetchWorkouts = async () => {
      
        if (!user || !user.token) {
          console.error("No user or token available");
          return;
        }
        try {
      
  
        const response = await fetch('http://localhost:5000/api/order/getorderlist', {
          method:'GET',
          headers: { 
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json', 
         },
        });
        console.log("Authorization Header inside the use Effect:", `Bearer ${user.token}`);
        // console.log("Response Status:", response.status);
        // console.log("Response Headers:", response.headers);
        console.log("Request Headers:", {
          'Authorization': `Bearer ${user.token}`,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data is ",data);
        
        setProductForUser(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchWorkouts();
  }, [user]);
  


  return  (
    <div className="min-h-screen">
      {/* User Profile Section */}
      <div className="w-full lg:w-[1200px] mx-auto mt-10 p-6 mb-8 bg-gray-100 shadow-lg rounded-3xl flex flex-col md:flex-row m-[1px] gap-6">
        {/* Profile Picture */}
        <div className="flex-[30%] flex justify-center items-center">
          <div className="relative">
            <img
              src={demoPic}
              alt="profile"
              className="rounded-full h-60 w-60 object-cover border-4 border-green-500 shadow-lg"
            />
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center">
              <p className="text-white font-semibold">Edit Profile</p>
            </div>
          </div>
        </div>
  
        {/* User Details */}
        <div className="flex-[70%] text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user ? user.user.name : "John Doe"}</h2>
          <p className="text-lg text-gray-600">Software Engineer at XYZ Company</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.user.email }
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> +1 234 567 890
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> San Francisco, CA
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all">
              Edit Profile
            </button>
            <button
              onClick={handleClick}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
  
      {/* Order Section */}
      <div className="bg-gray-100 shadow-lg rounded-xl p-6 mt-8 mx-auto w-11/12 md:w-3/4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h3>
  
        <div className="space-y-4">
        {productForUser && productForUser.length > 0 ? (
      productForUser.map((result) => {
    if (user && user.id === result.id) {
      return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all" key={result._id}>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80" // Placeholder image for order item
              alt="order item"
              className="h-20 w-20 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium text-gray-800">{result.productName}</p>
              <p className="text-gray-600">Order ID: {result._id}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-700 font-semibold">Status: Delivered</p>
            <p className="text-gray-600">Total: {result.productPrice}/=</p>
            <button className="mt-2 text-sm text-blue-500 hover:underline">View Details</button>
          </div>
        </div>
      );
    }
    return null;
  })
) : (
  <p>No orders found.</p>
)}

        </div>
      </div>
    </div>
  );

}

export default UserProfile;
