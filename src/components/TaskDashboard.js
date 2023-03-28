import '../App.css';
import { Stack, Card, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import TaskStatus from './TaskStatus';
import NotificationBar from './NotificationBar';




function FocusedTask(task) {
    return (
        <div style={{ width: '40rem', border: "0.15rem solid gray", height: '40rem', borderRadius: '5%', top: "0%", left: "0%", bottom: "auto"}}>
           
        </div>
    )
}

function getBar(props){
    return (<NotificationBar tasks={props.tasks} filterType={props.filter}/>)
}


export function TaskDashboard(tasks) {
    const [selectedTask, setSelectedTask] = useState(null);
    const MyTasks = useRef([
        {
          id: "1",
          title: "Submit Roof Picture",
          due: "March 8, 2023",
          owner: "Manager",
          assignedTo: "Construction Worker",
          description: "placeholder",
          priority: "3",
          date: "2023-03-8",
        },
        {
            id: "5",
            title: "Begin truss supports",
            due: "March 12, 2023",
            owner: "Manager",
            assignedTo: "Construction Worker",
            description: "",
            priority: "4",
            date: "2023-03-12",
        },
        {
            id: "2",
            title: "Install panels",
            due: "March 16, 2023",
            owner: "Manager",
            assignedTo: "Construction Worker",
            description: "Put panels in place",
            priority: "1",
            date: "2023-03-30",
        },
        {
            id: "3",
            title: "Connect wiring",
            due: "May 12, 2023",
            owner: "Manager",
            assignedTo: "Construction Worker",
            description: "Connect electrical wiring",
            priority: "2",
            date: "2023-03-31",
        },
      ]);


      const [filterVal, setFilterVal] = useState('2');
      const filters = [
        { filterName: "Date", value: "1"},
        { filterName: "Id", value: "2"},
        { filterName: "Priority", value: "3"},
        
      ];

    const [notBar, setnotBar] = useState(getBar({tasks: MyTasks.current, filter: filterVal}))


    return (
        <div className='taskScreen'>
            <Card style={{ width: '100%', height: "40rem", border: "0"}}>
            <Card.Body>
                <h1>Task Dashboard</h1>
                <Stack direction='horizontal' gap={2}> 
                    <FocusedTask task={selectedTask}/>
                    <Stack style={{maxWidth: "100%"}}>
                        <ButtonGroup style={{width: "50%", top: "2%"}}>
                            {filters.map((filter, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`filter-${idx}`}
                                type="radio"
                                variant={'outline-primary'}
                                name="filter"
                                value={filter.value}
                                checked={filterVal === filter.value}
                                onChange={(e) => {
                                    setFilterVal(e.currentTarget.value);
                                    setnotBar(getBar({tasks: MyTasks.current, filter: e.currentTarget.value}))}}
                            >
                                {filter.filterName}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                        {notBar}
                    </Stack>
                </Stack>
            </Card.Body>
            </Card>
        
        </div>
    )
}