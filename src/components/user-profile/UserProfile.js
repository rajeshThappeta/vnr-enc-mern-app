import {useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UserProfile() {
  let { currentUser } = useSelector((state) => state.login);
  let [text,setText]=useState('')

  const getDataFromProtectedRoute = async () => {
    //get token from local/session storage
    let token = localStorage.getItem("token");
    //make HTTP req to protected route
    let res = await axios.get(
      "http://localhost:4000/user-api/protected-route",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    
    setText(res.data.message)
  };

  return (
    <div>
      <p className="display-5 text-primary text-end">
        Welcome ,{currentUser.username}
      </p>
      <button
        className="btn btn-danger text-white d-block mx-auto"
        onClick={getDataFromProtectedRoute}
      >
        Get Private Info
      </button>
      <p className="display-1 text-center text-info">{text}</p>
    </div>
  );
}

export default UserProfile;
