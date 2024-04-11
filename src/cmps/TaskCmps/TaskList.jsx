import { Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { TaskPreview } from "./TaskPreview"
import { DynEntityAdd } from './DynEntityAdd'

export function TaskList({ group, saveTask, removeTask, board, isLabelsExtended, setIsLabelExtended, isAddMode, setIsAddMode }) {

    return (
        <>
        <Droppable droppableId={group.id} type="task">
            {(provided) =>
                <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                    {group.tasks?.map((task, idx) =>
                        <Draggable key={task.id} draggableId={task.id} index={idx}>

                            {(provided, snapshot) =>
                                <li key={task.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>

                                    <TaskPreview key={task.id}
                                        id={task.id}
                                        task={task}
                                        groupId={group.id}
                                        removeTask={removeTask}
                                        saveTask={saveTask}
                                        board={board}
                                        isLabelsExtended={isLabelsExtended}
                                        setIsLabelExtended={setIsLabelExtended}
                                    />
                                </li>}
                        </Draggable>
                    )}
                    {provided.placeholder}
                    {isAddMode && <DynEntityAdd setIsAddMode={setIsAddMode} saveEntity={saveTask} groupId={group.id} />}
                </ul>
            }
        </Droppable ></>
    )
}