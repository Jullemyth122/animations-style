import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Flip } from 'gsap/all';
import SplitType from 'split-type'

gsap.registerPlugin(Flip)

const FlipSliders = () => {

    const diaRefs = useRef([])
    const parentContainer = useRef()

    useEffect(() => {

        let tl = gsap.timeline({})
        let tl2 = gsap.timeline({})
        let tl3 = gsap.timeline({})

        tl.fromTo(diaRefs.current,{
            scale:0,
            opacity:0
        },{
            stagger:0.235,
            scale:2,
            opacity:1,
            duration:3,
            ease:"quad.inOut"
        })
        .to(diaRefs.current,{
            stagger:0.105,
            rotate:'225deg',
            duration:3,
            ease:"power4.inOut",
            onStart:() => {
                tl2.fromTo('.textLoop .texts h4',{
                    opacity:0,
                },{
                    stagger:0.235,
                    duration:3,
                    opacity:1,
                    scale:1,
                    ease:"quad.inOut"
                })
            },
            onComplete:() => {
                tl2.to('.textLoop .texts .overlay',{
                    '--clip-overlay':'-110%',
                    stagger:0.15,
                    duration:3,
                    ease:"power4.inOut"
                })
                tl3.to('.background .pop-ups',{
                    '--clip-overlay':'-110%',
                    stagger:0.15,
                    duration:4,
                    ease:"power4.inOut"
                })
                tl3.fromTo(diaRefs.current,{
                    scale:2,
                    opacity:1
                },{
                    stagger:0.235,
                    scale:0,
                    opacity:0,
                    duration:2,
                    ease:"expo.inOut",
                    onStart:() => {
                        tl2.fromTo('.textLoop .texts h4',{
                            opacity:1,
                        },{
                            stagger:0.235,
                            duration:2,
                            opacity:0,
                            scale:0,
                            ease:"expo.inOut"
                        })
                    },
                    onComplete:() => {
                        gsap.to('.mainBg img',{
                            stagger:0.215,
                            duration:1.5,
                            ease:'power4.inOut',
                            "--circle-open":"100%"
                        })
                    }
                })
            }
        })
        
    }, [])

    return (
        <div className='sliders-component' ref={parentContainer}>
            <div className="background">
                <div className="pop-ups s1"></div>
                <div className="pop-ups s2"></div>
                <div className="pop-ups s3"></div>
                <div className="pop-ups s4"></div>
                <div className="pop-ups s5"></div>
                <div className="pop-ups s6"></div>
                <div className="pop-ups s7"></div>
                <div className="pop-ups s8"></div>
                <div className="pop-ups s9"></div>
                <div className="pop-ups s10"></div>
            </div>
            <div className="diamonds">
                <div className="diamond" ref={e => diaRefs.current.push(e)}></div>
                <div className="diamond" ref={e => diaRefs.current.push(e)}></div>
                <div className="diamond" ref={e => diaRefs.current.push(e)}></div>
                <div className="diamond" ref={e => diaRefs.current.push(e)}></div>
            </div>
            <div className="textLoop">
                <div className="texts"> 
                    <h4 className='shift'>
                        Ai Hoshino 
                    </h4>
                    <h4 className='overlay'>
                        Ai Hoshino 
                    </h4>
                    <h4 className='overlay red-1'>
                        Ai Hoshino 
                    </h4>
                    <h4 className='overlay red-2'>
                        Ai Hoshino 
                    </h4>
                    <h4 className='overlay red-3'>
                        Ai Hoshino 
                    </h4>
                    <h4 className='overlay red-4'>
                        Ai Hoshino 
                    </h4>
                </div>
            </div>
            <div className="mainBg">
                <img className='s1' src="./hololive/hoshino.jpg" alt="" />
                <img className='s2' src="./hololive/hoshino.jpg" alt="" />
                <img className='s3' src="./hololive/hoshino.jpg" alt="" />
                <img className='s4' src="./hololive/hoshino.jpg" alt="" />
                <img className='s5' src="./hololive/hoshino.jpg" alt="" />
            </div>
        </div>
    )
}

export default FlipSliders
