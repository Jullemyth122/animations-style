import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(Flip,ScrollTrigger)
const Swapping = () => {

    const ctx = useRef(gsap.context(() => {}))

    useEffect(() => {
        ctx.current.add(() => {
            const tl = gsap.timeline({
                scrollTrigger:'.wrapper',
                scrub:true,
                end:"+=300%",
                
            })
        })
    },[])

    return (
        <div className='swapping-comp'>
            <div className="wrapper">
                <div className="list-of-screen">
                    <div className="slide-screen"></div>
                    <div className="slide-screen"></div>
                    <div className="slide-screen"></div>
                </div>
                <div className="screen"></div>
            </div>
        </div>
    )
}

export default Swapping