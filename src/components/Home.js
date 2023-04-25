import React, { useState, useEffect } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import "../App.css";
import { Stack } from "react-bootstrap";
import { TaskDashboard } from "./TaskDashboard";
import { SalesRepCard } from "./SalesRepCard";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home(props) {
  const [result, setResult] = useState({});
  const [tasks, setTasks] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const spanishTranslation = props.spaTranslation;
  const [uid, setUid] = useState(undefined);
  const auth = getAuth();
  const navigate = useNavigate();
  const getUserFromDb = async () => {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists()) {
        setSignedInUser(snapshot.val());
        localStorage.setItem("user", signedInUser);
      }
    } catch (e) {
      console.log(e);
      console.log("user not found");
    }
  };

  //Listener for authenticated user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUid(user.uid);
      } else {
        setAuthUser(null);
        navigate("/login");
      }
    });
  }, [auth, uid]);

  useEffect(() => {
    if (uid) {
      getUserFromDb();
    }
  }, [uid, signedInUser]);

  //check if a user is currently signed in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setSignedInUser(loggedInUser);
    }
  }, []);

  let resultArray = [];

  useEffect(() => {
    const getAllTasks = async () => {
      const dbRef = ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, "tasks"));
        if (snapshot.exists()) {
          setResult(snapshot.val());
        }
      } catch (e) {
        console.log(e);
      }
    };
    getAllTasks();
  }, []);

  useEffect(() => {
    if (Object.keys(result).length !== 0) {
      resultArray = [];
      for (let key in result) {
        let taskObj = result[key];
        taskObj.id = key;
        taskObj.dueDate = result[key].dueDate;
        resultArray = [...resultArray, taskObj];
      }
      setTasks(resultArray);
    }
  }, [result]);
  return (
    <>
      {tasks.length !== 0 ? (
        <Stack gap={5}>
          <TaskDashboard taskRef={tasks} spaTranslation={spanishTranslation}/>
        </Stack>
      ) : spanishTranslation ? (
        <h1>Cargando</h1>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default Home;
