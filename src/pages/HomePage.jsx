import { Link } from "react-router-dom";
import { bcg_wave } from "../cmps/UtilCmps/SVGs";
import { ATTACHMENT, DATES, DynamicCmp, LABELS, MEMBERS } from "../cmps/TaskCmps/DynamicCmps/DynamicCmp";
import { boardsDemoData, userDemoData } from "../services/demo-data";

export function HomePage() {

    return (<>
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
        {/* <section className="home-page-middle">
            <DynamicCmp cmp={ATTACHMENT} />
            <div className="home-page-top">
                <div className="explain-head-container">
                    <p>Twello 101</p>
                    <h2>A productivity powerhouse</h2>
                    <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.</p>
                </div>
            </div>
        </section> */}
    </>
    )
}