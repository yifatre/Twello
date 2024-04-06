
import { TaskPreview } from "./TaskPreview"


export function TaskList({ tasks, groupId }) {
   

    return (
        <ul className="task-list clean-list">
            {tasks.map(task => 
                <TaskPreview key={task.id} task={task} groupId={groupId}/>
            )}
          
        </ul>
    )
}