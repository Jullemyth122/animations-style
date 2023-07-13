import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger,Flip)
const Anim6 = () => {

    const ctx = useRef(gsap.context(() => {}))
    const animRef = useRef()
    let containerAnim = useRef()
    let containerAnim2 = useRef()

    useEffect(() => {
        ctx.current.add("horizontalBasedScroll",() => {
            let items = gsap.utils.toArray(containerAnim.current.querySelectorAll('.section-func'))
            let items2 = gsap.utils.toArray(containerAnim2.current.querySelectorAll('.section-func'))
            animRef.current = gsap.timeline({  })            
            let scrollTween = gsap.to(items, {
                xPercent: -100 * (items.length - 1),
                ease: "none", // <-- IMPORTANT!
                scrollTrigger: {
                  trigger: containerAnim.current,
                  pin: true,
                  scrub: 0.1,
                  end: "+=3000"
                }
            })
            let scrollTween2 = gsap.to(items, {
                xPercent: - 100 * (items.length - 1) + (- 100 * (items2.length - 1)) ,
                ease: "none", // <-- IMPORTANT!
                scrollTrigger: {
                  trigger: containerAnim2.current,
                  pin: true,
                  scrub: 0.1,
                  end: "+=3000"
                }
            })
        })
        return () => {
            ctx.current.revert()
        }
    },[])

    useEffect(() => {
        ctx.current.horizontalBasedScroll()
    },[])

    return (
        <div className='anim6-component'>
            <div className="container-anim" ref={containerAnim}>
                <div className="section-func text">
                    <h1> COLOR 1 </h1>
                </div>
                <div className="section-func anim">
                    <h1> COLOR 1 </h1>
                </div>
                <div className="section-func box">
                    <h1> COLOR 1 </h1>
                </div>
            </div>
            <div className="next">
                <h1> BITCH </h1>
            </div>
            <div className="container-anim2" ref={containerAnim2}>
                <div className="section-func text">
                    <h1> COLOR 1 </h1>
                </div>
                <div className="section-func anim">
                    <h1> COLOR 1 </h1>
                </div>
                <div className="section-func box">
                    <h1> COLOR 1 </h1>
                </div>
            </div>
        </div>
    )
}

export default Anim6