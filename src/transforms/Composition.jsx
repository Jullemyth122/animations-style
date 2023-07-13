import React, { useEffect, useRef } from 'react'
import gsap, { shuffle } from 'gsap';
import { Flip } from 'gsap/all';

const Composition = () => {

    const boxRef = useRef()
    const parentContainer = useRef()
    const firstContainer = useRef()
    const secondContainer = useRef()
    let flipAnimation = null;
    
    useEffect(() => {
        gsap.registerPlugin(Flip)
        
        
        boxRef.current.addEventListener("click",() => {
            let shuffleList = gsap.utils.shuffle([parentContainer.current,firstContainer.current,secondContainer.current])
            const state = Flip.getState(boxRef.current,{props: "backgroundColor, opacity"});

            (boxRef.current.parentNode === parentContainer.current ? shuffleList[0] : shuffleList[1]).appendChild(boxRef.current)

            boxRef.current.classList.toggle('enlarge');
            
            Flip.from(state,{
                duration:1,
                scale:true,
                ease:"scale.inOut",
            });


        })

    },[])

    return (
        <div className='composition-component' ref={parentContainer}>
            <div className="box" ref={boxRef}>
                Sky Balls Lopserum Madya
            </div>

            <div className="parentBox">
                <div className="parentBox1" ref={firstContainer}>

                </div>
                <div className="parentBox2" ref={secondContainer}>

                </div>
            </div>
        </div>
    )
}

export default Composition