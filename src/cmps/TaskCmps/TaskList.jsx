import { Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskPreview } from "./TaskPreview"
import { useNavigate } from 'react-router'

export function TaskList({ group, saveTask, removeTask, board }) {
    const navigate = useNavigate()

    return (

        <Droppable droppableId={group.id} type="task">
            {(provided) =>
                <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                    {group.tasks.map((task, idx) =>
                        <Draggable key={task.id} draggableId={task.id} index={idx}>

                            {(provided, snapshot) =>
                                    <li key={task.id}
                                        className="task-preview"
                                        onClick={() => navigate(`/board/${board._id}/${group.id}/${task.id}`)}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ backgroundColor: task.style?.backgroundColor || '#ffffff' }}>

                                        <TaskPreview key={task.id}
                                            id={task.id}
                                            task={task}
                                            groupId={group.id}
                                            removeTask={removeTask}
                                            saveTask={saveTask}
                                            board={board}
                                        />
                                    </li>}
                                </Draggable>
                    )}
                            {provided.placeholder}

                        </ul>
            }
                </Droppable >


    )
}