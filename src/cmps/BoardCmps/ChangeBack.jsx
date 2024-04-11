import { useState } from "react"

import { plus_icon } from "../UtilCmps/SVGs";
import gradIce from "../../assets/img/gradients/ice.svg"
import gradWave from "../../assets/img/gradients/wave.svg"
import gradMagic from "../../assets/img/gradients/magic.svg"
import gradRainbow from "../../assets/img/gradients/rainbow.svg"
import gradPeach from "../../assets/img/gradients/peach.svg"
import gradAline from "../../assets/img/gradients/alien.svg"
import gradEarth from "../../assets/img/gradients/earth.svg"
import gradFlower from "../../assets/img/gradients/flower.svg"
import gradLava from "../../assets/img/gradients/lava.svg"
import { updateBoard } from "../../store/board/board.actions";



export function ChangeBack({ setTopHead, board, setBackTo, topHead }) {

    // const [state, setState] = useState('')
    const gradients = [gradIce, gradWave, gradMagic, gradRainbow, gradPeach, gradFlower, gradEarth, gradAline, gradLava]

    const imgs = [
        'https://images.unsplash.com/photo-1712291003261-5b3b5cea3f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1712148910821-8fe718c418af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1712107063586-a282f12c3973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        'https://images.unsplash.com/photo-1711636418389-1ee93ebd56fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzEyNDg2NjkwfA&ixlib=rb-4.0.3&q=80&w=400',
        "https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]

    function changeBgImg(grad) {
        const boardToChange = board
        boardToChange.style.backgroundImage = grad
        updateBoard(boardToChange, true)
    }

    function onselect(name) {
        // setState(name)
        setTopHead(name)
        setBackTo('Change background')
    }

    return (
        <section className="change-back-container flex column">
            {topHead === 'Change background' &&
                <>
                    <header className="flex">
                        <div className="flex column head-img-card-container">
                            <div onClick={() => onselect('Photos from Unsplash')} className="img-card">
                                <img src="https://trello.com/assets/8f9c1323c9c16601a9a4.jpg" alt="" />
                            </div>
                            <p>Photos</p>
                        </div>
                        <div className="flex column head-img-card-container">
                            <div onClick={() => onselect('Color')} className="img-card">
                                <img src="https://trello.com/assets/97db30fe74a58b7b7a18.png" alt="" />
                            </div>
                            <p>Colors</p>
                        </div>

                    </header>
                    <hr />
                    <div className="img-card neutral">
                        {plus_icon}
                    </div>
                </>
            }
            <main className="img-container flex flex-warp ">

                {topHead === 'Color' &&
                    gradients.map((grad, idx) =>
                        <div className="img-card" key={idx} onClick={() => changeBgImg(grad)} style={{ backgroundImage: `url(${grad})` }}>
                        </div>)
                }

                {topHead === 'Photos from Unsplash' &&
                // console.log('im here')
                    imgs.map((img, idx) => <div className="img-card" key={idx} onClick={() => changeBgImg(img)} >
                       <img src={img} alt="" /> </div>
                    )
                }
            </main>
        </section>
    )
}