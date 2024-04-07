import { Link, NavLink } from 'react-router-dom'
import { star, star_outline } from '../UtilCmps/SVGs'
import { useState } from 'react'
import { updateBoard } from '../../store/board/board.actions'


export function BoardPreview({ board }) {

    const [isHovered, setIsHovered] = useState(false)
    function onToggleStar(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        updateBoard({ ...board, isStarred: !board.isStarred })
    }

    return (
        <Link className='board-preview' to={`/board/${board._id}`}>
            <article className='' style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>
                <div className='board-preview-fade'>
                </div>
                <h3>{board.title}</h3>
                <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`${board.isStarred ? 'starred' : ''}`} onClick={(ev) => onToggleStar(ev)}>{(board.isStarred && !isHovered) ? star : star_outline}</span>
            </article>
        </Link>
    )
}