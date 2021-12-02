import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Layout/Navbar.jsx";
import { Landing } from "./Components/Layout/Landing.jsx";
import { Register } from "./Components/Auth/Register.jsx";
import { Login } from "./Components/Auth/Login.jsx";
import { loadUser } from "./Store/Actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import CreateProfile from "./Components/Profile-form/CreateProfile.jsx";
import AddExperience from "./Components/Profile-form/AddExperience";
import AddEducation from "./Components/Profile-form/AddEducation";
import Profiles from "./Components/Profiles/Profiles";
import Profile from "./Components/Profile/Profile";
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
        <Route exact path="/add-experience" element={<AddExperience />} />
        <Route exact path="/add-education" element={<AddEducation />} />
        <Route exact path="/create-profile" element={<CreateProfile />} />
        <Route exact path="/edit-profile" element={<CreateProfile />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/developers" element={<Profiles />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
