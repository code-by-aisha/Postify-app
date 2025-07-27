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
      className="btn border-0 text-white fw-semibold px-4 py-2"
      style={{
        background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
      }}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
   
}

export default LogoutBtn;

