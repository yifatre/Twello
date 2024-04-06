
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { TaskPreview } from "./TaskPreview"
import { useState } from 'react'

export function TaskList({ items, activeId, id, groupId }) {
    const { setNodeRef } = useDroppable({
        id
    });
    // console.log(items);
    return (

        <SortableContext items={items} id={id} strategy={verticalListSortingStrategy}>
            <ul className="task-list clean-list" ref={setNodeRef}>

                {items.map(task =>
                    <TaskPreview key={task.id} id={task.id} task={task} activeId={activeId} groupId={groupId}/>
                )}

            </ul>
        </SortableContext>

    )
}