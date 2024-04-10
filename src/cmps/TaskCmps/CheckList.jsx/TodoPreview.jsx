import { check_icon } from "../../UtilCmps/SVGs";

export function TodoPreview({ todo }) {
    console.log(todo);
    return (
        <div className="todo-preview">
            <input type="checkbox" />
            {/* <span className="box">
                {check_icon}
            </span> */}
            <div className="todo-title">
                {todo.title}
            </div>
        </div>
    )
}