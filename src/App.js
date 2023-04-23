import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import CameraForm from "./components/CameraForm";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/LoginForm";
import AuthDetails from "./components/AuthDetails";
import MaterialNotification from "./components/MaterialNotification";
import React, { useState, useEffect } from "react";
import NotificationBar from "./components/NotificationBar";
import UpdateProgressBar from "./components/UpdateProgressBar";
import { HomeNavBar } from "./components/homeNavBar";

import SendContract from "./components/SendContract";
import { TaskDashboard } from "./components/TaskDashboard";
import { TaskScreen } from "./components/TaskScreen";
import TaskForm from "./components/TaskForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CreateProject from "./components/CreateProject";
import { Redirect } from "./components/Redirect";
import { Stack, Row, Col } from "react-bootstrap";
import { alignProperty } from "@mui/material/styles/cssUtils";
import RequestInspection from "./components/RequestInspection";
import ManagerProjects from "./components/MangerProjects";
import Profile from "./components/Profile";

function App() {
  const inquiryLink = "https://forms.gle/B8mE2UWJ2zEsiJxE9";

  const [showNav, setShowNav] = useState(false);
  const clickHandler = () => {
    setShowNav(!showNav);
  };
  const [spanishTranslation, setSpanishTranslation] = useState(false);
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
      <HomeNavBar spaTranslation={spanishTranslation} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/login"
            element={<Login spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/login/register"
            element={<RegisterForm spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/camera"
            element={<CameraForm spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/tasks"
            element={<TaskScreen spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/profile"
            element={<Profile uid={uid} spaTranslation={spanishTranslation} />}
          />
          <Route path="/login/:id" element={<h1>Sup</h1>}>
            <Route index element={<h1>Sup</h1>} />
          </Route>
          <Route
            path="/landing"
            element={<AuthDetails spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/RequestInspection"
            element={<RequestInspection spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/sendContract"
            element={<SendContract spaTranslation={spanishTranslation} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/progress/:id"
            element={<UpdateProgressBar spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/new-project"
            element={<CreateProject spaTranslation={spanishTranslation} />}
          />
          <Route
            path="/newTask"
            element={<TaskForm uid={uid} spaTranslation={spanishTranslation} />}
          ></Route>
          <Route
            path="/inquiry"
            element={
              <Redirect
                link={inquiryLink}
                spaTranslation={spanishTranslation}
              />
            }
          />
        </Routes>
      </Router>
      <footer className="foot">
        <button
          className="eng-btn"
          onClick={() => setSpanishTranslation(false)}
        >
          English
        </button>
        <button className="spa-btn" onClick={() => setSpanishTranslation(true)}>
          Español
        </button>
      </footer>
    </div>
  );
}

export default App;
