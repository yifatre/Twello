import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ChecklistList } from './ChecklistList'
import { boardService } from '../../../services/board/board.service'

export function ChecklistIndex({ task, saveTask, groupId,group }) {
    const checklists = task.checklists

    function onRemoveList(_checklist) {
        const _checkListsFiltered = checklists.filter(checklist => checklist.id !== _checklist.id)
        const activity = boardService.getActivity(`delete Checklist to ${task.title}`,0,group,task)
        saveTask({ ...task, checklists: _checkListsFiltered }, groupId,activity)
    }

    function onUpdateList(_checklist ,activity) {
        // const listIdx = checklists.findIndex(checklist => checklist.id === _checklist.id)
        // task.checklists[listIdx] = _checklist
        const _checklists = task.checklists.map(checklist => checklist.id !== _checklist.id ? checklist : _checklist)
        saveTask({...task, checklists: _checklists}, groupId,activity)
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return
        }

        const startIdx = result.source.index
        const endIdx = result.destination.index

        if (result.type === 'list') {
            const [checklist] = checklists.splice(startIdx, 1)
            checklists.splice(endIdx, 0, checklist)

            saveTask({ ...task, checklists }, groupId)
        }

        if (result.type === 'todo') {
            const checklistStart = checklists.find(checklist => checklist.id === result.source.droppableId)
            const checklistEnd = checklists.find(checklist => checklist.id === result.destination.droppableId)
            const [_todo] = checklistStart.todos.splice(startIdx, 1)
            checklistEnd.todos.splice(endIdx, 0, _todo)
            saveTask({ ...task, checklists }, groupId)
        }
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId={'lists'} direction='vertical' type="list">
                {(provided, snapshot) => (
                    <ul className="checkLists clean-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {checklists?.map((checklist, idx) =>
                            <Draggable key={checklist.id} draggableId={checklist.id} index={idx}>
                                {(provided, snapshot) =>
                                    <li key={checklist.id}
                                        // className="checklist-preview-container"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ ...provided.draggableProps?.style, cursor: 'default', }}
                                        >

                                        <ChecklistList
                                            provided={provided}
                                            checklist={checklist}
                                            onRemoveList={onRemoveList}
                                            onUpdateList={onUpdateList}
                                            group={group}
                                            task={task}
                                        />
                                    </li>}
                            </Draggable>
                        )}
                        {provided.placeholder}

                    </ul>)}
            </Droppable>
        </DragDropContext>
    )
}
