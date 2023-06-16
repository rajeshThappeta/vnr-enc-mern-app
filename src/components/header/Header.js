import React from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { clearState } from "../../slices/loginSlice";

function Header() {

  let {userLoginStatus}=useSelector(state=>state.login)
  let dispatch=useDispatch()

  const logOut=()=>{
    //remove token from local/session storage
    localStorage.removeItem('token')
    //reset user state
      let actionObj=clearState()
      dispatch(actionObj)
  }

  return (
    <ul class="nav">
      {userLoginStatus===false? <>
        <li class="nav-item">
          <Link class="nav-link active" to="">
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="register">
            Register
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="login">
            Login
          </Link>
        </li>
      </> :
        <li class="nav-item" onClick={logOut}>
        <Link class="nav-link active" to="login">
          Logout
        </Link>
      </li> }
     

    
    </ul>
  );
}

export default Header;
