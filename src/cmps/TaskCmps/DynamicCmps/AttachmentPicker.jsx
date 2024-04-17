import { useEffect, useState } from "react"
import { x_icon } from "../../UtilCmps/SVGs"
import { uploadService } from "../../../services/upload.service"
import { boardService } from "../../../services/board/board.service"


export function AttachmentPicker({ group, setActionType, groupId, task, saveTask }) {
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
        setIsUploading(false)
        if (!task.attach) task.attach = []
        task.attach.push(secure_url)
        const activity =boardService.getActivity(`attached ${ev.target.files[0].name} to ${task.title}`,0,group,task)
        
        if(secure_url.includes('image')){
            if(!task.style.backgroundImage){
                saveTask({ ...task, style: { ...task.style, backgroundImage: secure_url } }, groupId, activity)
            }
            
        }
        setActionType(null)
    }


    return (<>
        <header className="dynamic-head-container">
            <h2>Attach</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container attach-section">
            <h2 className="attach-h2 margin-top-head">Attach a file from your computer</h2>
            <label htmlFor="attachment" className="tasks-btn labels-btn attach-btn">Choose a file</label>
            <input className="hide" type="file" name="attachment" id="attachment" onChange={onUploadFile} />
          
        </section>
    </>
    )

}