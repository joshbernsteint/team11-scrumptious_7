import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import CameraForm from "./components/CameraForm";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/LoginForm";
import AuthDetails from "./components/AuthDetails";
import MaterialNotification from "./components/MaterialNotification";
import React, { useState, useRef } from "react";
import NotificationBar from './components/NotificationBar'
import { HomeNavBar } from "./components/homeNavBar";
import SendContract from "./components/SendContract";
import { TaskDashboard } from "./components/TaskDashboard";
function App() {
  const [showNav, setShowNav] = useState(false);

  const clickHandler = () => {
    setShowNav(!showNav);
  };

  const tasks = useRef([
    {
      id: "1",
      name: "Submit Roof Picture",
      due: "March 8, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
    },
    {
      id: "2",
      name: "Sign Contract",
      due: "March 15, 2023",
      owner: "Manager",
      assignedTo: "Customer",
    },
    {
      id: "3",
      name: "Order Equipment",
      due: "March 17, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
    },
  ]);


  return (
    <div className="App">
      <HomeNavBar/>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<RegisterForm />} />
        <Route path="/camera" element={<CameraForm />} />
        <Route path="/tasks" element={<TaskDashboard tasks={tasks}/>} />
        <Route path="/login/:id" element={<h1>Sup</h1>}>
          <Route index element = {<h1>Sup</h1>} />
        </Route>
		<Route path="/sendContract" element={<SendContract/>} />
        <Route path="*" element={<Navigate to ="/" />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
