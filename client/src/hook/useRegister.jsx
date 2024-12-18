import { useState } from "react"
import { useAuthContext } from "./useAuthContext"



export const useRegister =()=>{
    const[error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();

    const register = async (username,password,firstName,lastName) => {
        setIsLoading(true);
        setError(null);
      
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username,password,firstName,lastName}),
        });
      
        const json = await response.json();
      
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
        }
      
        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(json));
          dispatch({ type: 'LOGIN', payload: json });
          setIsLoading(false);
        }
      };
      
    return{register,isLoading,error}
}