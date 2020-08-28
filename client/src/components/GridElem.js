import React from 'react'

export default function GridElem({ index, status, handleClick }) {

    return (
        <div className={`grid-elem ${status}`} onClick={() => handleClick(index)}></div>
    )
}