
import { Calendar, DateRange } from "react-date-range";
import { x_icon } from "../../UtilCmps/SVGs";
import { useEffect, useState } from 'react';
import { utilService } from "../../../services/util.service";


export function DatePicker({ groupId, setActionType, task, saveTask }) {
    const [inputDateState, setInputDateState] = useState(false)
    const [inputDateTimeState, setInputDateTimeState] = useState(true)

    const [date, setDate] = useState(new Date())
    const [dateTime, setDateTime] = useState(new Date())
    const [time, setTime] = useState(task.date ? task.date.time : '5:46 PM')
    const [taskDate, setTaskDate] = useState(task.date ? task.date : '')
    const [dateValues, setDateValues] = useState('')

    useEffect(() => {
        loadTaskDate()
    }, [])
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    function loadTaskDate() {

        const date = {}
        if (taskDate.dueDate) {
            setDateTime(taskDate.dueDate)
            date.dueDate = utilService.getDateFormat(taskDate.dueDate)
        }
        if (taskDate.startDate) {
            setDate(taskDate.startDate)
            date.startDate = utilService.getDateFormat(taskDate.startDate)
        }
        if (taskDate.startDate && taskDate.dueDate) {
            setState(...prevState, startDate = taskDate.startDate, endDate = taskDate.dueDate)
        }
        setDateValues(date)
    }


    function handleCheckBox({ target }) {
        if (target.id === 'date') {
            setInputDateState(!inputDateState)
        }
        if (target.id === 'date-time') {
            time ? setTime('') : setTime('5:46 PM')
            setInputDateTimeState(!inputDateTimeState)
        }
    }

    function handleSelect(item) {
        if (!inputDateTimeState & !inputDateState) {
            // setDateTime(item)
            setInputDateTimeState(true)
        } if (!inputDateState & inputDateTimeState) {
            setDate(item)
            setValue(item, 'date-time')
        } if (inputDateState & !inputDateTimeState) {
            setDateTime(item)
            console.log('setDateTime:', dateTime);
            setValue(item, 'date')
            // console.log('setDateTime:', item);
        } if (inputDateTimeState & inputDateState) {
            setState([item.selection])
            setValue(item, 'range')
            // console.log('setRange:', item);
        }
    }

    function setValue(item, name) {
        let date = {}
        let dateValues = {}
        if (name === 'date') {
            date.startDate = item
            dateValues.startDate = utilService.getDateFormat(item)

        }
        if (name === 'date-time') {
            date.dueDate = item
            dateValues.dueDate = utilService.getDateFormat(item)
        }
        if (name === 'range') {
            date.startDate = item.selection.startDate
            dateValues.startDate = utilService.getDateFormat(item.selection.startDate)
            date.dueDate = item.selection.endDate
            dateValues.dueDate = utilService.getDateFormat(item.selection.endDate)
        }
        console.log(date);
        setTaskDate(date)
        setDateValues(dateValues)
    }

    function handleTimeChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setTime(value)

    }

    function onSaveDate() {
        const date = taskDate
        time ? taskDate.time = time : ''
        saveTask(saveTask({ ...task, date: taskDate }, groupId))
    }


    return (<>
        <header className="dynamic-head-container">
            <h2>Dates</h2>
            <button onClick={() => setActionType(null)} className="tasks-btn close-btn">{x_icon}</button>
        </header>
        {inputDateTimeState && inputDateState &&
            <DateRange
                className="date-piker"
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                showDateDisplay={false}
                // showPreview={false}
                ranges={state}
            // onChange= {handleSelect}
            />}
        {inputDateTimeState && !inputDateState &&
            <Calendar
                className="date-piker"
                showDateDisplay={false}
                date={date}
                onChange={handleSelect}
            />}
        {/* //date & Time */}
        {!inputDateTimeState &&
            <Calendar
                showDateDisplay={false}
                className="date-piker"
                date={dateTime}
                onChange={handleSelect}
            />}

        <section className="picker-container date-picker-container">
            <ul className="clean-list ul-labels">
                <p>Start date</p>
                <li className="flex align-center">
                    <input onChange={handleCheckBox} id="date" className="checkbox" type="checkBox" />
                    <input onChange={handleTimeChange} value={dateValues.startDate ? dateValues.startDate : ''} disabled={inputDateState ? "" : "disabled"} placeholder="M/D/YYYY" className="input-Date-picker" type="text" />
                </li>
                <p>Due date</p>
                <li className="flex align-center">
                    <input onChange={handleCheckBox} checked={inputDateTimeState} id="date-time" className="checkbox" type="checkBox" />
                    <input placeholder="M/D/YYYY" onChange={handleTimeChange} value={dateValues.dueDate ? dateValues.dueDate : ''} disabled={inputDateTimeState ? "" : "disabled"} className="input-Date-picker" type="text" />
                    <input placeholder="h:mm A" onChange={handleTimeChange} value={time} disabled={inputDateTimeState ? "" : "disabled"} className="input-Date-picker" type="text" />
                </li>
            </ul>


            <button onClick={() => onSaveDate()} className="tasks-btn labels-btn save-date-btn">Save</button>
            <button className="tasks-btn labels-btn enable-colorblind">Remove </button>
        </section>
    </>

    )

}

