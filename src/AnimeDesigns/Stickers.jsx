import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef, useState } from 'react'
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger,Flip)
const Stickers = () => {

    const ctx = useRef(gsap.context(() => {}))
    const [animState,setAnimState] = useState(false)
    const animRef = useRef(null)
    const sectionRef = useRef([])

    useEffect(() => {
        ctx.current.add("scrollAnim",() => {
            // gsap.to()... infinity and beyond!
            // For more check out greensock.com
            let rows = gsap.utils.toArray(sectionRef.current);
            rows.forEach((row, i) => {
                ScrollTrigger.create({
                    trigger: row,
                    start: () =>
                    row.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
                    end: "+=" + window.innerHeight * (rows.length - 1 - i),
                    pin: true,
                    pinType: "transform",
                    pinSpacing: false
                });
            });
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
        <div className='stickers-comp'>
            <div className="section-items">
                <section ref={e => sectionRef.current.push(e) } id="section1">
                    <h1>Section 1</h1>
                </section>
                <section ref={e => sectionRef.current.push(e) } id="section2">
                    <h1>Section 2</h1>
                </section>
                <section ref={e => sectionRef.current.push(e) } id="section3">
                    <h1>Section 3</h1>
                </section>
            </div>
        </div>
    )
}

export default Stickers