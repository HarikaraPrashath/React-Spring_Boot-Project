import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAuthContext } from '../../hook/useAuthContext';

function NavbarOther() {
  const {user} = useAuthContext()

  useEffect(() => {
    if (user && user.user) {
      console.log("User from AuthContext in navbar", user);
      console.log("User id:", user.user.id);
      console.log("User email:", user.user.email);
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  return (
    <div>
      <div className="relative flex items-center justify-between px-8 py-4 backdrop-blur-md bg-green-900 ">
        {/* Logo Section */}
        <div className="flex-[20%] flex items-center">
          <span className="text-3xl font-bold text-green-500">R</span>
          <span className="text-3xl font-bold text-white">ivo</span>
          <div className="w-3 h-3 bg-green-500 rounded-full ml-1"></div>
        </div>

        {/* Menu Section */}
        <div className="flex-[60%] flex gap-8 justify-center items-center">
          <p className="hover:text-green-600 cursor-pointer text-white transition duration-300">
            <Link to={"/"}> Home</Link>
          </p>
          <p className="hover:text-green-600 cursor-pointer text-white transition duration-300">
            <Link to={"/shop"}>  Shop</Link>
          </p>
          <p className="hover:text-green-600 cursor-pointer text-white transition duration-300">
             <Link to={"/feature"}>Feature</Link>
          </p>
          <p className="hover:text-green-600 cursor-pointer text-white transition duration-300">
              <Link to={"/contact"}>Contact</Link>
          </p>
        </div>

        {/* Login Section */}
        <div className="flex-[20%] flex justify-end items-center gap-4">
        {user ? (
        <div className="flex flex-col items-end text-right space-y-2">
          <p className="text-sm text-gray-700 font-medium"></p>
          <Link
            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
            to={`/userProfile/${user.user.id}`}
          >
            Profile
          </Link>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
        >
          Login
        </Link>
      )}
</div>
      </div>
    </div>
  );
}

export default NavbarOther;
