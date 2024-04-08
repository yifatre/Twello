import { GroupPreview } from "./GroupPreview"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateBoard } from "../../store/board/board.actions"
import { utilService } from "../../services/util.service"
import { useState } from "react"

export function GroupList({ board, saveGroup, removeGroup, saveTask, removeTask }) {
    const [isLabelsExtended, setIsLabelExtended] = useState(true)
    const { groups } = board

    function onDragEnd(result) {
        if (!result.destination) {
            return
        }

        const startIdx = result.source.index
        const endIdx = result.destination.index

        if (result.type === 'group') {
            const [group] = groups.splice(startIdx, 1)
            groups.splice(endIdx, 0, group)
            updateBoard({ ...board, groups })
        }

        if (result.type === 'task') {
            const groupStart = groups.find(group => group.id === result.source.droppableId)
            const groupEnd = groups.find(group => group.id === result.destination.droppableId)
            const [task] = groupStart.tasks.splice(startIdx, 1)
            groupEnd.tasks.splice(endIdx, 0, task)
            updateBoard({ ...board, groups })
        }
    }

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
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>

                                        <GroupPreview
                                            provided={provided}
                                            group={group}
                                            isLabelsExtended={isLabelsExtended}
                                            setIsLabelExtended={setIsLabelExtended}
                                            saveGroup={saveGroup}
                                            saveTask={saveTask}
                                            removeTask={removeTask}
                                            board={board} />
                                    </li>}
                            </Draggable>
                        )}
                        {provided.placeholder}

                    </ul>)}
            </Droppable>
        </DragDropContext>
    )
}

