import { Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskPreview } from "./TaskPreview"

export function TaskList({ activeId, id, group, saveTask, removeTask, board }) {

    return (

        <Droppable droppableId={group.id} type="task">
            {(provided) =>
                <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                    {group.tasks.map((task, idx) =>
                        <Draggable key={task.id} draggableId={task.id} index={idx}>

                            {(provided, snapshot) =>
                                <li key={task.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>

                                    <TaskPreview key={task.id}
                                        id={task.id}
                                        task={task}
                                        activeId={activeId}
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