import React from "react";
import TaskNotification from "./TaskNotification";

function NotificationBar(props) {
  const list = [
    { title: "Task 1", description: "Task 1 description", date: "2023-03-30" },
    { title: "Task 2", description: "Task 2 description", date: "2023-04-20" },
    { title: "Task 3", description: "Task 3 description", date: "2023-03-07" },
    { title: "Task 4", description: "Task 4 description", date: "2023-03-10" },
    { title: "Task 5", description: "Task 5 description", date: "2023-03-02" },
  ];

  
  // for (let i = 0; i < list.length; i++) {
  //   if (
  //     parseInt(list[i].date.substring(8)) - parseInt(new Date().getDate()) >
  //     100
  //     ) {
  //       list.splice(i, 1);
  //       i--;
  //       continue;
  //     }
  //     if (
  //       parseInt(list[i].date.substring(8)) - parseInt(new Date().getDate()) <
  //       0
  //       ) {
  //         list.splice(i, 1);
  //         i--;
  //       }
  //     }
  if (list.length === 0)
    return (
      <div className="notification-bar">
        <p className="no-notifications">No notifications</p>
      </div>
    );

  const notis = list.map((noti) => (
    <TaskNotification
      key={noti.title}
      title={noti.title}
      description={noti.description}
      date={noti.date}
    ></TaskNotification>
  ));

  return <div className="notification-bar">{notis}</div>;
}

export default NotificationBar;
