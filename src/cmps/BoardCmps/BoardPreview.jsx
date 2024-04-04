import { Link, NavLink } from 'react-router-dom'
import { star, star_outline } from '../UtilCmps/SVGs'
import { useState } from 'react'


export function BoardPreview({ board }) {

    const [isHovered, setIsHovered] = useState(false)
    function onToggleStar() {
        //TODO: add edit function here
    }


    return (
        <Link className='board-preview' to={`/board/${board._id}`}>
            {/* <pre>{JSON.stringify(board)}</pre> */}
            <article className='' style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>
                <div className='board-preview-fade'>
                </div>
                <h3>{board.title}</h3>
                <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`${board.isStarred ? 'starred' : ''}`} onClick={onToggleStar}>{(board.isStarred && !isHovered) ? star : star_outline}</span>
            </article>
        </Link>
    )
}