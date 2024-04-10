import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ChecklistList } from './ChecklistList'

export function ChecklistIndex({ task, saveTask, groupId }) {
    const checklists = task.checklists

    function onRemoveList(_checklist) {
        const _checkListsFiltered = checklists.filter(checklist => checklist.id !== _checklist.id)
        saveTask({ ...task, checklists: _checkListsFiltered }, groupId)
    }

    function onUpdateList(_checklist) {
        console.log(_checklist);
        const listIdx = checklists.findIndex(checklist => checklist.id === _checklist.id)
        task.checklists[listIdx] = _checklist
        saveTask(task, groupId)
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return
        }
        console.log(result);
        const startIdx = result.source.index
        const endIdx = result.destination.index

        if (result.type === 'list') {
            const [checklist] = checklists.splice(startIdx, 1)
            checklists.splice(endIdx, 0, checklist)
            console.log('checklist', checklist);

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
                                        {...provided.dragHandleProps}>

                                        <ChecklistList
                                            provided={provided}
                                            checklist={checklist}
                                            onRemoveList={onRemoveList}
                                            onUpdateList={onUpdateList}
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
