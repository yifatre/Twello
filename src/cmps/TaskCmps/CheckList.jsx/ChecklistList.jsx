import { checked_icon, x_icon } from "../../UtilCmps/SVGs"
import { Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { TodoPreview } from "./TodoPreview"
import { useState } from "react"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'


import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { TodoEdit } from "./TodoEdit"
import { boardService } from "../../../services/board/board.service.local"
import { utilService } from "../../../services/util.service"

export function ChecklistList({ checklist, onRemoveList, onUpdateList }) {
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isAddTodo, setIsAddTodo] = useState(false)
    const [titleToEdit, setTitleToEdit] = useState(checklist.title)
    const [todoToEdit, setTodoToEdit] = useState(true)

    function handleClickAway() {
        onUpdateTitle()
    }

    function onUpdateTitle() {
        setIsEditTitle(false)
        checklist.title = titleToEdit
        onUpdateList(checklist)
    }

    function handleTitleChange({ target }) {
        setTitleToEdit(target.value)
    }

    function saveTodo(todo) {
        console.log(todo);

        if (!todo.id) {
            todo.id = utilService.makeId('t')
            onUpdateList({ ...checklist, todos: [...checklist.todos, todo] })
        }
        else {
            const _todos = checklist.todos.map(_todo => _todo.id === todo.id ? todo : _todo)
            onUpdateList({ ...checklist, todos: _todos })
        }
    }

    return (
        <section className="checklist">

            {!isEditTitle && <div className="checklist-header">
                {checked_icon}
                <h3 onClick={() => setIsEditTitle(true)}>{checklist.title}</h3>
                <button className="delete-tasklist" onClick={() => onRemoveList(checklist)}>Delete</button>
            </div>}


            {isEditTitle &&
                <div className="title-edit-container">
                    {checked_icon}
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <MinTextArea className="title-edit" value={titleToEdit} autoFocus={true} onFocus={(ev) => ev.target.select()} onChange={handleTitleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') handleClickAway() }} ></MinTextArea>
                    </ClickAwayListener>
                    <button className="title-save-btn" onClick={onUpdateTitle}>Save</button>
                    <button className="title-close-btn" onClick={() => setIsEditTitle(false)}>{x_icon}</button></div>
            }

            <div className="progressbar">
                {/* <LinearProgress value={20}/> */}
            </div>
            <Droppable droppableId={checklist.id} type="todo">
                {(provided) =>
                    <ul className="todo-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {checklist.todos?.map((todo, idx) => <>
                            {todoToEdit.id === todo.id && <TodoEdit todo={todoToEdit} setIsAddTodo={setTodoToEdit} saveTodo={saveTodo} />}
                            {todoToEdit.id !== todo.id && <Draggable key={todo.id} draggableId={todo.id} index={idx}>

                                {(provided, snapshot) =>
                                    <li key={todo.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => setTodoToEdit(todo)}
                                    >
                                        <TodoPreview key={todo.id}
                                            id={todo.id}
                                            todo={todo}
                                            checklistId={checklist.id}
                                            todoToEdit={todoToEdit}
                                        />
                                    </li>}
                            </Draggable>}
                        </>
                        )}
                        {provided.placeholder}
                    </ul>
                }
            </Droppable >
            <button className="add-todo" onClick={() => setIsAddTodo(true)}>Add an item</button>
            {isAddTodo && <TodoEdit todo={boardService.getEmptyTodo()} setIsAddTodo={setIsAddTodo} saveTodo={saveTodo} />}
        </section >
    )
}