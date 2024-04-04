import { TaskPreview } from "./TaskPreview";

export function TaskList({ tasks }) {
    return (
        <ul className="task-list clean-list">
            {tasks.map(task => 
                <TaskPreview key={task.id} task={task}/>
            )}
        </ul>
    )
}