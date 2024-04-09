import { NavLink } from "react-router-dom";
import { pulse_icon, trello_icon, trello_templates_icon } from "../UtilCmps/SVGs";

export function AppSideBar() {
    return(
        <div className="app-sidebar">
        <section className="main-nav">
            <NavLink className='nav-line' to={`/board`} >{trello_icon}Boards</NavLink>
            <NavLink className='nav-line' to={`/`} >{trello_templates_icon}Templates</NavLink>
            <NavLink className='nav-line' to={`/`} >{pulse_icon}Home</NavLink>
        </section>
        </div>
    )
}