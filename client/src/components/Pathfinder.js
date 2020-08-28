import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import GridElem from './GridElem'

class Queue {
    constructor() {
        this.data = []
        this.first = null
    }

    peek = () => {
        console.log(this.first)
    }

    add = value => {
        this.data.push(value)
        this.first = this.data[0]
    }

    get = () => {
        this.first = this.data[1]
        return this.data.shift()
    }
}

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

    const runPath = (queue, path=Array.from({length: 1350}, () => null), pointer=start) => {
        if (pointer === end) {
            alert("Found")
            return
        }
        // Check up
        if (pointer - 45 > 0 && !path[pointer-45]) {
            queue.add(pointer - 45)
            path[pointer-45] = true
        }
        // Check right
        if ((pointer + 1) % 45 !== 0 && !path[pointer+1]) {
            queue.add(pointer + 1)
            path[pointer+1] = true
        }
        // Check down
        if (pointer + 45 < 1350 && !path[pointer+45]) {
            queue.add(pointer + 45)
            path[pointer+45] = true
        }
        // Check left
        if (pointer % 45 !== 0 && !path[pointer-1]) {
            queue.add(pointer - 1)
            path[pointer-1] = true
        }

        pointer = queue.get()
        console.log(pointer)
        setTimeout(() => {
            runPath(queue, path, pointer)
        }, 50)
    }


    const findPath = () => {
        if (start < 0 || end < 0) {
            alert("Error: Must set a start and end point.")
            return
        }
        let queue = new Queue()
        // let pointer = start
        console.log(start)
        runPath(queue)
        // while (pointer !== end) {
        //     // Check left
        //     if (pointer % 45 !== 0 && !path.find(i => i === pointer - 1)) {
        //         queue.add(pointer - 1)
        //         path.push(pointer-1)
        //     }
        //     // Check right
        //     if ((pointer + 1) % 45 !== 0 && !path.find(i => i === pointer - 1)) {
        //         queue.add(pointer + 1)
        //         path.push(pointer+1)
        //     }
        //     // Check up
        //     if (pointer - 45 > 0 && !path.find(i => i === pointer - 1)) {
        //         queue.add(pointer - 45)
        //         path.push(pointer-45)
        //     }
        //     // Check down
        //     if (pointer + 45 < 1350 && !path.find(i => i === pointer - 1)) {
        //         queue.add(pointer + 45)
        //         path.push(pointer+45)
        //     }

        //     pointer = queue.get()
        //     console.log(path)
        //     console.log(pointer)
        // }
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
                        <button onClick={findPath}>RUN PATH</button>
                    </div>
                </header>
                <div className="grid">
                    {grid}
                </div>
            </div>
        </div>
    )
}