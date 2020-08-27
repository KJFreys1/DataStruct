import React from 'react'
import { Link } from 'react-router-dom'

export default function Pathfinder() {
    let grid = []

    const makeGridElem = idx => {
        return (
            <div className="grid-elem" key={idx}></div>
        )
    }

    for (let i = 0; i < 1350; i++) {
        grid.push(makeGridElem(i))
    }

    console.log(grid)
    return (
        <div id="pathfinder">
            <Link to="/">Home</Link>
            <div className="path-display">
                <div className="grid">
                    {grid}
                </div>
            </div>
        </div>
    )
}