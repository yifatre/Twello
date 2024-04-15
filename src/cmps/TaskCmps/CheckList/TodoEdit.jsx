import { useEffect, useRef, useState } from "react"
import { clock_icon, member_icon, x_icon } from "../../UtilCmps/SVGs"
import { TextareaAutosize as MinTextArea } from "@mui/base/TextareaAutosize"
import { ClickAwayListener } from "@mui/base/ClickAwayListener"
import { boardService } from "../../../services/board/board.service.local"

export function TodoEdit({ todo, saveTodo, setIsAddTodo, isFirst }) {
    const [todoToEdit, setTodoToEdit] = useState(todo)
    const editRef = useRef(null)

    useEffect(() => {
        editRef.current.scrollIntoView({inline: "center", behavior: "smooth"})
    }, [])

    function handleTitleChange({ target }) {
        const { name, value } = target
        console.log(name, value)
        setTodoToEdit((prevTodo) => ({ ...prevTodo, [name]: value }))
    }

    function handleDoneChange() {
        setTodoToEdit(prevTodo => ({...prevTodo, isDone: !prevTodo.isDone}))
        saveTodo({ ...todo, isDone: !todoToEdit.isDone })
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
        setIsAddTodo(true)
        setTodoToEdit(boardService.getEmptyTodo())
        ev.target.scrollIntoView({inline: "center", behavior: "smooth"})
    }

    console.log(todoToEdit.isDone)

    return (
        <ClickAwayListener onClickAway={() => setIsAddTodo(false)}>
            <form className={`todo-edit-form ${isFirst ? 'first' : ''}`} onSubmit={onSaveTodo} ref={editRef}>
                {todo.id && <input type="checkbox" checked={todoToEdit.isDone} onChange={handleDoneChange}/>}
                <div className={`content ${todo.id ? "edit" : "add"}`}>
                    <MinTextArea
                        className="todo-title-edit"
                        placeholder="Add an item"
                        name="title"
                        value={todoToEdit.title}
                        autoFocus={true}
                        onFocus={(ev) => ev.target.select()}
                        onChange={handleTitleChange}
                        onKeyDown={(ev) => {
                            if (ev.code === "Enter") onSaveTodo(ev)
                        }}
                    ></MinTextArea>

                    <div className="edit-todo-actions">
                        <button className="add-todo-btn">{todo.id ? "Save" : "Add"}</button>
                        <button
                            className={`t-btn ${todo.id ? "x" : ""}`}
                            id="cancel-btn"
                            type="button"
                            onClick={() => setIsAddTodo(false)}
                        >
                            {todo.id ? x_icon : "Cancel"}
                        </button>
                        <div className="assign-and-date">
                            {todo.id && <button className="t-btn">Delete</button>}
                            <button className="t-btn" name="date">
                                {clock_icon} {todoToEdit.date || "Due date"}
                            </button>
                            <button className="t-btn" name="member">
                                {member_icon} {todoToEdit.member || "Assign"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </ClickAwayListener>
    )
}
