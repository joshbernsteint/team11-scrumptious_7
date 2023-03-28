import '../App.css';
import { Stack, Card, ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import TaskStatus from './TaskStatus';
import NotificationBar from './NotificationBar';

const priorities=[
    <img src="/priorities/p1.png" className="priority-Images"/>,
    <img src="/priorities/p2.png" className="priority-Images"/>,
    <img src="/priorities/p3.png" className="priority-Images"/>,
    <img src="/priorities/p4.png" className="priority-Images"/>,
    <img src="/priorities/p5.png" className="priority-Images"/>,
  ];

  const prioritiesB=[
    <img src="/priorities/p1.png" className="priority-Images-large"/>,
    <img src="/priorities/p2.png" className="priority-Images-large"/>,
    <img src="/priorities/p3.png" className="priority-Images-large"/>,
    <img src="/priorities/p4.png" className="priority-Images-large"/>,
    <img src="/priorities/p5.png" className="priority-Images-large"/>,
  ];

  

function FocusedTask(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedTask, setSelectedTask] = useState(props.tasks[0]);
    const otherChoices = (props.tasks).filter((a) => {
        if(a.id === props.task.id){
            return -1;
        }
        return 1;
    })

    return (
        <div style={{ width: '40rem', border: "0.15rem solid gray", height: '40rem', borderRadius: '5%', top: "0", left: "0", bottom: "auto"}}>
           <h1>Task ID: {selectedTask.id}</h1>
           <h6><i>Due: {selectedTask.due}</i></h6>
           <h5>
            {prioritiesB[selectedTask.priority-1]}
           </h5>
           <h5><b>Description</b></h5>
           {selectedTask.description}<br/>
           <>
        <Button variant="primary" onClick={handleShow}>
          Change Featured Task
        </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Different Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                {otherChoices.map((t, idx) => (
                    <Button value={idx} variant="success" onClick={(e) => {setSelectedTask(props.tasks[e.currentTarget.value])}}>ID #{t.id}: {t.title}</Button>
                ))}
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
      </>
        </div>
    )
}

function getBar(props){
    return (<NotificationBar tasks={props.tasks} filterType={props.filter} dir={props.dir} pList={priorities}/>)
}


export function TaskDashboard(tasks) {
    const myTasks = tasks.taskRef;
    const [selectedTask, setSelectedTask] = useState(myTasks[0]);
    


      const [filterVal, setFilterVal] = useState('1');
      const filters = [
        { filterName: "Date", value: "1"},
        { filterName: "Id", value: "2"},
        { filterName: "Priority", value: "3"},
        
      ];

      const [direction, setDirection] = useState(0);
      const directions = [
        { directionName: "Ascending", value: 0, image: "./sort-ascending.png"},
        { directionName: "Descending", value: 1, image: "./sort-descending.png"},
      ]

    const [notBar, setnotBar] = useState(getBar({tasks: myTasks, filter: filterVal, dir: direction}))

    return (
        <div>
            <Card style={{ width: '100%', height: "40rem", border: "0"}}>
            <Card.Body>
                <h1>Task Dashboard</h1>
                <Stack direction='horizontal' gap={2}> 
                    <FocusedTask task={myTasks[0]} tasks={myTasks}/>
                    <Stack style={{maxWidth: "100%"}}>
                        <Stack direction="horizontal" gap = {2}>
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
                                        setnotBar(getBar({tasks: myTasks, filter: e.currentTarget.value, dir: direction}))}}
                                >
                                    {filter.filterName}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>

                            <div>
                                <ButtonGroup style={{width: "30%", right: "0", left: "auto"}}>
                                    {directions.map((dir, idx) => (
                                    <ToggleButton
                                        size={"sm"}
                                        key={idx}
                                        id={`direction-${idx}`}
                                        type="radio"
                                        variant={'outline-secondary'}
                                        name="direction"
                                        value={dir.value}
                                        checked={direction == dir.value}
                                        onChange={(e) => {
                                            setDirection(e.currentTarget.value);
                                            setnotBar(getBar({tasks: myTasks, filter: filterVal, dir: e.currentTarget.value}))}}
                                    >
                                        <img src={dir.image} style={{height: "20px"}}/>
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Stack>
                        {notBar}
                    </Stack>
                </Stack>
            </Card.Body>
            </Card>
        
        </div>
    )
}