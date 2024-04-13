import { useSelector } from "react-redux";
import { about_icon, activity_icon, archive_icon, arrow_down, info_btn, label_icon, logo_no_icon, minus_icon, share_icon, x_icon } from "../UtilCmps/SVGs";
import { useState } from "react";
import { ChangeBack } from "./ChangeBack";
import { SideBarLabels } from "./SideBarLabels";
import { Activity } from "./Activity";

export function BoardRightSideBar({ setRsbIsOpen }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [topHead, setTopHead] = useState('Menu')
    const [backTo, setBackTo] = useState('')

    function handelClick(name) {
        setBackTo(topHead)
        setTopHead(name)
    }

    function onClose() {
        setRsbIsOpen(false)
        setTopHead('Menu')
    }

    function onBack() {
        setTopHead(backTo)
        if (backTo !== 'Menu')
            setBackTo('Menu')
    }


    return (
        <section className={`board-right-sidebar`}>

            {topHead === 'Menu' && <>
                <div className="r-sidebar-header">
                    <div></div>
                    <h2>{topHead}</h2>
                    <button className="r-sidebar-btn" onClick={() => onClose()}>{x_icon}</button>
                </div>
                <hr className="header-sep" />
                <div className="r-sidebar-content">
                    < div className="r-line"><span className="svg-container">{about_icon}</span>About this board</div>

                    <div onClick={() => handelClick('Activity')} className="r-line">{activity_icon}Activity</div>
                    <div onClick={() => handelClick('Archive')} className="r-line">{archive_icon}Archived items</div>
                    <hr className="content-sep" />
                    <div onClick={() => handelClick('Change background')} className="r-line"><div className="board-p-img" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }}></div>Change background</div>
                    <div onClick={() => handelClick('Labels')} className="r-line"><span className="svg-container">{label_icon}</span>Labels</div>
                    <hr className="content-sep" />
                    <div className="r-line">{share_icon}Print, export and share</div>
                    <div className="r-line">{minus_icon}Close board</div>
                </div>
            </>
            }
            {(topHead === 'Change background' ||topHead === 'Color' ||topHead === 'Photos from Unsplash') ?
                <>
                        <div className="r-sidebar-header">
                            <button className="back-btn r-sidebar-btn" onClick={() => onBack()}>{arrow_down}</button>
                            <h2>{topHead === 'Photos from Unsplash'?`Photos from`:topHead} {topHead === 'Photos from Unsplash'?<a style={{color:'#0c66e4'}} href="https://unsplash.com/?utm_source=trello&utm_medium=referral&utm_campaign=api-credit">Unsplash</a>:''}</h2>
                            <button className="r-sidebar-btn" onClick={() => onClose()}>{x_icon}</button>
                        </div>
                    <ChangeBack setTopHead={setTopHead} topHead={topHead} board={board} setBackTo={setBackTo} />
                </>
                : <></>
            }
            {(topHead === 'Labels' || topHead === 'Create new label')&&
            <>
             <div className="r-sidebar-header">
                            <button className="back-btn r-sidebar-btn" onClick={() => onBack()}>{arrow_down}</button>
                            <h2>{topHead}</h2>
                            <button className="r-sidebar-btn" onClick={() => onClose()}>{x_icon}</button>
                        </div>
            <SideBarLabels topHead={topHead} setBackTo={setBackTo}  setTopHead={setTopHead} board={board}/>
            </>
            }
            {topHead === 'Activity'&&
            <>
             <div className="r-sidebar-header">
                            <button className="back-btn r-sidebar-btn" onClick={() => onBack()}>{arrow_down}</button>
                            <h2>{topHead}</h2>
                            <button className="r-sidebar-btn" onClick={() => onClose()}>{x_icon}</button>
                        </div>
            <Activity  board={board}/>
            </>
            }

        </section >
    )
}