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
import { TaskScreen } from "./components/TaskScreen";;
function App() {
  const [showNav, setShowNav] = useState(false);

  const clickHandler = () => {
    setShowNav(!showNav);
  };

  const MyTasks = useRef([
    {
      id: "1",
      title: "Submit Roof Picture",
      due: "March 8, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
      description: "placeholder",
      priority: "3",
      date: "2023-03-8",
      completed: "no",
    },
    {
      id: "1.5",
      title: "Submit Roof",
      due: "March 13, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
      description: "placeholder",
      priority: "3",
      date: "2023-03-8",
      completed: "no",
    },
    {
        id: "5",
        title: "Begin truss supports",
        due: "March 12, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "There is no light here",
        priority: "4",
        date: "2023-03-12",
        completed: "no",

    },
    {
        id: "2",
        title: "Install panels",
        due: "March 16, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "Put panels in place",
        priority: "1",
        date: "2023-03-30",
        completed: "no",

    },
    {
        id: "3",
        title: "Connect wiring",
        due: "May 12, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "Connect electrical wiring",
        priority: "2",
        date: "2023-03-31",
        completed: "no",

    },
  ]);

  return (
    <div className="App">
      <HomeNavBar/>
      <Router>
      <Routes>
        <Route path="/" element={<Home tasks={MyTasks.current}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<RegisterForm />} />
        <Route path="/camera" element={<CameraForm />} />
        <Route path="/tasks" element={<TaskScreen tasks={MyTasks.current}/>} />
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
