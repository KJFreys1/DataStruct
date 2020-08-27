import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GridElem from './GridElem'

export default function Pathfinder() {
    const [grid, setGrid] = useState([])

    useEffect(() => {
        for (let i = 0; i < 1350; i++) {
            setGrid(prevState => [...prevState, <GridElem key={i} />])
        }
    }, [])

    return (
        <div id="pathfinder">
            <Link to="/">Home</Link>
            <div className="path-display">
                <header>
                    <h1>Pathfinder</h1>
                </header>
                <div className="grid">
                    {grid}
                </div>
            </div>
        </div>
    )
}