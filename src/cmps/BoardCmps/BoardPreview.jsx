import { Link, NavLink } from 'react-router-dom'
import star from '../../assets/img/star.svg'
import star_outline from '../../assets/img/star_outline.svg'

export function BoardPreview({ board }) {

    function onToggleStar() {
        //TODO: add edit function here
    }


    return (
        <Link to={`/board/${board._id}`}>
            {/* <pre>{JSON.stringify(board)}</pre> */}
            <article className='board-preview'>
                <img src={board.style.backgroundImage} alt="" />
                <h3>{board.title}</h3>
                <button onClick={onToggleStar}><img src={board.isStarred ? star : star_outline} alt="" /></button>
            </article>
        </Link>
    )
}