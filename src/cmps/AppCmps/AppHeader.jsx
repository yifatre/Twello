import { Link, useLocation } from 'react-router-dom'
import { arrow_down, more_icon, search_icon } from '../UtilCmps/SVGs';

export function AppHeader() {
    const { pathname } = useLocation();
    console.log(pathname);

    if(pathname === '/')return(
        <header className="app-header-home ">
            <section className='justify-space-between flex' >
        <Link to='/board'>
        <div className='logo'>
        <img src="/src/assets/img/logo-home.png" alt="" />
        </div>
        </Link>
        <nav>
        <Link className='a-right login-home-header' >Log in</Link>
        <Link to='/board' className='a-right free-trial'>Get Twello for free</Link>
        </nav>
        </section>
        </header>
        
    )
    return (
        <header className="app-header flex">
            <button className='main-nav-btn arrow-down more-btn'>{more_icon}</button>
        <div className='logo'>
        <Link to='/board'>
          Twello
        </Link>
        </div>
        <button className='main-nav-btn'>Workspaces <span className='arrow-down'>{arrow_down}</span></button>
        <button className='main-nav-btn'>Recent <span className='arrow-down'>{arrow_down}</span></button>
        <button className='main-nav-btn'>Starred <span className='arrow-down'>{arrow_down}</span></button>
        <button className='main-nav-btn'>Templates <span className='arrow-down'>{arrow_down}</span></button>
        <button className='create-btn'>create</button>
        {/* <div>
        <div className='input-container'>
            <button>{search_icon}</button>
        <input className='search-input' type="text" />

        </div>
        </div> */}

        </header>
        
        )
}