import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GridElem from './GridElem'

export default function Pathfinder() {
    const [grid, setGrid] = useState([])
    const [status, setStatus] = useState(Array.from({length: 1350}, () => null))
    const [selector, setSelector] = useState("")

    useEffect(() => {
        setGrid([])
        for (let i = 0; i < 1350; i++) {
            setGrid(prevState => [...prevState, <GridElem key={i} index={i} status={status[i]} selector={selector} handleClick={handleClick} />])
        }
    }, [status, selector])

    const handleClick = idx => {
        let tempStatus = [...status]
        tempStatus[idx] = selector
        setStatus(tempStatus)
    }

    const handleSelector = e => {
        setSelector(e.target.value)
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