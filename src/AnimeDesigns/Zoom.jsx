import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef, useState } from 'react'
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger,Flip)

const Zoom = () => {

    const ctx = useRef(gsap.context(() => {}))
    const [animState,setAnimState] = useState(false)
    const animRef = useRef(null)
    const wrapperRef = useRef(null)
    const itemRef = useRef([])
    const wholeRef = useRef(null)

    useEffect(() => {
        ctx.current.add("scrollAnim",() => {
            const childs = wrapperRef.current.children

            const state1 = Flip.getState(itemRef.current[0])
            
            wholeRef.current.appendChild(itemRef.current[0])
            
            const state2 = Flip.getState(itemRef.current[1])
            const state3 = Flip.getState(itemRef.current[2])

            

            const Flip1 = Flip.from(state1,{
                absolute:true,
                // scale:true,
                paused:true,
                ease:'none'
            })
            const Flip2 = Flip.from(state2,{
                absolute:true,
                // scale:true,
                paused:true,
                ease:'none'
            })
            const Flip3 = Flip.from(state3,{
                absolute:true,
                // scale:true,
                paused:true,
                ease:'none'
            })

            const tl = gsap.timeline({
                scrollTrigger:{
                    // anim
                    // trigger:wrapperRef.current,
                    trigger:'.zoom-component',
                    end:`+=${100 * (childs.length - 1) * 4}`,
                    scrub:true,
                    pin:true,
                }
            })

            tl.to(state1,{
                animation:Flip1,
            })
            .to(state2,{
                animation:Flip2
            })
            .to(state3,{
                animation:Flip3
            })

        })
        return () => {
            ctx.current.revert()
        }
    },[])

    useEffect(() => {
        const lenis = new Lenis({
            direction: "vertical", // vertical, horizontal
            gestureDirection: "vertical", // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1.0, // sensibility
            smoothTouch: true, // Mobile
            touchMultiplier: 2, // sensibility on mobile
            infinite: false // Infinite scrolling
        })

        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)

        ctx.current.scrollAnim()
    },[])

    return (
        <div className='zoom-component'>
            <div className="whole-wrapper" ref={wholeRef}>

            </div>
            <div className="wrapper" ref={wrapperRef}>
                <div className="item-wrap" ref={e => itemRef.current.push(e)}>
                    <h1> WRAPPER </h1>
                    <h1> HOLDAPER </h1>
                    <h1> SNIPER </h1>
                </div>
                <div className="item-wrap" ref={e => itemRef.current.push(e)}>
                    <h1> WRAPPER </h1>
                    <h1> HOLDAPER </h1>
                    <h1> SNIPER </h1>
                </div>
                <div className="item-wrap" ref={e => itemRef.current.push(e)}>
                    <h1> WRAPPER </h1>
                    <h1> HOLDAPER </h1>
                    <h1> SNIPER </h1>
                </div>
            </div>
        </div>
    )
}

export default Zoom