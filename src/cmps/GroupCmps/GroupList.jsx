import { GroupPreview } from "./GroupPreview"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box-without-terminal';
import { updateBoardOptimistic } from "../../store/board/board.actions"
import { utilService } from "../../services/util.service"
import { useState } from "react"
import { plus_icon } from "../UtilCmps/SVGs"
import { DynEntityAdd } from "../TaskCmps/DynEntityAdd"

export function GroupList({ boardFilter, board, saveGroup, removeGroup, saveTask, removeTask, onDragEnd }) {
    const [isLabelsExtended, setIsLabelExtended] = useState(false)
    const [isAddGroup, setIsAddGroup] = useState(false)
    const { groups } = board

    return (
        <DragDropContext
            // onBeforeCapture={onBeforeCapture}
            // onBeforeDragStart={onBeforeDragStart}
            // onDragStart={onDragStart}
            // onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId={'groups'} direction='horizontal' type="group">
                {(provided, snapshot) => (
                    <ul className="clean-list flex group-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {groups?.map((group, idx) =>
                            <Draggable key={group.id} draggableId={group.id} index={idx}>
                                {(provided, snapshot) =>

                                    <li key={group.id}
                                        className="group-preview-container"
                                    // ref={provided.innerRef}
                                    // {...provided.draggableProps}
                                    // {...provided.dragHandleProps}
                                    >
                                        <GroupPreview
                                            
                                            boardFilter={boardFilter}
                                            provided={provided}
                                            snapshot={snapshot}
                                            group={group}
                                            isLabelsExtended={isLabelsExtended}
                                            setIsLabelExtended={setIsLabelExtended}
                                            saveGroup={saveGroup}
                                            removeGroup={removeGroup}
                                            saveTask={saveTask}
                                            removeTask={removeTask}
                                            board={board} />
                                    </li>}
                            </Draggable>
                        )}
                        {provided.placeholder}
                        <li className="group-preview-container group-preview add-group-container">
                            <div className="group-header flex">
                                {!isAddGroup && <button className="add-group-btn group-preview" onClick={() => setIsAddGroup(true)}>{plus_icon}Add another list</button>}
                                {isAddGroup && <div className="add-group group-preview"><DynEntityAdd setIsAddMode={setIsAddGroup} saveEntity={saveGroup} type={'GROUP'} /></div>}

                            </div>
                        </li>
                    </ul>)}
            </Droppable>
        </DragDropContext>
    )
}

