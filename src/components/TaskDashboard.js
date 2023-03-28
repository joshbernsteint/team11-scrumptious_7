import '../App.css';
import { Stack, Card } from 'react-bootstrap'
import { useRef, useState } from 'react'
import TaskStatus from './TaskStatus';
import NotificationBar from './NotificationBar';




function FocusedTask(task) {
    return (
        <div style={{ width: '40rem', border: "0.15rem solid gray", height: '40rem', borderRadius: '5%', top: "0%", left: "0%", bottom: "auto"}}>
           
        </div>
    )
}

function TaskCard(task) {

}

function TaskList(tasks) {
    return (
        <Stack>
            <h2>Other Tasks</h2>
            <div style = {{overflowY: "scroll", top: "0", height: "40rem", width: "auto", padding: "1rem",left: "0rem"}} >
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
                <h1>Task List</h1>
            </div>
        </Stack>
    )
}


export function TaskDashboard(tasks) {
    const [selectedTask, setSelectedTask] = useState(null);
    const MyTasks = useRef([
        {
          id: "1",
          name: "Submit Roof Picture",
          due: "March 8, 2023",
          owner: "Manager",
          assignedTo: "Construction Worker",
          date: "test",
        }
      ]);




    return (
        <Stack>
            <Card style={{ width: '100%', height: "100%" }}>
            <Card.Body>
                <h1>Task Dashboard</h1>
                <Stack direction='horizontal' gap={2}> 
                    <FocusedTask task={selectedTask}/>
                    <NotificationBar/>
                </Stack>
            </Card.Body>
            </Card>
            
        </Stack>
    )
}