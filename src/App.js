import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import CameraAccess from "./components/CameraAccess";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/LoginForm";
import AuthDetails from "./components/AuthDetails";
import React, { useState } from "react";

function App() {
  const [showNav, setShowNav] = useState(false);

  const clickHandler = () => {
    setShowNav(!showNav);
  };
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div>
            <h1 className="title">Solar Panel Installation PM</h1>
          </div>
          <div className="authDetails">
            <AuthDetails></AuthDetails>
          </div>
        </header>
        <div className="navBar">
          <button onClick={clickHandler}>&#9776; Menu</button>
          {showNav && <Navigation></Navigation>}
        </div>

        <main className={showNav ? "mainShifted" : "mainDefault"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="form" element={<CameraAccess />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;