import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Layout/Navbar.jsx";
import { Landing } from "./Components/Layout/Landing.jsx";
import { Register } from "./Components/Auth/Register.jsx";
import { Login } from "./Components/Auth/Login.jsx";
import { loadUser } from "./Store/Actions/auth";
import setAuthToken from "./utils/setAuthToken";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
