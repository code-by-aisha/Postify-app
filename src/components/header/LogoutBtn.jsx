 import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import {logout} from "../../store/authSlice";

function LogoutBtn (){

const dispatch = useDispatch()
const logoutHandler = ( ) => {
authService.logout().then(() => {
  dispatch(logout())
})
}

return (
 <button
  className="btn nav-btn btn-gradient text-white fw-semibold px-4 py-2"
  onClick={logoutHandler}
>
  Logout
</button>


  );
   
}

export default LogoutBtn;

