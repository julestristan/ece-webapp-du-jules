import React, { useState } from "react";
import LoginForm from "../components/loginform";

function loginnative() {
  const AdminUser = {
    username: "admin",
    password: "admin123"
  }

  const [user, setUser] = useState({username:"", password:""});
  const [error,setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.username == AdminUser.username && details.password == AdminUser.password) {
      console.log("Logged in");
      setUser({
        username: details.username,
        password: details.password
      })
    }
    else {
      console.log("Details do not match");
      setError("Details do not match");
    }
  }

  const Logout = () => {
    setUser({username:"", password:""});
  }

  return (
    <div className="login">
      {(user.username != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.username}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default loginnative