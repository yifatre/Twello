import { useSelector } from "react-redux";
import { about_icon, activity_icon, archive_icon, arrow_down, info_btn, label_icon, minus_icon, share_icon, x_icon } from "../UtilCmps/SVGs";
import { useState } from "react";
import { ChangeBack } from "./ChangeBack";

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
                    <span onClick={() => onClose()}>{x_icon}</span>
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
            {(topHead === 'Change background' || 'Color' || 'Photos from Unsplash') ?
                <>
                    {topHead !== 'Menu' &&
                        <div className="r-sidebar-header">
                            <span className="back-btn" onClick={() => onBack()}>{arrow_down}</span>
                            <h2>{topHead}</h2>
                            <span onClick={() => onClose()}>{x_icon}</span>
                        </div>}
                    <ChangeBack setTopHead={setTopHead} topHead={topHead} board={board} setBackTo={setBackTo} />
                </>
                : <></>
            }

        </section >
    )
}