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

    // function getStyle(style, snapshot) {
    //     if (!snapshot.isDropAnimating) {
    //         return style
    //     }
    //     const { moveTo, curve, duration } = snapshot.dropAnimation
    //     // move to the right spot
    //     const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`
    //     // add a bit of turn for fun
    //     const rotate = 'rotate(6deg)'

    //     // patching the existing style
    //     return {
    //         ...style,
    //         opacity: 0.6,
    //         transform: `${translate} ${rotate}`,
    //         // slowing down the drop because we can
    //         transition: `all ${curve} ${duration + 1}s`,
    //         transitionDuration: `0.001s`
    //     }
    // }

    return (
        <>
            <Droppable droppableId={group.id} type="task" direction='vertical'
            >
                {(provided) =>
                    <ul className="task-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>

                        {group.tasks?.map((task, idx) =>
                            <Draggable key={task.id} draggableId={task.id} index={idx} >

                                {(provided, snapshot) => {

                                    return <li key={task.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.snapshot}
                                        {...provided.dragHandleProps}
                                        isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                                        style={snapshot.isDragging && !snapshot.isDropAnimating ? { ...provided.draggableProps?.style, opacity: 0.6, rotate: '6deg' } : { ...provided.draggableProps?.style, cursor: 'pointer', transitionDuration: `0.01s` }}
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