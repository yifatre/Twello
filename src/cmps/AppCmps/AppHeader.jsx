import { Link } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
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