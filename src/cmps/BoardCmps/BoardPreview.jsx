import { Link, NavLink } from 'react-router-dom'
import { star, star_outline } from '../UtilCmps/SVGs'


export function BoardPreview({ board }) {

    function onToggleStar() {
        //TODO: add edit function here
    }


    return (
        <Link to={`/board/${board._id}`}>
            {/* <pre>{JSON.stringify(board)}</pre> */}
            <article className='board-preview' style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>
                {/* <img src={board.style.backgroundImage} alt="" /> */}
                <h3>{board.title}</h3>
                <button onClick={onToggleStar}>{board.isStarred ? star : star_outline}</button>
            </article>
        </Link>
    )
}