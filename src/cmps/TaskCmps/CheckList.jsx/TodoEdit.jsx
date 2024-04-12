import { useState } from "react";
import { clock_icon, member_icon, x_icon } from "../../UtilCmps/SVGs"
import { TextareaAutosize as MinTextArea } from '@mui/base/TextareaAutosize'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

export function TodoEdit({ todo, saveTodo, setIsAddTodo }) {
    const [todoToEdit, setTodoToEdit] = useState(todo)

    function handleTitleChange({ target }) {
        const { name, value } = target
        console.log(name, value);
        setTodoToEdit(prevTodo => ({ ...prevTodo, [name]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
        setIsAddTodo(false)
    }

    return (
        <ClickAwayListener onClickAway={() => setIsAddTodo(false)}>
            <form className="todo-edit-form" onSubmit={onSaveTodo}>
                {todo.id && <input type="checkbox" />}
                <div className={`content ${todo.id ? 'edit' : 'add'}`}>
                    <MinTextArea className="todo-title-edit" placeholder='Add an item' name="title" value={todoToEdit.title} autoFocus={true} onFocus={(ev) => ev.target.select()} onChange={handleTitleChange} onKeyDown={(ev) => { if (ev.code === 'Enter') onSaveTodo(ev) }} ></MinTextArea>
                    <div className="edit-todo-actions">
                        <button className="add-todo-btn">{todo.id ? 'Save' : 'Add'}</button>
                        <button className={`t-btn ${todo.id ? 'x' : ''}`} id="cancel-btn" type="button" onClick={() => setIsAddTodo(false)}>{todo.id ? x_icon : 'Cancel'}</button>
                        <div className="assign-and-date">
                            {todo.id && <button className="t-btn">Delete</button>}
                            <button className="t-btn" name="date">{clock_icon} {todoToEdit.date || 'Due date'}</button>
                            <button className="t-btn" name="member">{member_icon} {todoToEdit.member || 'Assign'}</button>
                        </div>
                    </div>
                </div>
            </form>
        </ClickAwayListener>
    )
}