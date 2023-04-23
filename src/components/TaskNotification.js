import React from "react";
import ProgressBar from "./ProgressBar";

function TaskNotification(props) {
  const dateT = props.date;
  const dateN = new Date();
  const val1 = dateT.substring(8);
  const val2 = dateN.getDate();

  const caltime = parseInt(val1) - parseInt(val2);
  const spanishTranslation = props.spaTranslation;

  // const color = "#74819b"
  const color = (() => {
    if(caltime < 0){
      return "red"
    }
    else{
      return "#74819b"
    }
  })




  const format = caltime === 1 ? "day" : "days";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = parseInt(dateT.substring(5, 8));

  const fullDate = `${monthNames[month - 1]} ${val1}`;
  
  return (
    <div className="task-notification" style ={{backgroundColor: `${color()}`}} aria-label={`${props.id}`}>
      <div className="top-task">
        <p className="task-title">{!spanishTranslation?"Title":"Título"}: {props.title}</p>
        <p className="task-date">{!spanishTranslation?"Priority":"Prioridad"}: {props.priority}</p>
        <p className="task-date">{!spanishTranslation?"Due":"Para"}: {fullDate}</p>
      </div>
      <p className="task-description">{props.description}</p>
      <div className="bottom-task">
        <p className="task-status">
          {!spanishTranslation?"Due in":"Entrega en"}: {caltime.toString()} {format}
        </p>
        <a href={`/tasks/#${props.id}`} className="task-href">
          {!spanishTranslation?"Go to task":"Más información"}
        </a>
      </div>
      <b>{!spanishTranslation?"Completion":"Progreso"}:</b>
      <ProgressBar bgcolor="blue" completed={props.completed? "100": "0"}/>

    </div>
  );
}

export default TaskNotification;
