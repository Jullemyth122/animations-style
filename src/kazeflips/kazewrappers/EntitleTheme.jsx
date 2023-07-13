import { gsap } from 'gsap'
import { Flip } from 'gsap/all'
import React, { useEffect, useRef, useState } from 'react'

const iconsEntitle = [
    {
        svg: '/icons/icon2/SHRINE.svg',
        text: '神社',
        us: 'SHRINE'
    },
    {
        svg: '/icons/icon2/LANTERN.svg',
        text:'灯籠流し',
        us:'LANTERN'
    },
    {
        svg: '/icons/icon2/NIGHTCITY.svg',
        text: '夜の街',
        us: 'NIGHT CITY'
    },
    {
        svg: '/icons/icon2/HOTSPRING.svg',
        text: '温泉',
        us: 'HOT SPRING',
    },
    {
        svg: '/icons/icon2/HORIZON.svg',
        text: '地平線',
        us: 'HORIZON'
    },
]

const slidesFunction = (elem,bool) => {
    gsap.to(elem,{
        opacity: 0,
        translateX: bool ? '100%' : '-100%',
        delay: 0.3,
        duration:1.5,
        ease:"power2.inOut"
    })
}

const EntitleTheme = ({ iconRefs,setAnimating }) => {

    let tl = gsap.timeline({paused:true, onStart:() => setAnimating(true)}) 
    let tl2 = gsap.timeline() 
    
    const [removeOpener,setRemoveOpener] = useState(false)
    const entRef = useRef(null)


    const closerOpening = () => {
        setRemoveOpener(true)
    }

    useEffect(() => {
        gsap.registerPlugin(Flip)
        const themeSlides = document.querySelectorAll('.borders-component .themeSlides')
        const flipIcons = () => {
            const state = Flip.getState([iconRefs.current])
            iconRefs.current.forEach((el,idx) => {
                themeSlides[idx].appendChild(el)
            })
            Flip.from(state,{
                scale:true,
                absolute:true,
                zIndex:10000001,
                ease:'power2.inOut',
                duration:1.25,
                onComplete:() => {
                    gsap.to(iconRefs.current,{
                        opacity:0,
                        duration:1,
                        delay:0.25,
                        ease:'power2.inOut',
                        onComplete:() => {
                            setAnimating(false)
                        }
                    })
                }
                // delay:1.25
            })
        }
        gsap.set(entRef.current,{
            opacity:1,
            ease:"sine.inOut",
        })

        tl.fromTo(".entitle-theme",{
            backgroundColor:"#231f20",
        },{
            backgroundColor: "#231f20ad",
            duration:2,
        })
        tl
        .to('.entitle-theme .wrapper.tp',{
            "--icl-p":"55%",
            "--icl-r":"-45%",
            top:"30%",
            duration:2,
            ease:"power2.inOut"
        })
        .to('.entitle-theme .wrapper.bt',{
            "--icl-p":"55%",
            "--icl-r":"-45%",
            bottom:"30%",
            duration:2,
            ease:"power2.inOut",
            onComplete:() => {
                slidesFunction('.entitle-theme .wrapper.tp .word',false)
                slidesFunction('.entitle-theme .wrapper.bt .word',true)
            }
        },"-=2")
        .to('.entitle-theme .can-opener',{
            "--opener":"99%",
            duration:0.2,
            delay:2,
            ease:"power2.inOut",
            onStart: () => {
                tl2.to('.entitle-theme .can-closer',{
                    opacity:1,
                    duration:0,
                    ease:"power2.inOut",
                    onComplete: () => {
                        closerOpening()
                    }
                })
            }
        })
        .to('.entitle-theme .ic-line',{
            "--line-opener-tp":"100%",
            duration:1,
            ease:"power2.inOut"
        })
        .to('.entitle-theme .ic-line .img-icons',{
            "--circle-opener":"100%",
            duration:1.5,
            ease:"power2.inOut"
        })
        .to('.entitle-theme .ic-line .icons',{
            opacity:1,
            duration:1.2,
            ease:"power2.inOut",
        })
        .to('.entitle-theme .ic-line',{
            "--line-opener-tp":"0%",
            duration:1,
            ease:"power4.inOut"
        })
        .to('.entitle-theme .ic-line .img-icons',{
            "--circle-opener":"0%",
            "--circle-positioner-x":"-75%",
            "--circle-positioner-y":"-75%",
            duration:1.85,
            ease:"sine.inOut"
        })
        .to('.entitle-theme .can-closer',{
            opacity:0,
            display:'none',
            duration:1,
            ease:"power2.inOut",
            onStart:() => {
                flipIcons()
                gsap.to(entRef.current,{
                    opacity:0,
                    display:'none',
                    duration:1,
                    ease:"sine.inOut",
                })
            },
            
        })
        tl.play()
    },[])

    return (
        <div className="entitle-theme" ref={entRef}>
            <div className="can-opener"
                style={ removeOpener ? {display:'none'} : {}}
            >
                <div className="wrapper tp">
                    <div className="hero">
                        <h1 className="flex hero__heading items-center gap-4 justify-center"> 
                            <span className="word">
                                THE RISE 
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="wrapper bt">
                    <div className="hero_filter">
                        <h3 className="hero__heading"> 
                            <span className="word">
                                PHASE 1 
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
            <div className="can-closer grid">
                <div className="closer-comp-md grid items-center justify-center grid-cols-5">
                    {iconsEntitle.map((elem,i) => {
                        return (
                            <div key={i} className="ic-line flex items-center justify-center">
                                <div className="img-icons"></div>
                                <img
                                    ref={el => (iconRefs.current[i] = el)}
                                    className='icons'
                                    src={elem.svg}
                                    width={100}
                                    height={100}
                                    alt="icon"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EntitleTheme