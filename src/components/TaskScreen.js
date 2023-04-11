import TaskStatus from "./TaskStatus";
import JoinChat from "./chatLogs/JoinChat";
import React, { useState, useEffect } from "react";
import { ref, getDatabase, child, get } from "firebase/database";

export function TaskScreen(props) {
  const [result, setResult] = useState({});
  const [tasks, setTasks] = useState([]);
  let resultArray = [];

  const formatDate = (date) => {
    const temp = date.split(" ");
    const mm = temp[1];
    const dd = temp[2];
    const yyyy = temp[3];
    return `${mm} ${dd}, ${yyyy}`;
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
          <TaskStatus tasks={tasks} />
          <JoinChat tasks={tasks} />
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}
