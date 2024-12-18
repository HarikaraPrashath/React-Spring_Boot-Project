import { useAuthContext } from "../hook/useAuthContext.jsx";


export const useLogout =()=>{
  const {dispatch} = useAuthContext()

  const logout =()=>{
      //remove storage
      localStorage.removeItem('user')


      //dispatch logout action
      dispatch({type:'LOGOUT'})
  }
 return{logout}
}