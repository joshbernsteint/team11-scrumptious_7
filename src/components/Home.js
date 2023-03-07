import React from 'react';

import '../App.css';
import TaskStatus from './TaskStatus';
import NotificationBar from './NotificationBar'

function Home() {
  return (
    <div>
      <TaskStatus></TaskStatus>
    </div>
  );
}

export default Home;
