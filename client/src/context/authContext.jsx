import { createContext, useReducer, useEffect,useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Reducer function to handle login/logout
export const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };

// Context provider component
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,{user:null});

 // Fetch user data when the component mounts
 useEffect(() => {
  console.log("local storage",localStorage)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(localStorage.getItem("user"));
  if (storedUser) {
    dispatch({ type: "LOGIN", payload: storedUser }); // Dispatch LOGIN action to set the user
  }
}, []);

// // Save user to localStorage on change
// useEffect(() => {
//   if (state.user) {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   } else {
//     localStorage.removeItem("user");
//   }
// }, [state.user]);


    return (
      <AuthContext.Provider value={{ user: state.user, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
};
