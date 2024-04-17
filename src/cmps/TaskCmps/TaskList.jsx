import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskPreview } from "./TaskPreview"
import { DynEntityAdd } from './DynEntityAdd'
import { TaskQuickEdit } from './TaskQuickEdit'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

export function TaskList({boardFilter, group, saveTask, removeTask, board, isLabelsExtended, setIsLabelExtended, isAddMode, setIsAddMode }) {
    const [taskQuickEdit, setTaskQuickEdit] = useState(false)
    const refTrigger = useRef(null)
    const navigate = useNavigate()
    const regex = new RegExp(boardFilter, 'i')

    return (
        <>
            <Droppable droppableId={group.id} type="task" direction='vertical'
            >
                {(provided) =>
                    <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                        {group.tasks?.filter(task => regex.test(task.title) || regex.test(task.description)).map((task, idx) =>
                            <Draggable key={task.id} draggableId={task.id} index={idx} >

                                {(provided, snapshot) => {

                                    return <li key={task.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.snapshot}
                                        {...provided.dragHandleProps}
                                        isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                                        style={snapshot.isDragging && !snapshot.isDropAnimating ? { ...provided.draggableProps?.style, opacity: 0.6, rotate: '6deg' } : { ...provided.draggableProps?.style, cursor: 'pointer', transitionDuration: `0.2s` }}
                                        // style={getStyle(provided.draggableProps.style, snapshot)}
                                        // className={snapshot.isDragging ? '.dragged-task' : ''}
                                        onClick={() => navigate(`/board/${board._id}/${group.id}/${task.id}`)}
                                    >

                                        <TaskPreview key={task.id}
                                            id={task.id}
                                            task={task}
                                            groupId={group.id}
                                            removeTask={removeTask}
                                            saveTask={saveTask}
                                            board={board}
                                            isLabelsExtended={isLabelsExtended}
                                            setIsLabelExtended={setIsLabelExtended}
                                            setTaskQuickEdit={setTaskQuickEdit}
                                            refTrigger={refTrigger}
                                        />
                                    </li>
                                }}
                            </Draggable>
                        )}
                        {/* {console.log(taskQuickEdit)} */}
                        {taskQuickEdit && <TaskQuickEdit
                            taskQuickEdit={taskQuickEdit}
                            groupId={group.id}
                            removeTask={removeTask}
                            saveTask={saveTask}
                            board={board}
                            isLabelsExtended={isLabelsExtended}
                            setIsLabelExtended={setIsLabelExtended}
                            setTaskQuickEdit={setTaskQuickEdit}
                            refTrigger={refTrigger}
                            group={group}
                        />}

                        {/* {<div style={{ background: 'blue' }}> {provided.placeholder}</div>} */}
                        {/* <div style={{ marginBlock: '8px' }}> */}
                        {provided.placeholder}
                        {/* </div> */}
                        {/* {console.log("provided.dragHandleProps", provided.dragHandleProps)} */}

                        {/* {console.log("provided.placeholder", provided)} */}
                        {isAddMode && <DynEntityAdd setIsAddMode={setIsAddMode} saveEntity={saveTask} groupId={group.id} />}
                    </ul>
                }
            </Droppable ></>
    )
}