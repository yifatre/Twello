import { Link } from "react-router-dom"
import { useState } from "react"
import { instagram_icon, linkedin_icon } from "../cmps/UtilCmps/SVGs"

export function HomePage() {
    const [selected, setSelected] = useState('boards')

    function toggleExplain(state) {
        setSelected(state)
    }

    return (<>
        <section className="home-page-container">
            <div className="home-page-top">
                <div className="top-left-container">
                    <div>
                        <h1>Twello brings all your tasks, teammates, and tools together</h1>
                        <p>Keep everything in the same place-even if your team isn't.</p>
                    </div>
                    <Link to='/board'>
                        <button>Try - it's free</button>
                    </Link>
                </div>
                <div className="top-img-container">

                    <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1080" alt="" />
                </div>
            </div>
        </section >
        <section className="home-page-middle">

            <div className="explain-head-container">
                <p className="first-p">Twello 101</p>
                <h2>A productivity powerhouse</h2>
                <p className="second-p">Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.</p>
                <div className="explain-container">
                    <div onClick={() => toggleExplain('boards')} className={`explain-mini-first explain-card ${selected === 'boards' ? 'selected' : ''}`}>
                        <h3>Boards</h3>
                        <p>Twello boards keep tasks organized and work moving forward. in a glace, see everything from  "things to do" to "aww yeah, we did it!" </p>
                    </div>
                    <div onClick={() => toggleExplain('list')} className={`explain-mini-second explain-card ${selected === 'list' ? 'selected' : ''}`}>
                        <h3>Lists</h3>
                        <p>The different stages of task. Start as simple as To Do, Doing or Done-or build a workflow custom to your team's needs. There's no wrong way to Twello</p>
                    </div>
                    <div onClick={() => toggleExplain('cards')} className={`explain-mini-third explain-card ${selected === 'cards' ? 'selected' : ''}`}>
                        <h3>Cards</h3>
                        <p>Cards represent tasks and ideas and hold all the information to get the job don. As you make progress. move cards across lists to show their status.</p>
                    </div>
                    <div className="explain-img-container">
                        <div className={`explain-img-grid ${selected}`}>
                            <div className="explain-first explain-img "><img src="https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp" alt="" /></div>
                            <div className="explain-second explain-img"><img src="https://images.ctfassets.net/rz1oowkt5gyp/4U0VUZYX2tQmB5KVGxBabp/7321ac088fe8ec39dbe3069c47d7df99/Carousel_Image_Lists_2x.png?w=1140&fm=webp" alt="" /></div>
                            <div className="explain-third explain-img"><img src="https://images.ctfassets.net/rz1oowkt5gyp/26CA6JZeRgoOK4nuRHnIlY/060702a80cf7c3be3651d9297d196267/Carousel_Image_Cards_2x.png?w=1140&fm=webp" alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer className="footer-home">
            <div className="footer-top-container">
                <img src="https://images.ctfassets.net/rz1oowkt5gyp/6Q4l8SJeMZGSu1m6W9vAjL/1021a10f6940ce44c50d0ffaefec223e/BigSwingFooterHeroGraphic__Left.svg" alt="" />
                <div>
                    <h1>Get started with Twello today</h1>
                    <Link to='/board'>
                        <button>Try - it's free</button>
                    </Link>
                </div>

                <img src="https://images.ctfassets.net/rz1oowkt5gyp/7KsuX6srvRqJVzeAIdIzIb/da1a3319c278d251ecbd078fcffdcd23/BigSwingFooterHeroGraphic__Right.svg" alt="" />

            </div>
            <div className="footer-bottom-container">
                <div className="team-member-container flex justify-space-between">
                    <div className="img-container align-center flex justify-center">
                        <img src="/src/assets/img/twello-logo-white.png" alt="" />
                    </div>
                    <div className="team-member yifat">
                        <h3>Yifat Regensberg</h3>
                        <img src="https://ca.slack-edge.com/T06BA1MNBK8-U06DZ6H9VJ9-811abc22d41b-512" alt="" />
                        <div className="flex justify-center social-link">
                            <a href="">{linkedin_icon}</a>
                            <a href="">{instagram_icon}</a>
                        </div>

                    </div>
                    <div className="team-member moshe">
                        <h3>Moshe Benlolo</h3>
                        <img src="https://ca.slack-edge.com/T06BA1MNBK8-U06DMHLK8R5-ddfa187610f7-512" alt="" />
                        <div className="flex justify-center social-link">
                            <a href="">{linkedin_icon}</a>
                            <a href="">{instagram_icon}</a>
                        </div>
                    </div>
                    <div className="team-member roi">
                        <h3>Roi Doron</h3>
                        <img src="https://ca.slack-edge.com/T06BA1MNBK8-U06DZ6HS3S9-4a5ee76a0651-512" alt="" />
                        <div className="flex justify-center social-link">
                            <a href="">{linkedin_icon}</a>
                            <a href="">{instagram_icon}</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
    )
}

