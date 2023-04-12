import React, { useState, useEffect } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import "../App.css";
import { Stack } from "react-bootstrap";
import { TaskDashboard } from "./TaskDashboard";
import { SalesRepCard } from "./SalesRepCard";

function Home(props) {
  const [result, setResult] = useState({});
  const [tasks, setTasks] = useState([]);
  let resultArray = [];

  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const monthsNum = ["01","02","03","04","05","06","07", "08","09", "10", "11", "12"]
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
        <Stack gap = {5}>
          <TaskDashboard taskRef={tasks} />
          <br/>
          <br/>
          <SalesRepCard/>
        </Stack>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}

export default Home;
