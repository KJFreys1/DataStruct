import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div id="dashboard">
            <Link to="/pathfinder">Pathfinder</Link>
        </div>
    )
}