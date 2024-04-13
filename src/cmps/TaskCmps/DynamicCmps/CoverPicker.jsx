import { useEffect, useRef, useState } from "react"
import { cover_preview, x_icon } from "../../UtilCmps/SVGs"

import axios from "axios"
import { utilService } from "../../../services/util.service"
import { boardService } from "../../../services/board/board.service.local"
import { uploadService } from "../../../services/upload.service"



export function CoverPicker({ setActionType, board, groupId, task, saveTask }) {
    const [coverToEdit, setCoverToEdit] = useState(task.style)
    const attach = useRef(null)
    const [search, setSearch] = useState('')
    const [images, setImages] = useState()


    useEffect(() => {
        getPhotos()
    }, [])

    useEffect(() => {
        const activity = boardService.getActivity('changed the background of this task', 0)
        if (attach.current) {
            if (!task.attach) task.attach = []
            task.attach.push(imgUrl)
            saveTask({ ...task, style: coverToEdit, attach: task.attach }, groupId)
        }
        else {
            saveTask({ ...task, style: coverToEdit }, groupId)
        }
    }, [coverToEdit])

    const API_KEY = 'NS7cNlul1WLl2FqtjtKmtATTQSgqEdXUWKXkgIwfDP8'
    const url = `https://api.unsplash.com/photos/random?query=${search ? search : 'aurora'}&count=6&per_page=30&client_id=${API_KEY}`

    async function onUploadFile(ev) {
        const { secure_url } = await uploadService.uploadImg(ev)
        attach.current = true
        changeCoverImg(secure_url)
    }

    async function getPhotos() {
        try {
            const res = await axios.get(url)
            setImages(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    function changeCoverImg(imgUrl) {
        setCoverToEdit({ ...coverToEdit, backgroundImage: imgUrl })
    }

    function handleChange(ev) {
        let { value } = ev.target
        setSearch(value)
        getPhotos()
    }

    const debounceOnChange = utilService.debounce(handleChange, 300)

    function colorChange(backgroundColor) {
        setCoverToEdit({ ...coverToEdit, backgroundColor })
    }

    function onRemoveCover() {
        setCoverToEdit({ backgroundImage: '', backgroundColor: '' })
    }

    const pallet = ['green-subtle', 'yellow-subtle', 'orange-subtle', 'red-subtle', 'purple-subtle',
        'blue-subtle', 'teal-subtle', 'lime-subtle', 'magenta-subtle', 'gray-subtle']


    return <>
        <header className="dynamic-head-container">
            <h2>Cover</h2>
            <button className="tasks-btn close-btn" onClick={() => setActionType(null)}>{x_icon}</button>
        </header>
        <div className="flex align-center justify-center">
            <div className={`cover-preview flex align-center justify-center ${coverToEdit.backgroundColor}`}>
                <span>
                    <svg id="Layer_1" data-name="Layer 1" version="1.1" viewBox="0 0 136 64" >
                        <defs>
                            <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
                                <image href={coverToEdit.backgroundImage} width={136} style={{ objectFit: 'cover' }} />
                            </pattern>
                        </defs>
                        <path d="M2,0h132c1.1,0,2,.9,2,2v26H0V2C0,.9.9,0,2,0Z" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                        <rect x="7" y="32" width="122" height="4" rx="1" ry="1" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                        <rect x="7" y="40" width="98" height="4" rx="1" ry="1" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                        <rect x="7" y="53" width="16" height="6" rx="1" ry="1" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                        <rect x="27" y="53" width="16" height="6" rx="1" ry="1" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                        <circle cx="127" cy="55" r="5" fill={coverToEdit.backgroundImage ? `url(#img1)` : 'currentColor'} />
                    </svg>
                </span>
            </div>
        </div>
        <section className="picker-container cover-picker-container">
            <button onClick={onUploadFile} className="tasks-btn labels-btn ">Upload image</button>
            <button onClick={onRemoveCover} disabled={!coverToEdit.backgroundColor && !coverToEdit.backgroundImage} className="tasks-btn labels-btn ">Remove cover</button>
            <p>Change cover color</p>
            <div className="color-pallet">
                {pallet.map((color, index) => {
                    return <div key={color} className={`color-container ${coverToEdit.backgroundColor === color ? 'outsideLine' : ''}`}>
                        <div onClick={() => colorChange(color)} className={`color ${color} ${coverToEdit.backgroundColor === color ? 'outsideLine-white' : ''}`}></div>
                    </div>
                })}
            </div>
            <div className="img-container flex column">
                <input
                    type="text"
                    name="search"
                    placeholder="Search photos"

                    onChange={debounceOnChange}
                />

                {images && <div className="images">
                    {images.map((img, idx) =>
                        <div className="img-card" key={idx} onClick={() => changeCoverImg(img.urls.full)} style={{ backgroundImage: `url(${img.urls.regular})` }}>
                        </div>
                    )}
                </div>
                }
                <footer className="unsplash-disclaimer">
                    By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms" target="_blank">Terms of Service</a>
                </footer>


            </div>
        </section >

    </>
}
