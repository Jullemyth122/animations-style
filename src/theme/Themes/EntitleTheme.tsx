import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { iconsEntitle } from '@/utilities/icons'
import Image from 'next/image'

import { slidesFunction } from '@/components/functionality/TextFunctions'
import { useGlobal } from '@/components/functionality/GlobalFunctionality'

const EntitleTheme = ({start,setStart}: any) => {
    const { loaderComplete } = useGlobal();
    
    let tl = gsap.timeline({paused:true,delay: loaderComplete ? 2 : 0 }) 
    let tl2 = gsap.timeline() 
    
    const [removeOpener,setRemoveOpener] = useState(false)
    const entRef = useRef(null)


    const closerOpening = () => {
        setRemoveOpener(true)
    }


    useEffect(() => {
        const theme = document.querySelector<any>('.entitle-theme')
        const cursor_theme = document.querySelector('.cursor-theme')
        const introThemeIcons = document.querySelectorAll('.intro-theme-icons')

        gsap.set(entRef.current,{
            opacity:1,
            ease:"sine.inOut",
        })
        gsap.set(introThemeIcons,{
            opacity:0
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
        .to('.entitle-theme .ic-line img',{
            opacity:1,
            duration:1.2,
            ease:"power2.inOut"
        })
        .to('.entitle-theme .ic-line img',{
            rotation:-270,
            opacity:0,
            x:"-100%",
            y:"100%",
            duration:2,
            delay:0.6,
            ease:"power4.inOut"
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
            onComplete: () => {
                gsap.to(entRef.current,{
                    opacity:0,
                    display:'none',
                    duration:1,
                    ease:"sine.inOut",
                    onComplete:() => {
                        setStart(false)
                        gsap.to(introThemeIcons,{
                            opacity:1,
                            duration:1,
                            ease:'power2.inOut'
                        })
                    }
                })
            }
        })

        if (loaderComplete) {
            tl.play()
        }

    },[loaderComplete])

    return (
        <div className="entitle-theme" ref={entRef}>


            <div className="can-opener flex items-center justify-center"
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
                    {iconsEntitle.map((elem:any,i:number) => {
                        return (
                            <div key={i} className="ic-line flex items-center justify-center">
                                <div className="img-icons">
                                    <Image
                                        src={elem.svg}
                                        width={100}
                                        height={100}
                                        alt="icon"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EntitleTheme

