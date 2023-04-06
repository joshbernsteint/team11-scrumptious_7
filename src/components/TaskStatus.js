import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailChain from "./EmailChain";
import { ref, getDatabase, update, child, get, set } from "firebase/database";
import { Link } from "react-router-dom";
import { CardActionArea, CardActions, Grid, Typography } from "@mui/material";

function TaskStatus(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [cards, setCards] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [doneList, setDoneList] = useState(null);

  const buildTaskCard = (task) => {
    if (task) {
      return (
        <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={task.id}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography>Task Name: {task.title}</Typography>
                <Typography>Deadline: {task.dueDate}</Typography>
                <Typography>Task Owner: {task.owner}</Typography>
                <Typography>Assigned To: {task.assignedTo}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid container alignItems="center" justifyContent="center">
                <button
                  className="card-btn"
                  onClick={() => {
                    if (task.id) handleClick(task.id);
                  }}
                >
                  Done
                </button>
              </Grid>
            </CardActions>
            <CardActions>
              <EmailChain></EmailChain>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  };

  useEffect(() => {
    updateTaskCards()
  }, []);

  const updateTaskCards = () => {
    setCards(
      tasks.map((task) => {
        if (!task.completed) return buildTaskCard(task);
      })
    );
    let doneTasks = [];
    tasks.map((task) => {
      if (task.completed) {
        doneTasks = [...doneTasks, task];
      }
    });
    setCompletedTasks(doneTasks);
  };

  useEffect(() => {
    setDoneList(
      completedTasks.map((task) => {
        return buildCompleteItem(task);
      })
    );
  }, [completedTasks]);

  const buildCompleteItem = (task) => {
    if (task)
      return (
        <li key={task.id}>
          {task.title}
          <button
            onClick={() => {
              if (task.id) handleClick(task.id);
            }}
          >
            Mark as not done
          </button>
        </li>
      );
  };

  const updtateTaskStatus = async (id) => {
    const db = getDatabase();
    const dbRef = ref(db);
    let taskStatus = false;
    try {
      const snapshot = await get(child(dbRef, `tasks/${id}`));
      if (snapshot.exists()) {
        taskStatus = snapshot.val().completed;
      }
    } catch (e) {
      console.log(e);
    }
    let updates = {};
    updates["/tasks/" + id + "/completed"] = !taskStatus;
    await update(ref(db), updates);
    let updatedTasks = tasks;
    for (let i = 0; tasks.length; i++) {
      if (tasks[i].id === id) {
        updatedTasks[i].completed = !taskStatus;
        break;
      }
    }
    updateTaskCards();
  };

  const handleClick = (id) => {
    if (id) {
      updtateTaskStatus(id);
    }
  };

  return (
    <div className="taskStatus">
      <h1>Tasks</h1>
      {cards && (
        <Grid
          container
          spacing={2}
          sx={{ flexGrow: 1, flexDirection: "row" }}
          className="gridTasks"
          alignItems="center"
          justifyContent="center"
        >
          {cards}
        </Grid>
      )}
      <h2 className="h2-v1">Completed Tasks</h2>
      <ul id="completedTasks"></ul>
      {doneList}
      <Link to="/newTask">
        <p>Create a new task here.</p>
      </Link>
    </div>
  );
}
export default TaskStatus;
