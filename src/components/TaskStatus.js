import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailChain from "./EmailChain";
import {
  CardActionArea,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";

function TaskStatus(props) {
  // const tasks = useRef([
  //   {
  //     id: "1",
  //     name: "Submit Roof Picture",
  //     due: "March 8, 2023",
  //     owner: "Manager",
  //     assignedTo: "Construction Worker",
  //   },
  //   {
  //     id: "2",
  //     name: "Sign Contract",
  //     due: "March 15, 2023",
  //     owner: "Manager",
  //     assignedTo: "Customer",
  //   },
  //   {
  //     id: "3",
  //     name: "Order Equipment",
  //     due: "March 17, 2023",
  //     owner: "Manager",
  //     assignedTo: "Construction Worker",
  //   },
  // ]);
  let tasks = props.tasks
  const [cards, setCards] = useState(null);
  const completedTasks = useRef([]);
  const buildTaskCard = (task) => {
    if (task) {
      return (
        <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={task.id}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography>Task Name: {task.title}</Typography>
                <Typography>Deadline: {task.due}</Typography>
                <Typography>Task Owner: {task.owner}</Typography>
                <Typography>Assigned To: {task.assignedTo}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid
              container
              alignItems="center"
              justifyContent="center"
              >
              <button className="card-btn-done"
                onClick={() => {
                  if (task.id) handleClick(task.id);
                }}
              >
                Done
              </button>
			  <button className="card-btn-edit"
                onClick={() => {
                  if (task.id) handleEdit(task.id);
                }}
              >
                Edit
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
    setCards(
      tasks.map((task) => {
        return buildTaskCard(task);
      })
    );
  }, []);

  const handleClick = (id) => {
    if (id) {
      addToCompletedTasks(id);
    }
  };
  
  const handleEdit = (id) => {
    if (id) {
      editTask(id);
    }
  };

  const undoTask = (id) => {
    let task;
    document.getElementById(id).remove();
    document.getElementById("li-" + id).remove();
    id = id.substring(4);
    let doneTasks = [];
    let incompleteTask;

    // find task marked as undone and add back to tasks
    for (let i = 0; i < completedTasks.current.length; i++) {
      task = completedTasks.current[i];
      if (task.id === id) {
        incompleteTask = task;
      } else {
        doneTasks.push(task);
      }
    }
    completedTasks.current = doneTasks;
    let temp2 = [...tasks, incompleteTask];
    tasks.current = temp2;
    setCards(
      tasks.current.map((task) => {
        return buildTaskCard(task);
      })
    );
  };

  const addToCompletedTasks = (id) => {
    let incompleteTasks = [];
    let task;
    let taskCompleted;
    let ul = document.getElementById("completedTasks");
    let li = document.createElement("li");

    // find task marked completed in tasks
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        taskCompleted = tasks[i];
        completedTasks.current = [...completedTasks.current, taskCompleted];
        break;
      }
    }
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id) {
        if (tasks[i].id !== id) {
          task = tasks[i];
          incompleteTasks.push(task);
        }
      }
    }
    tasks = incompleteTasks;
    li.appendChild(document.createTextNode("Task Name: "+taskCompleted.title));
    li.appendChild(document.createElement("br"))
    let date = new Date();
    li.appendChild(document.createTextNode("Completed On: "+ date.toDateString() +" "+ date.toLocaleTimeString()))
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Mark as not Done"));
    button.id = "task" + id;
    button.addEventListener("click", function () {
      undoTask(this.id);
    });
    li.appendChild(button);
    li.id = "li-task" + id;
    ul.appendChild(li);
    setCards(
      tasks.map((task) => {
        return buildTaskCard(task);
      })
    );
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
    </div>
  );
}
export default TaskStatus;
