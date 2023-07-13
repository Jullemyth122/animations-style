import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';



const OnepunchMan = () => {

    const mainBackgroundRef = useRef()
    const topLayerRefs = useRef()
    const nextButton = useRef()
    const genosRef = useRef()
    const overlayYellows = useRef()
    const grayRef = useRef()
    const colorRef = useRef()
    const textRefs = useRef()
    const [startGenos,setStartGenos] = useState(false)

    useEffect(() => {
        
        const tl1 = gsap.timeline()
        tl1.fromTo(grayRef.current,{
            "--position-path":"100%",
        },{
            "--position-path":"0%",
            duration:2,
            ease:"sin.inOut"
        })
        tl1.fromTo(grayRef.current,{
            "--rect-path":"0%",
            "--side-path":"0%",
        },{
            "--rect-path":"50%",
            "--side-path":"20%",
            duration:2,
            ease:"sin.inOut",
        })

        const tl2 = gsap.timeline()
        tl2.fromTo(colorRef.current,{
            "--position-path2":"100%",
        },{
            "--position-path2":"0%",
            duration:2,
            ease:"sin.inOut"
        })
        tl2.fromTo(colorRef.current,{
            "--rect-path":"0%",
            "--side-path":"0%",
        },{
            "--rect-path":"50%",
            "--side-path":"20%",
            duration:2,
            ease:"sin.inOut",
        })

        gsap.timeline().to(textRefs.current.querySelectorAll('.word'),{
            translateY:"0%",
            duration:2,
            delay:2,
            stagger:0.1,
            ease:'sin.inOut'
        })
        .to(textRefs.current.querySelectorAll('.word'), {
            "--underline-width":"100%",
            duration:2,
            stagger:0.1,
            ease:'sin.inOut'
        },"-=1")
        .to('.start_button',{
            display:'inline-flex',
            opacity:1,
            duration:0.7,
            ease:'sin.inOut'
        })

    },[])

    useEffect(() => {
        gsap.registerPlugin(Flip)
        if (startGenos) {
            
            gsap.to(overlayYellows.current.querySelectorAll('.yellow'), {
                width:'100%',
                height:"100%",
                stagger:0.15,
                duration:2,
                ease:'sin.inOut'
            })
            gsap.to(genosRef.current.querySelectorAll('.t1 img'), {
                width:'100%',
                height:"100%",
                stagger:0.35,
                duration:2,
                transform:'rotateX(0deg) rotateY(0deg)',
                ease:'sin.inOut'
            })
            gsap.to(genosRef.current.querySelectorAll('.t2 img'), {
                width:'100%',
                height:"100%",
                stagger:0.35,
                duration:2,
                transform:'rotateX(0deg) rotateY(0deg)',
                ease:'sin.inOut'
            })
            gsap.to(genosRef.current.querySelectorAll('.t3 img'), {
                width:'100%',
                height:"100%",
                stagger:0.35,
                duration:2,
                transform:'rotateX(0deg) rotateY(0deg)',
                ease:'sin.inOut',
                onComplete:() => {
                    gsap.to(nextButton.current,{
                        display:'block',
                        opacity:1,
                        duration:1,
                        ease:'sin.inOut'
                    })
                }
            })

            nextButton.current.addEventListener('click', () => {
                const flipState = Flip.getState([genosRef.current.querySelectorAll('.list_img'), topLayerRefs.current])
                
                const listImages = genosRef.current.querySelectorAll('.list_img');
                listImages.forEach((img) => {
                    topLayerRefs.current.appendChild(img);
                });
            
                Flip.from(flipState,{
                    duration:1,
                    stagger:0.075,
                    absolute:true,
                    position:true,
                    scale:true,
                    ease:"scale.inOut"
                })
            })
            
        }
    },[startGenos])

    const handleMainBackground = () => {
        gsap.fromTo(mainBackgroundRef.current,{
            clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        },{
            clipPath:'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            duration:1.5,
            ease:"sin.inOut",
            onComplete: () => {
                setStartGenos(true)
                gsap.to('.genos_component',{
                    display:'grid',
                    duration:1.5,
                    ease:'sin.inOut'
                })
            }
        })
    }

    return (
        <div className='main-component'>
            <div className="mainBackground" ref={mainBackgroundRef}>
                <div className="doubleImage grayscale" ref={grayRef}>
                    <img src="./img/OPM.jpg" alt="" />
                </div>
                <div className="doubleImage colored" ref={colorRef}>
                    <img src="./img/OPM.jpg" alt="" />
                </div>
                <div className="textBg" ref={textRefs}>
                    <h1> 
                        <span className="word">
                            ONE PUNCH     
                        </span>
                    </h1>
                    <h1> 
                        <span className="word">
                            MAN 
                        </span>
                    </h1>
                </div>
                <div className="start_button" onClick={handleMainBackground}>
                    <h5> 
                        START
                    </h5>
                </div>
            </div>    

            <div className="genos_component" ref={genosRef}>
                <div className="overlayYellows" ref={overlayYellows}>
                    <h2>
                        GENOS
                    </h2>
                    <div className="yellow"></div>
                    <div className="yellow"></div>
                    <div className="yellow"></div>
                    <div className="yellow"></div>
                </div>
                <div className="triple_item t1">
                    <div className="list_img">
                        <img src="./img/genos.png" alt="" />
                        <img src="./img/genos.png" alt="" />
                        <img src="./img/genos.png" alt="" />
                    </div>
                </div>
                <div className="triple_item t2">
                    <div className="list_img">
                        <img src="./img/genos2.jpg" alt="" />
                        <img src="./img/genos2.jpg" alt="" />
                        <img src="./img/genos2.jpg" alt="" />
                    </div>
                </div>
                <div className="triple_item t3">
                    <div className="list_img">
                        <img src="./img/genos3.jpg" alt="" />
                        <img src="./img/genos3.jpg" alt="" />
                        <img src="./img/genos3.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div className="topLayerParent" ref={topLayerRefs}>

            </div>
            
            <div className="nextAppointer" ref={nextButton}>
                <svg width="53" height="46" viewBox="0 0 53 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M33.0294 1.78688L52.1213 20.8788C53.2929 22.0503 53.2929 23.9498 52.1213 25.1214L33.0294 44.2133C31.8579 45.3849 29.9584 45.3849 28.7868 44.2133C27.6152 43.0417 27.6152 41.1422 28.7868 39.9706L42.7574 26.0001H0V20.0001H42.7574L28.7868 6.02952C27.6152 4.85795 27.6152 2.95846 28.7868 1.78688C29.9584 0.61531 31.8579 0.61531 33.0294 1.78688Z" fill="white"/>
                </svg>
            </div>

        </div>
    )
}

export default OnepunchMan