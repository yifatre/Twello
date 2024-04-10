import { checked_icon } from "../../UtilCmps/SVGs"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TodoPreview } from "./TodoPreview";

// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

export function ChecklistList({ checklist }) {
    console.log(checklist);
    return (

        <section className="checklist">
            <div className="checklist-header">
                {checked_icon}
                <h3>{checklist.title}</h3>
                <button className="delete-tasklist">Delete</button>
            </div>
            <div className="progressbar">
                {/* <LinearProgress value={20}/> */}
            </div>
            <Droppable droppableId={checklist.id} type="todo">
                {(provided) =>
                    <ul className="todo-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {checklist.todos?.map((todo, idx) =>
                            <Draggable key={todo.id} draggableId={todo.id} index={idx}>

                                {(provided, snapshot) =>
                                    <li key={todo.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>

                                        <TodoPreview key={todo.id}
                                            id={todo.id}
                                            todo={todo}
                                            checklistId={checklist.id}
                                        />
                                    </li>}
                            </Draggable>
                        )}
                        {provided.placeholder}
                    </ul>
                }
            </Droppable >
            <button className="add-todo">Add an item</button>
        </section>
    )
}