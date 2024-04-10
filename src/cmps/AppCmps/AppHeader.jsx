import { Link, useLocation } from 'react-router-dom'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

import { arrow_down, bell_icon, info_btn, logo, more_icon, search_icon } from '../UtilCmps/SVGs'
import { CREATE_BOARD, DynamicCmp } from '../TaskCmps/DynamicCmps/DynamicCmp'
import { useState } from 'react'
import { utilService } from '../../services/util.service'

export function AppHeader() {
    const { pathname } = useLocation()
    const [isAddBoard, setIsAddBoard] = useState(false)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

    function onAddBoard(ev) {
        const { currentTarget } = ev
        setModalPosition(utilService.getModalPosition(currentTarget, 0, currentTarget.getBoundingClientRect().height + 8))
        setIsAddBoard(true)
    }

    function onCloseAddModal() {
        setIsAddBoard(false)
    }


    if (pathname === '/') return (
        <header className="app-header-home ">
            <section className='justify-space-between flex' >
                <Link to='/board'>
                    <div className='logo'>
                        <img src="/src/assets/img/logo-home.png" alt="" />
                        <h2>Twello</h2>
                    </div>
                </Link>
                <nav>
                    <Link className='a-right login-home-header' >Log in</Link>
                    <Link to='/board' className='a-right free-trial'>Get Twello for free</Link>
                </nav>
            </section>
        </header>

    )
    return (<>
        <header className="app-header flex justify-space-between">
            <div className='flex'>

                <button className='main-nav-btn arrow-down more-btn'>{more_icon}</button>
                <div className='logo-inside-head flex align-center justify-center'>
                    <Link to='/board'>
                        <h3 className='flex'><span className='logo-svg'>{logo}</span></h3>
                    </Link>
                </div>
                <button className='main-nav-btn'>Workspaces <span className='arrow-down'>{arrow_down}</span></button>
                <button className='main-nav-btn'>Recent <span className='arrow-down'>{arrow_down}</span></button>
                <button className='main-nav-btn'>Starred <span className='arrow-down'>{arrow_down}</span></button>
                <button className='main-nav-btn'>Templates <span className='arrow-down'>{arrow_down}</span></button>
                <button className='create-btn' onClick={onAddBoard}>Create</button>
            </div>
            <div className='flex'>

                <div className='flex justify-center input-container'>
                    <span className='svg-search'>{search_icon}</span>
                    <input placeholder='Search' className='search-input' type="text" />
                </div>
                <div className='flex btn-right-head-container'>

                    <button className='alarm-btn top-header-btn'>{bell_icon}</button>
                    <button className='info-btn top-header-btn'>{info_btn}</button>
                    <button className='user-btn top-header-btn'>user</button>
                </div>
            </div>

        </header>
        {isAddBoard && <ClickAwayListener onClickAway={onCloseAddModal}>
            <div style={{zIndex:110}}>
                <DynamicCmp cmp={CREATE_BOARD} setIsAddBoard={setIsAddBoard} position={modalPosition} />
            </div>
        </ClickAwayListener>
        }
    </>
    )
}