import TaskStatus from "./TaskStatus"
import JoinChat from "./chatLogs/JoinChat"

export function TaskScreen(props) {
    return (
        <>
            <TaskStatus tasks={props.tasks}/>
            <JoinChat tasks={props.tasks}/>
        </>
    )
}