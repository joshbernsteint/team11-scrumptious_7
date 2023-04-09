import React from 'react';

import '../App.css';
import TaskStatus from './TaskStatus';
import { TaskDashboard } from './TaskDashboard';
import NotificationBar from './NotificationBar'

function Home(props) {
  return (
    <div>
      <TaskDashboard taskRef={props.tasks}/>
    </div>
  );
}

export default Home;
