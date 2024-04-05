import { useState } from "react";
import { arrow_down, edit_icon, x_icon } from "../../UtilCmps/SVGs";

const pallet = ['#baf3db', '#f8e6a0', '#fedec8', '#ffd5d2', '#dfd8fd',
    '#4bce97', '#f5cd47', '#fea362', '#f87168', '#9f8fef',
    '#1f845a', '#946f00', '#c25100', '#c9372c', '#6e5dc6',
    '#cce0ff', '#c6edfb', '#d3f1a7', '#fdd0ec', '#dcdfe4',
    '#579dff', '#6cc3e0', '#94c748', '#e774bb', '#8590a2',
    '#0c66e4', '#227d9b', '#5b7f24', '#ae4787', '#626f86']

// todo connect btn's and add the on update 

export function LabelPicker({ info, onUpdate }) {
    const [toggle, setToggle] = useState(false)
    const [currentColor, setCurrentColor] = useState('#4bce97')
    const [labelContent, setLabelContent] = useState('')


    function toggleBtn() {
        setToggle(!toggle)
    }

    function colorChange(color) {
        setCurrentColor(color)
    }
    
    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setLabelContent(value)
        
    }

    function removeColor(){
        setCurrentColor('hsla(218, 54%, 19.6%, 0.16)')
    }


    {
        if (!toggle) return <>
            <header className="dynamic-head-container">
                <h2>Label</h2>
                <button className="tasks-btn close-btn">{x_icon}</button>
            </header>
            <section className="picker-container">
                <input
                    type="text"
                    name="txt"
                    placeholder="Search labels..."
                />
                <p>Labels</p>
                <ul className="clean-list ul-labels">
                    {/* // todo when info connect make a map for the labels and dont forget to do the color change */}
                    <li className="flex align-center">
                        <input className="checkbox" type="checkBox" id="checkbox1" />
                        <label htmlFor="checkbox1"> <div style={{ backgroundColor: 'rgb(245, 205, 71)' }} className="label-picker"> Design Team</div></label>
                        <button className="edit-label">{edit_icon}</button>
                    </li>
                </ul>

                <button onClick={() => toggleBtn()} className="tasks-btn labels-btn">Create a new label</button>
                <hr className="between-btn" />
                <button className="tasks-btn labels-btn">Enable colorblind friendly mode </button>
            </section>
        </>

    } return (
        <>
            <header className="dynamic-head-container">
                <button onClick={() => toggleBtn()} className="tasks-btn back-btn">{arrow_down}</button>
                <h2>Create label</h2>
                <button className="tasks-btn close-btn">{x_icon}</button>
            </header>
            <div className="label-preview-container">
                <span style={{ backgroundColor: currentColor }} className="label-preview">{labelContent}</span>
            </div>
            <section className="picker-container">
                <p>Title</p>
                <input
                    type="text"
                    name="txt"

                    onChange={handleChange}
                />
                <p>Select a color</p>
                <div className="color-pallet">
                    {pallet.map(color => {
                        console.log(color);
                        return <div className="color-container">
                            <div onClick={() => colorChange(color)} style={{ backgroundColor: color }} className="color"></div>
                        </div>
                    })}
                </div>


                <button onClick={()=>removeColor()} className="tasks-btn labels-btn">{x_icon}Remove color</button>
                <hr className="between-btn" />
                <button className='create-btn'>create</button>
            </section>
        </>

    )



}


