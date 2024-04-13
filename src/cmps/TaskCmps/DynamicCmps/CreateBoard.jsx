import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { boardService } from "../../../services/board/board.service.local"
import { addBoard } from "../../../store/board/board.actions"
import { check_icon, ellipsis_icon, new_board_demo, x_icon } from "../../UtilCmps/SVGs"
import gradIce from "../../../assets/img/gradients/ice.svg"
import gradWave from "../../../assets/img/gradients/wave.svg"
import gradMagic from "../../../assets/img/gradients/magic.svg"
import gradRainbow from "../../../assets/img/gradients/rainbow.svg"
import gradPeach from "../../../assets/img/gradients/peach.svg"
import gradEarth from "../../../assets/img/gradients/earth.svg"


export function CreateBoard({ setIsAddBoard }) {
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())
    const [reqClass, setReqClass] = useState('')
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { type, value, name: field } = target
        if (value) setReqClass('')
        setBoardToAdd(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    function changeBgImg(img) {
        setBoardToAdd(prevBoard => ({ ...prevBoard, style: { ...prevBoard.style, backgroundImage: img } }))
    }

    const imgs = [
        'https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1712291003261-5b3b5cea3f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1712107063586-a282f12c3973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1711636418389-1ee93ebd56fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400'
    ]

    const gradients = [gradEarth, gradIce, gradWave, gradMagic, gradRainbow, gradPeach]

    async function onCreateBoard() {
        try {
            const savedBoard = await addBoard(boardToAdd)
            setIsAddBoard(false)
            console.log('savedBoard', savedBoard)

            navigate(`/board/${savedBoard._id}`)
        }
        catch (err) {
            console.log('err', err)
        }
    }

    return <>
        <header className="dynamic-head-container">
            <h2>Create board</h2>
            <button className="tasks-btn close-btn" onClick={() => setIsAddBoard(false)}>{x_icon}</button>
        </header>
        <div className="picker-container create-new-board">
            <div className="flex align-center justify-center">
                <div className="board-bg-preview flex align-center justify-center" style={{ backgroundImage: `url(${boardToAdd.style?.backgroundImage})` }}>
                    {new_board_demo}
                </div>
            </div>
            <div className="background-picker">
                <h3>Background</h3>
                <div className="imgs flex">
                    {imgs.map((img, idx) => <div key={idx} onClick={() => changeBgImg(img)} style={{ backgroundImage: `url(${img})` }}><span>{boardToAdd.style?.backgroundImage === img ? check_icon : ''}</span></div>)}
                </div>
                <div className="gradients flex">
                    {gradients.map((grad, idx) => <div key={idx} onClick={() => changeBgImg(grad)} style={{ backgroundImage: `url(${grad})` }}><span>{boardToAdd.style?.backgroundImage === grad ? check_icon : ''}</span></div>)}
                    {/* <div className="more">{ellipsis_icon}</div> */}

                </div>
            </div>
            <div className="title-input">
                <label htmlFor="title">Board title<span style={{ color: 'red' }}>*</span></label>
                <ClickAwayListener onClickAway={() => !boardToAdd.title ? setReqClass('red') : ''}>
                    <input className={reqClass} type="text" name="title" id="title" value={boardToAdd.title} onChange={handleChange} onKeyDown={(ev) => { if (ev.code === "Enter") onCreateBoard(ev) }} autoFocus />
                </ClickAwayListener>
            </div>
            {!boardToAdd.title && <div className="req flex align-center"><span>👋</span><p> Board title is required</p></div>}
            <button className="flex create-btn align-center justify-center" onClick={onCreateBoard} disabled={!boardToAdd.title}>Create</button>
            <div className="terms">By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms">Terms of Service</a></div>
        </div>
    </>
}