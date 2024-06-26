import { useEffect, useRef, useState } from "react"

import { plus_icon } from "../UtilCmps/SVGs"
// import gradIce from "../../assets/img/gradients/ice.svg"
// import gradWave from "../../assets/img/gradients/wave.svg"
// import gradMagic from "../../assets/img/gradients/magic.svg"
// import gradRainbow from "../../assets/img/gradients/rainbow.svg"
// import gradPeach from "../../assets/img/gradients/peach.svg"
// import gradAline from "../../assets/img/gradients/alien.svg"
// import gradEarth from "../../assets/img/gradients/earth.svg"
// import gradFlower from "../../assets/img/gradients/flower.svg"
// import gradLava from "../../assets/img/gradients/lava.svg"
import { updateBoardOptimistic } from "../../store/board/board.actions"
import axios from "axios"
import { utilService } from "../../services/util.service"
import { uploadService } from "../../services/upload.service"
import { boardService, gradients } from "../../services/board/board.service"

export function ChangeBack({ setTopHead, board, setBackTo, topHead }) {
    const [search, setSearch] = useState('aurora')
    const [searchToEdit, setSearchToEdit] = useState('aurora')
    // const gradients = [gradIce, gradWave, gradMagic, gradRainbow, gradPeach, gradFlower, gradEarth, gradAline, gradLava]
    const [images, setImages] = useState()
    const [boardImgs, setBoardImgs] = useState(board.style.images)
    const onSetSearch = useRef(utilService.debounce(txt => setSearch(txt)))

    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })


    useEffect(() => {
        onSetSearch.current(searchToEdit)
    }, [searchToEdit])

    useEffect(() => {
        getPhotos(search)
    }, [search])

    const [isUploading, setIsUploading] = useState(false)

    const API_KEY = 'NS7cNlul1WLl2FqtjtKmtATTQSgqEdXUWKXkgIwfDP8'
    const url = `https://api.unsplash.com/photos/random?query=${search}&count=30&per_page=30&client_id=${API_KEY}`

    async function onUploadFile(ev) {
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        changeBgImg(secure_url, true)
    }

    async function getPhotos() {
        try {
            const res = await axios.get(url)
            setImages(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    function changeBgImg(grad, isUpload) {
        const activity = boardService.getActivity('change background of this board', 0)
        const boardToChange = { ...board, style: { ...board.style, backgroundImage: grad } }
        // boardToChange.style.backgroundImage = grad
        boardToChange.activities.unshift(activity)

        if (isUpload) {
            boardToChange.style.images.push(grad)
        }
        updateBoardOptimistic(boardToChange, true)
    }

    function onselect(name) {
        if (name === 'Photos from Unsplash') {
            getPhotos()
        }
        setTopHead(name)
        setBackTo('Change background')
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setSearchToEdit(value)
    }

    // const debounceOnChange = utilService.debounce(handleChange, 300)

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
                    <div className="flex column img-container">
                        {/* <div onClick={onUploadFile} className="img-card neutral"> */}
                        <div className="images flex flex-warp">

                            <label htmlFor="attachment" className="img-card neutral">{plus_icon}</label>
                            <input className="hide" type="file" name="attachment" id="attachment" onChange={onUploadFile} />

                            {boardImgs &&
                                boardImgs.map((img, idx) =>
                                    <div className="img-card" key={idx} onClick={() => changeBgImg(img)} >
                                        <img src={img} alt="" />
                                    </div>
                                )

                            }
                        </div>
                        {/* 
                        {boardImgs && boardImgs.map((img, idx) =>
                            <div className="img-card" key={idx} onClick={() => changeBgImg(img)} style={{ backgroundImage: `url(${img})` }}>
                            </div>)} */}
                        {/* </div> */}
                    </div>
                </>
            }
            <main className="img-container flex column">

                {topHead === 'Color' && <div className="images flex flex-warp">
                    {gradients.map((grad, idx) =>
                        <div className="img-card" key={idx} onClick={() => changeBgImg(grad)} style={{ backgroundImage: `url(${grad})` }}>
                        </div>)}
                </div>
                }

                {topHead === 'Photos from Unsplash' &&
                    <>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search photos"

                            onChange={handleChange}
                        />

                        {images && <div className="images flex flex-warp">
                            {images.map((img, idx) =>
                                <div className="img-card" key={idx} onClick={() => changeBgImg(img.urls.full)} >
                                    <img src={img.urls.regular} alt="" />
                                </div>
                            )}
                        </div>
                        }
                        <footer className="unsplash-disclaimer">
                            By using images from Unsplash, you agree to their <a style={{ color: '#0c66e4' }} href="https://unsplash.com/license">license</a> and <a style={{ color: '#0c66e4' }} href="https://unsplash.com/terms">Therms of Service</a>
                        </footer>
                    </>
                }
            </main>
        </section>
    )
}