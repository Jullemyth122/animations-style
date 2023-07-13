import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/all'
import SplitType from 'split-type'

gsap.registerPlugin(Flip)
const FunWords = () => {
    const gridSize = 7; // Size of the grid (7x7)
    const items = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1); // Create an array from 1 to 49
    const itemRef = useRef([])
    const h1Refs = useRef([])

    useEffect(() => {
        const state = Flip.getState('h1')

        itemRef.current.map((elem,index) => {
            if((index + 1) % (gridSize - 1) === 1 && index !== 0 && index !== gridSize * gridSize - 1) {
                elem.appendChild(h1Refs.current[index % (gridSize + 1)]) 
            }
        })
        
        Flip.from(state,{
            position:true,
            absolute:true,
            ease:'sin.inOut',
            duration:2
        })
    },[])

    return (
        <div className='funwords-component'>
            <div className="fun-grids">
                {items.map((item,index) => (
                    <div key={item} className="grid-item" 
                        ref={e => itemRef.current.push(e) }
                    >
                        
                        {/* <h1>
                            {(index % (gridSize + 1) === 0 || (index + 1) % (gridSize - 1) === 1) ? item : ''}
                        </h1> */}
                        
                        {
                        // right diagonal
                        // (index + 1) % (gridSize - 1) === 1 && index !== 0 && index !== gridSize * gridSize - 1 ?
                        // left diagonal 
                        index % (gridSize + 1) === 0 ? 
                        <h1 ref={e => index % (gridSize + 1) === 0 ? h1Refs.current.push(e) : null}>
                            <span className="word">
                                0
                            </span>
                            <span className="word">
                                1
                            </span>
                        </h1>
                        : ''}

                        {/* {(index % (gridSize + 1) === 0 || index % (gridSize - 1) === 0) && index !== 0 && index !== items.length - 1 ? item : ''} */}
                        {/* {(index % (gridSize + 1) === 0 || (index + 1) % (gridSize - 1) === 0 && (index + 1) !== gridSize && (index + 1) !== gridSize * gridSize) ? item : ''} */}

                    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FunWords