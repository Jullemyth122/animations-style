import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

const ClassicDesign = () => {

    const ctx = useRef(gsap.context(() => {}))
    const animRef = useRef()
    const wrapperRef = useRef()
    const [state,setState] = useState(false)

    useEffect(() => {
        ctx.current.add("animation",() => {



            const tl = gsap.timeline({ repeat:-1, yoyo:true })

            tl.set('.box',{ top:'-50%'})
            wrapperRef.current.querySelectorAll(".box").forEach((elem,i) => {
                animRef.current = tl.fromTo(elem,{
                    top:'-50%'
                },{
                    top:'50%',
                    duration:1
                })
                .fromTo(elem,{
                    top:'50%',
                },{
                    top:"100%",
                    duration:1
                })
            })

            // var cleanFunction = () => {
            //     const progress = tl ? tl.progress() : 0
            //     if (progress == 1) {
            //         tl.reverse()
            //     }
            // }

            tl.then(() => {
                tl.reverse()
                // cleanFunction()
            })


        })
        return () => {
            ctx.current.revert()
        }
    },[])

    useEffect(() => {
        ctx.current.animation()
    },[]) 

    const handleClick = () => {
        setState(!state)
        if (state) {
            // animRef.current.timeScale(0.2)
            animRef.current.play()
        } else {
            animRef.current.pause()
            // animRef.current.timeScale(1)
        }
    }

    return (
        <div className='classic-comp'>
            <div className="wrapper" ref={wrapperRef}>
                <div onClick={handleClick} className="box"></div>
                <div onClick={handleClick} className="box"></div>
                <div onClick={handleClick} className="box"></div>
            </div>
        </div>
    )
}

export default ClassicDesign