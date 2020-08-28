import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import GridElem from './GridElem'

export default function Pathfinder() {
    const [status, setStatus] = useState(Array.from({length: 1350}, () => null))
    const [selector, setSelector] = useState("")
    const [start, setStart] = useState(-1)
    const [end, setEnd] = useState(-1)
    const [wall, setWall] = useState([])

    const handleClick = idx => {
        let tempStatus = [...status]
        tempStatus[idx] = selector
        if (selector === "start" && start >= 0) {
            tempStatus[start] = null
        } else if (selector === "end" && end >= 0) {
            tempStatus[end] = null
        }
        setStatus(tempStatus)
        switch(selector) {
            case "start":
                setStart(idx)
                if (idx === end) {
                    setEnd(-1)
                }
                break
            case "end":
                setEnd(idx)
                if (idx === start) {
                    setStart(-1)
                }
                break
            case "wall":
                if (idx === end) {
                    setEnd(-1)
                } else if (idx === start) {
                    setStart(-1)
                }
                if (!wall.find(elem => elem === idx)) {
                    setWall(prevState => [...prevState, idx])
                }
                break
            default:
                alert("Error: Invalid selector")
        }
    }

    const handleSelector = e => {
        setSelector(e.target.value)
    }

    let grid = []

    for (let i = 0; i < 1350; i++) {
        grid.push(<GridElem key={i} index={i} status={status[i]} selector={selector} handleClick={handleClick} />)
    }

    return (
        <div id="pathfinder">
            <Link to="/">Home</Link>
            <div className="path-display">
                <header>
                    <h1>Pathfinder</h1>
                    <div>
                        <button value="start" onClick={handleSelector}>Start</button>
                        <button value="end" onClick={handleSelector}>End</button>
                        <button value="wall" onClick={handleSelector}>Wall</button>
                    </div>
                </header>
                <div className="grid">
                    {grid}
                </div>
            </div>
        </div>
    )
}