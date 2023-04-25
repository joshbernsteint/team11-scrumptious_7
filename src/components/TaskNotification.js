import React from "react";
import ProgressBar from "./ProgressBar";

function TaskNotification(props) {
  const dateT = props.date;//Due Date
  const dateN = new Date();//Current date
  const val1 = dateT.substring(8);
  const val2 = dateN.getDate();
  const monthT = parseInt(dateT.substring(5,7));
  const monthN = parseInt(dateN.getMonth()+1);
  const caltime = parseInt(val1) - parseInt(val2);
  const spanishTranslation = props.spaTranslation;

  const red_color = "red"
  const color = (() => {
    if(monthT != monthN && monthT < monthN){
      return red_color
    }
    else if(monthT === monthN && caltime < 0){
      return red_color
    }
    else{
      return "#74819b"
    }
  })




  const format = caltime === 1 ? "day" : "days";
  const monthLengths = [31,28,31,30,31,30,31,31,30];
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

  const fullDate = `${monthNames[monthT - 1]} ${val1}`;
  const monthDif = monthT-monthN;
  let daysDue = 0;
  let tempMonth = 0;
  if(monthDif < 0){//If the task is overdue
    tempMonth = monthN;
    while(tempMonth - monthT !== 0){
        daysDue -= monthLengths[tempMonth - 1];
        tempMonth -= 1;
    }
    daysDue -= caltime
  }
  else if(monthDif > 0){//If the task is not yet due
    tempMonth = monthT;
    while(tempMonth - monthN !== 0){
      daysDue += monthLengths[tempMonth - 1];
      tempMonth -= 1;
    }
    daysDue += caltime -1;
  }
  else{
    daysDue = caltime;
  }
  
  
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
          {!spanishTranslation?"Due in":"Entrega en"}: {daysDue.toString()} {format}
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
