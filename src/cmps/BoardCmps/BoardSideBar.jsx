import { useState } from "react"
import { side_arrow_icon } from "../UtilCmps/SVGs"

export function BoardSideBar() {
    const [isOpen, setIsOpen] = useState()

    return(
        !isOpen && <button className="side-bar-btn">
           
            <button className="open-sidebar-btn">{side_arrow_icon}</button>
            
        </button>
    )
}