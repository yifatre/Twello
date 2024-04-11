import { GroupPreview } from "./GroupPreview"
import { DragDropContext, Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box-without-terminal';
import { updateBoard } from "../../store/board/board.actions"
import { utilService } from "../../services/util.service"
import { useEffect, useRef, useState } from "react"
import { plus_icon } from "../UtilCmps/SVGs"
import { DynEntityAdd } from "../TaskCmps/DynEntityAdd"

// import {
//     dropTargetForExternal,
//     monitorForExternal,
// } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';

// import {
//     dropTargetForElements,
//     monitorForElements,
// } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

// import {
//     dropTargetForTextSelection,
//     monitorForTextSelection,
// } from '@atlaskit/pragmatic-drag-and-drop/text-selection/adapter';

import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';

export function GroupList({ board, saveGroup, removeGroup, saveTask, removeTask }) {
    const [isLabelsExtended, setIsLabelExtended] = useState(false)
    const [isAddGroup, setIsAddGroup] = useState(false)
    const [draggableItem, setDraggableItem] = useState(false)
    const [id, setId] = useState()
    const ref = useRef(null);
    const { groups } = board
    const [_groups, _setGroups] = useState(groups)
    //   const [isDraggedOver, setIsDraggedOver] = useState(false);

    // useEffect(()=> {

    // },[_groups])


    useEffect(() => {
        return monitorForElements({
            onDragStart({ source, location }) {
                // source.element.style = {...source.element.style, background: 'blue'}
                source.element = <div>sdkgljfgasfkd;a</div>
                console.log(source);
                console.log(source.element);
                // setDraggableItem(source.data.idx)
            },

            onDrag({ source, location }) {
                // console.log(source, location);
                // const destination = location.current.dropTargets[0];
                // if (!destination) {
                //     // if dropped outside of any drop targets
                //     return;
                // }
                // const destinationLocation = destination.data.idx;
                // const sourceLocation = source.data.idx;
                // const pieceType = source.data.type;

                // const [group] = _groups.splice(sourceLocation, 1)
                // // console.log('group', group);
                // _groups.splice(destinationLocation, 0, group)
                // // console.log('groups', _groups);
                // _setGroups([..._groups])
            },

            onDrop({ source, location }) {
                console.log('ondrop', source, location);
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    // if dropped outside of any drop targets
                    return;
                }
                const destinationLocation = destination.data.idx;
                const sourceLocation = source.data.idx;
                const pieceType = source.data.type;

                console.log('destinationLocation', destinationLocation);
                console.log('sourceLocation', sourceLocation);
                console.log('pieceType', pieceType);


                const [group] = _groups.splice(sourceLocation, 1)
                console.log('group', group);
                _groups.splice(destinationLocation, 0, group)
                // console.log('groups', _groups);
                _setGroups([..._groups])
                console.log('groups', groups);
                updateBoard({ ...board, _groups })
                // if (
                //     // type guarding
                //     !isCoord(destinationLocation) ||
                //     !isCoord(sourceLocation) ||
                //     !isPieceType(pieceType)
                // ) {
                //     return;
                // }

                // const piece = pieces.find(p =>
                //     isEqualCoord(p.location, sourceLocation),
                // );
                // const restOfPieces = pieces.filter(p => p !== piece);

                // if (
                //     canMove(sourceLocation, destinationLocation, pieceType, pieces) &&
                //     piece !== undefined
                // ) {
                //     // moving the piece!
                //     setPieces([
                //         { type: piece.type, location: destinationLocation },
                //         ...restOfPieces,
                //     ]);
                // }
            },
        });
    }, []);

    function onDragStart(abc) {
        // console.log('abc', abc)
    }

    function onDragUpdate(ev) {
        // console.log('ev', ev)
    }

    function onDragEnd(result) {
        // console.log('result', result)
        if (!result.destination) {
            return
        }

        const startIdx = result.source.index
        const endIdx = result.destination.index

        if (result.type === 'group') {
            const [group] = groups.splice(startIdx, 1)
            groups.splice(endIdx, 0, group)
            updateBoard({ ...board, groups })
        }

        if (result.type === 'task') {
            const groupStart = groups.find(group => group.id === result.source.droppableId)
            const groupEnd = groups.find(group => group.id === result.destination.droppableId)
            const [task] = groupStart.tasks.splice(startIdx, 1)
            groupEnd.tasks.splice(endIdx, 0, task)
            // updateBoard({ ...board, groups })
        }
    }

    return (

        <ul className="clean-list flex group-list">
            {_groups?.map((group, idx) =>

                // <li key={group.id}
                //     className="group-preview-container"
                //     ref={ref}
                // >
                <GroupPreview
                    key={idx}
                    idx={idx}
                    group={group}
                    isLabelsExtended={isLabelsExtended}
                    setIsLabelExtended={setIsLabelExtended}
                    saveGroup={saveGroup}
                    saveTask={saveTask}
                    removeTask={removeTask}
                    board={board} />
                // <DropIndicator />
                // </li>
            )}
            <li className="group-preview-container group-preview add-group-container" >
                <div className="group-header flex">
                    {!isAddGroup && <button className="add-group-btn group-preview" onClick={() => setIsAddGroup(true)}>{plus_icon}Add another list</button>}
                    {isAddGroup && <div className="add-group group-preview"><DynEntityAdd setIsAddMode={setIsAddGroup} saveEntity={saveGroup} type={'GROUP'} /></div>}

                </div>
            </li>
        </ul>

    )
}

