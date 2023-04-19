import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          navigate("/welcome");
          dispatch(login(JSON.stringify(user)));
          localStorage.setItem("loggedinuser", JSON.stringify(user));
        } else {
          setLoginError("Invalid username or password");
        }
      } else {
        setLoginError("Failed to login");
      }
    } catch (error) {
      setLoginError("Failed to login");
    }
  };


  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {loginError && (
          <div style={{ color: "red" }}>Incorrect email or password</div>
        )}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
