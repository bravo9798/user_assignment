import React, { useState, useEffect } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Routes ,Route } from 'react-router-dom';
import PrivateRoute from "./component/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  // const loggedIinUser = JSON.parse(localStorage.getItem("loggedinuser"));
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // console.log(
  // //   loggedIinUser.password.length > 0,
  // //   "loggedIinUserloggedIinUserloggedIinUser"
  // // );
  // useEffect(() => {
  //   if (loggedIinUser?.password.length > 0) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // console.log(isAuthenticated, "is");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
