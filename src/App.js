import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import CameraForm from "./components/CameraForm";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/LoginForm";
import AuthDetails from "./components/AuthDetails";
import MaterialNotification from "./components/MaterialNotification";
import React, { useState, useEffect } from "react";
import NotificationBar from "./components/NotificationBar";
import UpdateProgressBar from "./components/UpdateProgressBar";
import { HomeNavBar } from "./components/homeNavBar";
import { Stack, Row,Col } from 'react-bootstrap';
import { alignProperty } from "@mui/material/styles/cssUtils";

import SendContract from "./components/SendContract";
import { TaskDashboard } from "./components/TaskDashboard";
import { TaskScreen } from "./components/TaskScreen";
import TaskForm from "./components/TaskForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CreateProject from "./components/CreateProject";
import { Redirect } from './components/Redirect'
import { Stack, Row,Col } from 'react-bootstrap';
import { alignProperty } from "@mui/material/styles/cssUtils";
import RequestInspection from "./components/RequestInspection";


function App() {
  const inquiryLink = "https://forms.gle/B8mE2UWJ2zEsiJxE9"
  
  const [showNav, setShowNav] = useState(false);
  const clickHandler = () => {
  setShowNav(!showNav);};
  const [uid, setUid] = useState(undefined);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("User not signed in");
      }
    });
  }, [auth, uid]);

  return (
    <div className="App">
      <HomeNavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<RegisterForm />} />
          <Route path="/camera" element={<CameraForm />} />
          <Route path="/tasks" element={<TaskScreen />} />
          <Route path="/login/:id" element={<h1>Sup</h1>}>
            <Route index element={<h1>Sup</h1>} />
          </Route>
          <Route path="/landing" element={<AuthDetails />} />
          <Route path="/RequestInspection" element={<RequestInspection />} />
          <Route path="/sendContract" element={<SendContract />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/progress" element={<UpdateProgressBar />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/newTask" element={<TaskForm uid={uid}/>}></Route>
          <Route path = "/inquiry" element={<Redirect link={inquiryLink}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
