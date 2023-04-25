import TaskStatus from "./TaskStatus";
import JoinChat from "./chatLogs/JoinChat";
import React, { useState, useEffect } from "react";
import { ref, getDatabase, child, get, update } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "react-bootstrap";



export function TaskScreen(props) {
  const [result, setResult] = useState({});
  const [tasks, setTasks] = useState([]);
  const [uid, setUid] = useState("");
  const [giveUpdates, setUpdates] = useState(false);
  let resultArray = [];
  const spanishTranslation = props.spaTranslation;

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

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    
    const getUpdateStatus = async () => {
      const dbRef = ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, `users/${uid}`));
        if (snapshot.exists()) {
          if(snapshot.val().update==null){
            setUpdates(false);
          }
          else{
            setUpdates(snapshot.val());
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUpdateStatus();
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

function changeUpdateStatus() {
  const db = getDatabase();
        update(ref(db, 'users/' + uid), {
            updates: !giveUpdates
        })
        setUpdates(!giveUpdates)
}

  return (
    <>
      {tasks.length !== 0 ? (
        <>
          <TaskStatus tasks={tasks} spaTranslation={spanishTranslation}/>
          <>
            <h3>Recieve Email Updates</h3>
            <Button variant={giveUpdates ? "success" : "danger"} onClick={() => {changeUpdateStatus();}}><p>{spanishTranslation ? `${giveUpdates ? "Recibir" : "No Recibir"} Nuevos correo electrónicos` : `Email Updates ${giveUpdates ? "enabled" : "disabled"}`}</p></Button>
          </>
          <JoinChat tasks={tasks} spaTranslation={spanishTranslation}/>
        </>
      ) : (
        spanishTranslation? <h1>cargando...</h1>: <h1>loading...</h1>
      )}
    </>
  );
}
