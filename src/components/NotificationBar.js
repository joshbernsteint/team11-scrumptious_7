import React from "react";
import TaskNotification from "./TaskNotification";

function NotificationBar(props) {
  const list = props.tasks
  const spanishTranslation = props.spaTranslation
  const priorities = props.pList
  const sorted = list.sort((a,b) =>
  {
    if(props.filterType === "1"){
      const aD = parseInt(a.dueDate.substring(8));
      const bD = parseInt(b.dueDate.substring(8));
      const aM = parseInt(a.dueDate.substring(5));
      const bM = parseInt(b.dueDate.substring(5));
      if(aM < bM){
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


    const sortedWdir = (() =>{
      if(props.dir == 0){
        return sorted;
      }
      else if(props.dir == 1){
        return sorted.reverse();
      }
    })
  const notis = (sortedWdir()).map((noti) => (
    <TaskNotification
      key={noti.title}
      title={noti.title}
      description={noti.description}
      date={noti.dueDate}
      priority={priorities[parseInt(noti.priority)-1]}
      id={noti.id}
      completed={noti.completed}
      spaTranslation={spanishTranslation}
    ></TaskNotification>
  ));
  
  return <div className="notification-bar">{notis}</div>;
}

export default NotificationBar;
