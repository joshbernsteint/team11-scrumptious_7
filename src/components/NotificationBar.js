import React from "react";
import TaskNotification from "./TaskNotification";

function NotificationBar(props) {
  const list = props.tasks
  const priorities=[
    <img src="/priorities/p1.png" className="priority-Images"/>,
    <img src="/priorities/p2.png" className="priority-Images"/>,
    <img src="/priorities/p3.png" className="priority-Images"/>,
    <img src="/priorities/p4.png" className="priority-Images"/>,
    <img src="/priorities/p5.png" className="priority-Images"/>,
  ];

  const sorted = list.sort((a,b) =>
  {
    if(props.filterType === "1"){
      console.log(a.date)
      const aD = parseInt(a.date.substring(8));
      const bD = parseInt(b.date.substring(8));
      const aM = parseInt(a.date.substring(5));
      const bM = parseInt(b.date.substring(5));
      console.log(aD + " " + bD)
      if(aM < bM){
        console.log("here")
        return -1;
      }
      else if(aM > bM){
        return 1;
      }
      else{
        if(aD < bD){
          return -1
        }
        else if(aD > bD){
          return 1;
        }
        return 0;
      }
    }
    else if(props.filterType === "2"){
      if(a.id < b.id){
        return -1;
      }
      else if(a.id > b.id){
        return 1;
      }
      return 0;
    }
    else{
      if(a.priority < b.priority){
        return -1;
      }
      else if(a.priority > b.priority){
        return 1;
      }
      return 0;
    }
  })
  
  if (list.length === 0)
    return (
      <div className="notification-bar">
        <p className="no-notifications">No notifications</p>
      </div>
    );

  const notis = sorted.map((noti) => (
    <TaskNotification
      key={noti.title}
      title={noti.title}
      description={noti.description}
      date={noti.date}
      priority={priorities[parseInt(noti.priority)-1]}
      id={noti.id}
    ></TaskNotification>
  ));
  
  return <div className="notification-bar">{notis}</div>;
}

export default NotificationBar;
