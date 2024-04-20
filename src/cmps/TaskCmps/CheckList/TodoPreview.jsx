import { useEffect, useState } from "react";
import { check_icon, trash_icon } from "../../UtilCmps/SVGs";

export function TodoPreview({ todo, saveTodo, deleteTodo }) {
    const [isDone, setIsDone] = useState(todo.isDone)

    function handleChange() {
        setIsDone(!todo.isDone)
        saveTodo({ ...todo, isDone: !todo.isDone })
    }
    
    function onDeleteTodo(ev) {
        ev.stopPropagation()
        deleteTodo(todo.id)
    }

    return (
        <div className="todo-preview">
            <input type="checkbox" checked={isDone} onChange={handleChange} onClick={ev => ev.stopPropagation()} />
            <div className="todo-title" style={todo.isDone ? {textDecoration: 'line-through'} : {}}>
                {todo.title}
                <div className="todo-actions">
                    <span className="ta-btn" onClick={onDeleteTodo}>{trash_icon}</span>
                </div>
            </div>
        </div>
    )
}