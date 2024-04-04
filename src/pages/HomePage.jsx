import { Link } from "react-router-dom";
import { bcg_wave } from "../cmps/UtilCmps/SVGs";

export function HomePage() {

    return (
        <section className="home-page-container">
            <div className="home-page-top">
                <div className="top-left-container">
                    <div>
                        <h1>Trello brings all your tasks, teammates, and tools together</h1>
                        <p>Keep everything in the same place-even if your team isn't.</p>
                    </div>
                    <Link to='/board'>
                        <button>start demo</button>
                    </Link>
                </div>
                <div className="top-img-container">

                    <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1080" alt="" />
                </div>
            </div>
        </section >
    )
}