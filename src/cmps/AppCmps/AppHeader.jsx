import { Link, useLocation } from 'react-router-dom'

export function AppHeader() {
    const { pathname } = useLocation();
    console.log(pathname);

    if(pathname === '/')return(
        <header className="app-header-home ">
            <section className='justify-space-between flex' >
        <Link to='/board'>
        <div className='logo'>
      
        </div>
        </Link>
        <nav>
        <Link className='a-right login-home-header' >Login</Link>
        <Link to='/board' className='a-right free-trial'>Get Twello for free</Link>
        </nav>
        </section>
        </header>
        
    )
    return (
        <header className="app-header flex">
        <div className='logo'>
        <Link to='/board'>
        Twello
        </Link>
        </div>
        <nav>
        <Link></Link>
        </nav>
        </header>
        
        )
}