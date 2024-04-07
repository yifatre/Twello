import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { TaskPreview } from "./TaskPreview"

export function TaskList({ items, activeId, id, group, saveTask, removeTask, board }) {
    const { setNodeRef } = useDroppable({
        id
    })
    // console.log(items);
    return (

        <SortableContext items={items} id={id} strategy={verticalListSortingStrategy}>
            <ul className="task-list clean-list" ref={setNodeRef}>

                {items.map(task =>
                    <TaskPreview key={task.id}
                        id={task.id}
                        task={task}
                        activeId={activeId}
                        groupId={group.id}
                        removeTask={removeTask}
                        saveTask={saveTask}
                        board={board}
                    />
                )}

            </ul>
        </SortableContext>

    )
}