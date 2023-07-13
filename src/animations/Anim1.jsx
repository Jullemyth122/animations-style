import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
const Anim1 = () => {

    const wrapperRef = useRef([])
    const ctx = useRef(gsap.context(() => {}))
    useEffect(() => {
        ctx.current.add(() => {
            const tl = gsap.timeline({defaults:{ duration: 3, ease:'sin.inOut' }})
            tl.fromTo(wrapperRef.current[0],{
                transform:'translateY(-75%) rotateZ(-10deg)',
                scale:3,     
            },{
                transform:'translateY(0%) rotateZ(0deg)',                
                "--clip-wrapper":"0%",
                scale:1,
            })
            .fromTo(wrapperRef.current[1],{
                transform:'translateY(75%)  rotateZ(10deg)',
                scale:3,     
            },{
                transform:'translateY(0%) rotateZ(0deg)',               
                "--clip-wrapper":"100%",
                scale:1,
            },0)
            .fromTo(wrapperRef.current[2],{
                // "--clip-wrapper":"50%",
                transform:'translateY(-100%)  rotateZ(-10deg)',
                scale:3,     
            },{
                transform:'translateY(0%) rotateZ(0deg)',               
                "--clip-wrapper":"0%",
                scale:1,
            },0)
        })
        return () => {
            // ctx.current.revert()
        }
    },[])

    return (
        <div className='anim1-comp'>
            <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                <defs>
                    <clipPath id="ponyClips" clipPathUnits="objectBoundingBox">
                        <path d="M0 1, V0, H0.63, L0.28 1" fill="#D9D9D9"/>
                    </clipPath>
                </defs>
            </svg>
            <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                <defs>
                    <clipPath id='slide2' clipPathUnits="objectBoundingBox">
                        <path d="M1 0.5, V0, H0.68, L0.5 0.5" fill="#D9D9D9"/>
                    </clipPath>
                </defs>                
            </svg>
            <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                <defs>
                    <clipPath id='slide3' clipPathUnits="objectBoundingBox">
                        <path d="M1 1, V0.55, H0.487, L0.33 1" fill="#D9D9D9"/>
                    </clipPath>
                </defs>
            </svg>
            <div className="test">
                <div className="wrapper" ref={ e => wrapperRef.current.push(e)}>
                    <img src='./hololive/shelter2.jpg' /> 
                </div>
            </div>
            <div className="redBlack">
                <div className="wrapper" ref={ e => wrapperRef.current.push(e)}>
                    <img class='test2' src='./hololive/shelter.jpg' />          
                </div>
            </div>         
            <div className="downblack">
                <div className="wrapper" 
                    ref={ e => wrapperRef.current.push(e)}
                >
                    <img class='test2' src='./hololive/shelter.png' />          
                </div>
            </div>         
        </div>
    )
}

export default Anim1