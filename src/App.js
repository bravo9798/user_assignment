import React from "react";
import RegistrationPage from "./pages/RegistrationPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";

function App() {

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
