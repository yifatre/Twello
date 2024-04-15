import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { uploadService } from "../../../services/upload.service"
import { boardService } from "../../../services/board/board.service.local"


export function AttachmentPicker({ group,setActionType, groupId, task, saveTask }) {
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })

    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {

    }, [])

    async function onUploadFile(ev) {
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        if (!task.attach) task.attach = []
        task.attach.push(secure_url)
         //todo add the member !!! now its 0 for development
        const activity =boardService.getActivity(`attached ${ev.target.files[0].name}to${task.title}`,0,group,task)
        saveTask({ ...task, style: { backgroundImage: secure_url } }, groupId,activity)
        setActionType(null)
    }


    return (<>
        <header className="dynamic-head-container">
            <h2>Attach</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container attach-section">
            <h2 className="attach-h2 margin-top-head">Attach a file from your computer</h2>
            {/* <p className="p-attach ">You can also drag and drop files to upload them</p> */}
            <label htmlFor="attachment" className="tasks-btn labels-btn attach-btn">Choose a file</label>
            <input className="hide" type="file" name="attachment" id="attachment" onChange={onUploadFile} />
            {/* <hr className="between-btn" />
            <h2 className="attach-h2 secondary-head-attach ">Search or paste a link</h2>
            <input
                className="input-attach"
                type="text"
                name="txt"
                placeholder="Find recent links or paste a new link"
            />
            <h2 className="attach-h2 secondary-head-attach margin-top">Display text (optional)</h2>
            <input
                type="text"
                name="txt"
                placeholder="Text to display"
            />
            <div className="recently-viewed">Recently viewed</div>
            <footer className="flex justify-end footer-attach">
                <button className='create-btn cancel-btn'>Cancel</button>
                <button className='create-btn insert-btn'>Insert</button>
            </footer> */}
        </section>
    </>
    )

}