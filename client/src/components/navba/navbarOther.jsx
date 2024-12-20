import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAuthContext } from '../../hook/useAuthContext';

function NavbarOther() {
  const {user} = useAuthContext()

  // useEffect(() => {
  //   if (user && user.user) {
  //     console.log("User from AuthContext in navbar", user);
  //     console.log("User id:", user.user.id);
  //     console.log("User email:", user.user.email);
  //   } else {
  //     console.log("User is null or undefined");
  //   }
  // }, [user]);
  
  useEffect(() => {
    
    console.log("Current user:", user );
  }, [user]);

  // console.log("User from AuthContext in navbar", user.username);
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
    user.role === "ADMIN" ? (
      <>
        <p className="text-white font-bold">{user.username}</p>
        <Link
          to="/admin-dashboard"
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
        >
          Dashboard
        </Link>
      </>
    ) : (
      <>
        <p className="text-white font-bold">{user.username}</p>
        <Link
          to={`/userProfile/${user.id}`}
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
        >
          Profile
        </Link>
      </>
    )
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
