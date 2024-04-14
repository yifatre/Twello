import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskPreview } from "./TaskPreview"
import { DynEntityAdd } from './DynEntityAdd'
import { TaskQuickEdit } from './TaskQuickEdit'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

export function TaskList({ group, saveTask, removeTask, board, isLabelsExtended, setIsLabelExtended, isAddMode, setIsAddMode }) {
    const [taskQuickEdit, setTaskQuickEdit] = useState(false)
    const refTrigger = useRef(null)
    const navigate = useNavigate()
    // console.log(taskQuickEdit)
    return (
        <>
            <Droppable droppableId={group.id} type="task" direction='vertical'>
                {(provided) =>
                    <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                        {group.tasks?.map((task, idx) =>
                            <Draggable key={task.id} draggableId={task.id} index={idx} >

                                {(provided, snapshot) => {
                                    // console.log('snapshot', snapshot.isClone = true)
                                    // console.log('provided.draggableProps?.style.', provided.draggableProps?.style, 'task.id', task.id)
                                    return <li key={task.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        // style={{ ...provided.draggableProps?.style,  }}
                                        style={snapshot.isDragging ? { ...provided.draggableProps?.style, opacity: 0.6, rotate: '6deg', } : { ...provided.draggableProps?.style, cursor: 'pointer' }}
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