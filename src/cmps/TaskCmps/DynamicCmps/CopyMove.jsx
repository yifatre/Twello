export const CARD = 'CARD'
export const GROUP = 'GROUP'
export const COPY = 'Copy'
export const MOVE = 'Move'

export function CopyMove({ entity, copyOrMove, }) {
    return <>
        <header className="dynamic-head-container">
            <h2>{copyOrMove} {entity === GROUP ? 'list' : 'task'}</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        <section className="picker-container copy-move">
            <h2 className="attach-h2 margin-top-head">Title</h2>
            
            <label htmlFor="title" className=""><h2 className="attach-h2 margin-top-head">Title</h2></label>
            <textarea name="title" id="title" cols="30" rows="10"></textarea>
            {/* <hr className="between-btn" />
        <h2 className="attach-h2 secondary-head-attach ">Search or paste a link</h2>
        <input
            className="input-attach"
            type="text"
            name="txt"
            placeholder="Find recent links or paste a new link"
        />
        <h2 className="attach-h2 secondary-head-attach margin-top">Display text (optional)</h2>
        <input
            type="text"
            name="txt"
            placeholder="Text to display"
        />
        <div className="recently-viewed">Recently viewed</div>
        <footer className="flex justify-end footer-attach">
            <button className='create-btn cancel-btn'>Cancel</button>
            <button className='create-btn insert-btn'>Insert</button>
        </footer> */}
        </section>
    </>
}