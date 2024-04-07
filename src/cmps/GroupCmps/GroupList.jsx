import { GroupPreview } from "./GroupPreview"

import {
    DndContext,
    DragOverlay,
    closestCorners,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import { useEffect, useState } from 'react'
import { updateBoard } from "../../store/board/board.actions"
import { utilService } from "../../services/util.service"

export function GroupList({ groups, board }) {
    const [items, setItems] = useState(groups.reduce((acc, group) => { acc[group.id] = group.tasks; return acc }, {}))
    const [activeId, setActiveId] = useState()

    function saveGroup(group) {
        if (group.id) {
            const idx = board.groups.findIndex(_group => _group.id === group.id)
            board.groups[idx] = group
            updateBoard(board)
        } else {
            group.id = utilService.makeId('g')
            board.groups.push(group)
            updateBoard(board)
        }
    }

    function removeGroup(groupId) {
        const board = board.groups.filter(group => group.id !== groupId)
        updateBoard(board)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function findContainer(id) {

        if (id in items) {
            console.log('true')
            return id
        }

        return Object.keys(items).find((key) => items[key].find(item => item.id === id))
    }

    function handleDragStart(event) {
        const { active } = event
        const { id } = active

        setActiveId(id)
    }

    function handleDragOver(event) {
        const { active, over, draggingRect } = event
        const { id } = active
        const { id: overId } = over

        // Find the containers
        const activeContainer = findContainer(id)
        const overContainer = findContainer(overId)

        console.log('activeContainer', activeContainer, 'overContainer', overContainer)

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer]
            const overItems = prev[overContainer]

            const activeIndex = activeItems.findIndex(task => task.id === id)
            const overIndex = overItems.findIndex(task => task.id === overId)
            const newIndex = overItems.length + 1


            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            }
        })
    }

    function handleDragEnd(event) {
        const { active, over } = event
        const { id } = active
        const { id: overId } = over
        console.log("id, over", active, over)
        const activeContainer = findContainer(id)
        const overContainer = findContainer(overId)

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return
        }

        const activeIndex = items[activeContainer].findIndex(item => item.id === active.id)
        const overIndex = items[overContainer].findIndex(item => item.id === overId)

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }))

            groups.map(group => group.tasks = items[group.id])
            updateBoard({ ...board, groups })
        }

        setActiveId(null)
    }
    return (
        <ul className="clean-list flex group-list">
            <DndContext sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                {groups.map(group => {
                    return <GroupPreview key={items[group.id].id}
                        id={items[group.id].id}
                        items={items[group.id]}
                        group={group}
                        activeId={activeId}
                        saveGroup={saveGroup}
                        board={board} />
                })}
            </DndContext>
        </ul>
    )
}

