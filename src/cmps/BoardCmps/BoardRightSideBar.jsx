import { useSelector } from "react-redux";
import { about_icon, activity_icon, archive_icon, info_btn, label_icon, minus_icon, share_icon, x_icon } from "../UtilCmps/SVGs";

export function BoardRightSideBar({ setRsbIsOpen }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    return (
        <section className={`board-right-sidebar`}>

            <div className="r-sidebar-header">
                <h2>Menu</h2>
                <span onClick={() => setRsbIsOpen(false)}>{x_icon}</span>
            </div>
            <hr className="header-sep" />
            <div className="r-sidebar-content">
                <div className="r-line"><span className="svg-container">{about_icon}</span>About this board</div>

                <div className="r-line">{activity_icon}Activity</div>
                <div className="r-line">{archive_icon}Archived items</div>
                <hr className="content-sep" />
                <div className="r-line"><div className="board-p-img" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }}></div>Change background</div>
                <div className="r-line"><span className="svg-container">{label_icon}</span>Labels</div>
                <hr className="content-sep" />
                <div className="r-line">{share_icon}Print, export and share</div>
                <div className="r-line">{minus_icon}Close board</div>
            </div>

        </section>
    )
}