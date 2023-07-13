import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import SplitType from 'split-type'

const SimpleAnimation = () => {

    const ctx = useRef(gsap.context(() => {}))
    const h1Ref = useRef()
    const [animRef,setAnimRef] = useState(false)

    // useEffect(() => {
    //     const texts = new SplitType(h1Ref.current,{ tagName:'span',types:'words, chars', charClass:'hide-char',wordClass:'word-char' })
    //     ctx.current.add("animation",() => {
    //         let tl = gsap.timeline({ onComplete: () => setAnimRef(true) })
    //         h1Ref.current.querySelectorAll(".word-char").forEach((elem,i) => {
    //             tl.fromTo(elem.querySelectorAll('.hide-char'),{
    //                 scaleX:0.1,
    //                 opacity:0,
    //                 transform:`translateX(${125 * elem.querySelectorAll('.hide-char').length }%)`,
    //             },{
    //                 transform:'translateX(0%)',
    //                 scaleX:1,
    //                 opacity:1,
    //                 stagger:0.1,
    //                 duration:2,
    //                 ease:'power2.inOut',
    //             },0)
    //         })
    //     })
    //     return () => {
    //         ctx.current.revert()
    //     }
    // },[])

    // useEffect(() => {
    //     ctx.current.animation()
    // },[])

    // useEffect(() => {
    //     if (animRef) {
    //         gsap.to('.hide-char',{
    //             opacity:0,
    //             scaleY:0,
    //             duration:2,
    //             stagger:{
    //                 each:0.1,
    //                 from:'center'
    //             },
    //             ease:"expo.inOut"
    //         })
    //     }
    // },[animRef])

    const statusMainRef = useRef()

    useEffect(() => {
        // const texts = new SplitType(statusMainRef.current.querySelectorAll('h1'),{ types:'lines',lineClass:"text-line",tagName:"span" })
        // new SplitType(statusMainRef.current.querySelectorAll('h1 .text-line'),{ types:'chars',charClass:"text-char",tagName:"span" })
        
        // ctx.current.add(() => {
        //     let tl = gsap.timeline({
        //         scrollTrigger:{
        //             trigger:'.status-main',
        //             scrub:true,
        //             pin:true,
        //             end: "+=600%",
        //         }
        //     })
        //     statusMainRef.current.querySelectorAll('h1').forEach((elem,i) => {
        //         tl.fromTo(elem.querySelector(".text-line"),{
        //             scaleY:0
        //         },{
        //             scaleY:1,
        //             duration:2
        //         })
        //         .fromTo(elem.querySelectorAll(".text-char"),{
        //             scaleX:0,
        //             opacity:0,
        //         },{
        //             stagger:0.1,
        //             duration:2,
        //             scaleX:1,
        //             opacity:1,
        //         },"-=1.75")
        //     })
        // })
    },[])

    const [text,setText] = useState("A")
    useEffect(() => {
        let lastUpdate = 0
        const anim = gsap.to(text,{
            duration:2,
            ease:"expo.inOut",
            onUpdate:(self) => {
                const currentProgress = Math.floor(anim.progress() * 25);
                if ( currentProgress == 25) {
                    setText("100%") 
                }
                else if (currentProgress > lastUpdate) {
                    lastUpdate = currentProgress;
                    // Generate a random letter and set it
                    // setText(generateRandomLetter(currentProgress) + "%") 
                    setText( Math.floor(anim.progress() * 100) + "%") 
                }
            }
        })
    },[])

    useEffect(() => {
        if (text == "100%") {
            gsap.to('.text-line',{
                width:'100px',
                duration:2,
                ease:'expo.inOut'
            })
            gsap.fromTo(".other-text",{
                width:"0%",
            },{
                width:"auto",
                duration:2,
                ease:"expo.inOut"
            })
            gsap.fromTo('.other-text h1',{
                transform:"translateX(-100%)",
            },{
                transform:"translateX(0%)",
                duration:2,
                delay:0.5,
                ease:"expo.inOut"
            })
        }
    },[text])

    return (
        <div className='simple-anim'>
            {/* <div className="wrapper">
                <h1 ref={h1Ref}>
                    WORDS B1NARY
                </h1>
            </div> */}
            <div className="status-main" ref={statusMainRef}>
                <h1>
                    {/* ORBITRON FONT */}
                    {text}
                </h1>
                <div className="text-line"></div>
                <div className="other-text">
                    <h1>
                        RBITRON
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default SimpleAnimation