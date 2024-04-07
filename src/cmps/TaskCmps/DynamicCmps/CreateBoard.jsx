import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { boardService } from "../../../services/board/board.service.local"
import { addBoard } from "../../../store/board/board.actions"
import { new_board_demo, x_icon } from "../../UtilCmps/SVGs"

export function CreateBoard({ setIsAddBoard }) {
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { type, value, name: field } = target
        setBoard(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    async function onCreateBoard() {
        try {
            const savedBoard = await addBoard(board)
            setIsAddBoard(false)
            navigate(`/board/${savedBoard._id}`)
        }
        catch (err) {
            console.log('err', err)
        }
    }

    return <>
        <header className="dynamic-head-container">
            <h2>Dates</h2>
            <button className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <input type="text" name="title" id="title" value={board.title} onChange={handleChange} />
        **Bg picker**
        <button onClick={onCreateBoard}>Create</button>
    </>
}