import React from "react";

function TaskNotification(props) {
  const dateT = props.date;
  const dateN = new Date();

  const val1 = dateT.substring(8);
  const val2 = dateN.getDate();

  const caltime = parseInt(val1) - parseInt(val2);

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
    <div className="task-notification">
      <div className="top-task">
        <p className="task-title">{props.title}</p>
        <p className="task-date">Due: {fullDate}</p>
      </div>
      <p className="task-description">{props.description}</p>
      <div className="bottom-task">
        <p className="task-status">
          Due in: {caltime.toString()} {format}
        </p>
        <a href="/" className="task-href">
          Go to task
        </a>
      </div>
    </div>
  );
}

export default TaskNotification;
