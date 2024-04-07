import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { boardService } from "../../../services/board/board.service.local"
import { addBoard } from "../../../store/board/board.actions"
import { check_icon, ellipsis_icon, new_board_demo, x_icon } from "../../UtilCmps/SVGs"
import gradIce from "../../../assets/img/gradients/ice.svg"
import gradWave from "../../../assets/img/gradients/wave.svg"
import gradMagic from "../../../assets/img/gradients/magic.svg"
import gradRainbow from "../../../assets/img/gradients/rainbow.svg"
import gradPeach from "../../../assets/img/gradients/peach.svg"

export function CreateBoard({ setIsAddBoard }) {
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { type, value, name: field } = target
        setBoard(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    useEffect(() => {
        console.log('board.style', board.style)
    }, [board])

    function changeBgImg(img) {
        console.log('img', img)
        setBoard(prevBoard => ({ ...prevBoard, style: { ...prevBoard.style, backgroundImage: img } }))
    }

    const imgs = ['https://images.unsplash.com/photo-1712291003261-5b3b5cea3f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1712148910821-8fe718c418af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1712107063586-a282f12c3973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1711636418389-1ee93ebd56fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400']

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
            <h2>Create board</h2>
            <button className="tasks-btn close-btn" onClick={()=>setIsAddBoard(false)}>{x_icon}</button>
        </header>
        <div className="picker-container create-new-board">
            <div className="flex align-center justify-center">
                <div className="board-bg-preview flex align-center justify-center" style={{ backgroundImage: `url(${board.style?.backgroundImage})` }}>
                    {new_board_demo}
                </div>
            </div>
            <div className="background-picker">
                <h3>Background</h3>
                <div className="imgs flex">
                    <div onClick={() => changeBgImg(imgs[0])} style={{ backgroundImage: `url(${imgs[0]})` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(imgs[1])} style={{ backgroundImage: `url(${imgs[1]})` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(imgs[2])} style={{ backgroundImage: `url(${imgs[2]})` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(imgs[3])} style={{ backgroundImage: `url(${imgs[3]})` }}><span>{check_icon}</span></div>
                </div>
                <div className="gradients flex">
                    <div onClick={() => changeBgImg(gradIce)} style={{ backgroundImage: `url("${gradIce}")` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(gradWave)} style={{ backgroundImage: `url("${gradWave}")` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(gradMagic)} style={{ backgroundImage: `url("${gradMagic}")` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(gradRainbow)} style={{ backgroundImage: `url("${gradRainbow}")` }}><span>{check_icon}</span></div>
                    <div onClick={() => changeBgImg(gradPeach)} style={{ backgroundImage: `url("${gradPeach}")` }}><span>{check_icon}</span></div>
                    <div className="more">{ellipsis_icon}</div>

                </div>
            </div>
            <div className="title-input">
                <label htmlFor="title">Board title<span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="title" id="title" value={board.title} onChange={handleChange} />
            </div>
            <div className="req flex align-center"><span>👋</span><p> Board title is required</p></div>
            {/* <label htmlFor="visibility">Visibility</label>
            <select name="visibility" id="visibility"></select> */}
            <button className="flex create-btn align-center justify-center" onClick={onCreateBoard}>Create</button>
            <div className="terms">By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms">Terms of Service</a></div>
        </div>
    </>
}



/*
https://images.unsplash.com/photo-1712291003261-5b3b5cea3f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400
https://images.unsplash.com/photo-1712148910821-8fe718c418af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400
https://images.unsplash.com/photo-1712107063586-a282f12c3973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400
https://images.unsplash.com/photo-1711636418389-1ee93ebd56fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400


*/