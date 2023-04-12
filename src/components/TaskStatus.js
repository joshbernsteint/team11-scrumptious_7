import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailChain from "./EmailChain";
import { ref, getDatabase, update, child, get } from "firebase/database";

import { Link } from "react-router-dom";
import { CardActionArea, CardActions, Grid, Typography } from "@mui/material";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function TaskStatus(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [cards, setCards] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [doneList, setDoneList] = useState(null);
  const [signedInUser, setSignedInUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const [uid, setUid] = useState(undefined);
  const auth = getAuth();

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
                <Typography>Assigned To: {task.assignedTo.name}</Typography>
                <Typography>Priority: {task.priority}</Typography>
              </CardContent>
            </CardActionArea>
            {(signedInUser && signedInUser.userType === "manager") ||
            (signedInUser && signedInUser.userType === "worker") ? (
              <CardActions>
                <Grid container alignItems="center" justifyContent="center">
                  <button
                    className="card-btn"
                    onClick={() => {
                      if (task.id) handleClick(task.id, true);
                    }}
                  >
                    Done
                  </button>
                </Grid>
              </CardActions>
            ) : null}
            <CardActions>
              <EmailChain users={[task.assignedTo.uid]}></EmailChain>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  };

  useEffect(() => {
    updateTaskCards();
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
          <div>
            <p>Task Title: {task.title}</p>
            <p>Completed On: {task.dateCompleted}</p>
          </div>
          <button
            onClick={() => {
              if (task.id) handleClick(task.id, false);
            }}
          >
            Mark Not Done
          </button>
        </li>
      );
  };

  const updtateTaskStatus = async (id, done) => {
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
    let dateString = "";
    if (done) {
      let date = new Date();
      dateString = date.toDateString() + " " + date.toLocaleTimeString();
      updates["/tasks/" + id + "/dateCompleted"] = dateString;
    } else {
      updates["/tasks/" + id + "/dateCompleted"] = "";
    }
    await update(ref(db), updates);
    let updatedTasks = tasks;
    for (let i = 0; tasks.length; i++) {
      if (tasks[i].id === id) {
        updatedTasks[i].completed = !taskStatus;
        updatedTasks[i].dateCompleted = dateString;
        break;
      }
    }
    updateTaskCards();
  };

  const handleClick = (id, done) => {
    if (id) {
      updtateTaskStatus(id, done);
    }
  };

  return (
    <div className="taskStatus">
      <h2>Tasks</h2>
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
      <br />
      <h2 className="h2-v1">Completed Tasks</h2>
      <ul className="completedTasks">{doneList}</ul>
      <Link to="/newTask">
        <p>Create a new task here.</p>
      </Link>
    </div>
  );
}
export default TaskStatus;
