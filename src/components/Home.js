import React, { useState, useEffect } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import "../App.css";
import { TaskDashboard } from "./TaskDashboard";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home(props) {
  const [result, setResult] = useState({});
  const [tasks, setTasks] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);

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

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsNum = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const temp = date.split(" ");
    const mm = monthsNum[months.indexOf(temp[1])];

    const dd = temp[2];
    const yyyy = temp[3];
    return `${yyyy}-${mm}-${dd}`;
  };

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
        taskObj.dueDate = formatDate(result[key].dueDate);
        resultArray = [...resultArray, taskObj];
      }
      setTasks(resultArray);
    }
  }, [result]);
  return (
    <>
      {tasks.length !== 0 ? (
        <>
          <TaskDashboard taskRef={tasks} />
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}

export default Home;
