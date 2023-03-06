import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import CameraAccess from "./components/CameraAccess";
import RegisterForm from "./components/RegisterForm"
import React, { useState } from "react";
function App() {
  const [showNav, setShowNav] = useState(false);

  const clickHandler = () => {

    setShowNav(!showNav);
  };
  return (
    <div className="App">
      <Router>
        <header className="App-header"></header>
        <div className="navBar">
          <button onClick={clickHandler}>&#9776; Menu</button>
          {showNav && <Navigation></Navigation>}
        </div>
        <main className={showNav?'mainShifted':'mainDefault'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="form" element={<CameraAccess />} />
            <Route path="register" element={<RegisterForm/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
