import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ThemePassProps } from '@/props/GlobalProps';
import { themePageFunctions } from '@/components/functionality/ThemePageFunctions';


const ThemeWrapper = (
    {
        id,
        theme, 
        isThemeSelected, 
        setThemeSelected,
        bgRef,
        circleRef,
        setHolding,
        holding,
        mainThemeRef,
        isAnimating,
        setIsAnimating,
        isSpaceBarLocked,
        setIsSpaceBarLocked,
        circleLock,
        setCircleLock
    }:ThemePassProps) => {


    let tl1 = gsap.timeline({})
    
    const themeRef = useRef<any>(null) 
    const slideRef = useRef<any>(null) 
    const [isActive, setActive] = useState(false);
    const [complete,setComplete] = useState(false);

    const layerThemeRef = useRef<any>(null);
    const refSVGImage = useRef<any>(null);
    const refStatic = useRef<any>(null);
    const refOverlay = useRef<any>(null);
    const refGif = useRef<HTMLVideoElement>(null);

    let staticColor = gsap.to(refStatic.current,{
        filter:"grayscale(100%)",
        duration:0,
        overwrite:true,
        paused:true
    })

    let staticAnm = gsap.timeline({paused:true})
    .fromTo(refStatic.current,{
        objectPosition: "50% 0%"
    },{
        objectPosition: "100% 0%",
        duration:5,
        ease:"power2.inOut",
        overwrite:true
    }).to(
        refStatic.current,{
            objectPosition:"0% 0%",
            duration:15,
            overwrite:true,
            ease:"power2.inOut"
        }
    )

    useEffect(() => {
        function Up(bool: boolean) {
            if (circleLock == 80) {
                setCircleLock(0)
                return
            }
            else if (circleLock <= 80) {
                if (complete) {
                    tl1.to(circleRef.current,{
                        "--updown": bool ? "100%" : "0%",
                        ease: "power.inOut",
                        duration:2,
                        overwrite:true,
                    })
                    .to(refStatic.current,{
                        ease: "power.inOut",
                        duration:2,
                        overwrite:true,
                    },"-=2")
                    .to(refGif.current,{
                        opacity: bool ? 1 : 0,
                        ease: "power.inOut",
                        duration:2,
                        overwrite:true,
                        onUpdate:() => {
                            setCircleLock(circleLock + 1)
                        }
                    },"-=4")
                }
            }
        }
        function Down() {
            if (holding == "Live") {
                setHolding("Still")
            }
            else {
                setHolding("Live")
            }

            setCircleLock(0)

        }
        const handleKeyDown = (event:any) => {
            if (event.code === 'Space' && isActive && complete) {
                const st = holding == "Live" ? true : false
                Up( st );
            }
        };

        const handleKeyUp = (event:any) => {
            if (event.code === 'Space') {
                Down()
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);

        };
    }, [
        isActive,
        complete,
        circleRef,
        circleLock,
        refStatic,
        refGif,
        setHolding,
        holding
    ]);

    // useEffect(() => {
	// 	const amount = isActive ? 100 : 0;
    //     const animeActive = gsap
    //     .timeline({  delay: isActive ? 3 : 0, paused:true})
    //     .to(refOverlay.current, {
    //         "--panel-bottom-1": amount,
    //         ease: "power2.inOut",
    //         duration:1.5,
    //     })
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-2": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.1)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-3": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.2)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-4": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.3)
    //     .to(refOverlay.current, {
    //         "--panel-bottom-5": amount,
    //         ease: "power2.inOut",
    //         duration:1.5,
    //     },0.4)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-6": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.5)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-7": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.6)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-8": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.7)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-9": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.8)
    //     .to(
    //         refOverlay.current,{
    //             "--panel-bottom-10": amount,
    //             ease: "power2.inOut",
    //             duration:1.5
    //     },0.9)
    //     if (isActive || isAnimating) {
    //         gsap.set(refOverlay.current,{
    //             "--panel-bottom-1": "100%",
    //             "--panel-bottom-2": "100%",
    //             "--panel-bottom-3": "100%",
    //             "--panel-bottom-4": "100%",
    //             "--panel-bottom-5": "100%",
    //             "--panel-bottom-6": "100%",
    //             "--panel-bottom-7": "100%",
    //             "--panel-bottom-8": "100%",
    //             "--panel-bottom-9": "100%",
    //             "--panel-bottom-10": "100%"
    //         })
    //     } else {
    //         animeActive.play()
    //     }
        
    // },[isActive])


    const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
        if (isAnimating) return;
        if (isSpaceBarLocked) return;
        if (isThemeSelected && !isActive) return;
        setIsAnimating(true)

        const wrapper = document.querySelectorAll('.themeWrapper')
        gsap.timeline().fromTo(themeRef.current, {
            "--clip": isActive ? "0%" : "0%",
            opacity:1,
            width:"100%",
            ease:'sine.inOut',
            duration:0.5,
        }, {
            "--clip": isActive ? "0%" : "25%",
            ease: "sine.inOut",
            duration:1,
            maxHeight: isActive ? "70vh" : "77vh",
            onStart:() => {
                gsap.to(mainThemeRef.current,{
                    width: isActive ? '96%' : '100%',
                    gap: isActive ? '2rem' : '0rem',
                    duration:1,
                    delay: isActive ? 1 : 0,
                    ease:"sine.inOut",
                })
            }
        })
        .to(themeRef.current,{
            "--clip": isActive ? "0%" : "0%",
            ease:"sine.inOut",
            duration:1.5,
            onStart:() => {
                setIsAnimating(true);
            },
            onComplete: () => {
                setIsAnimating(false);
                setActive(!isActive);
                setThemeSelected(prevState => !prevState);
            }
        })
        .to(bgRef.current,{
            visibility: isActive ? 'hidden' : 'visible',
            opacity: isActive ? '0' :'1',
            duration: 1,
            ease:'power4.inOut'
        })
        .to(layerThemeRef.current,{
            opacity: isActive ? 0 : 1, 
            duration: isActive ? 0 : 2,
            ease:'power4.inOut'
        })
        .to(refSVGImage.current,{
            display: isActive ? "none" : "flex",
            opacity: isActive ? '0' : '1',
            duration: isActive ? 0 : 1,
            ease:'power4.inOut'
        },`-=1`)
        .to(refSVGImage.current,{
            opacity: 0,
            duration: isActive ? 0 : 1,
            ease:'power4.inOut'
        })
        .to(layerThemeRef.current,{
            opacity: 0, 
            duration: isActive ? 0 : 0.5,
            ease:'power4.inOut'
        })
        .to(circleRef.current,{
            visibility: isActive ? 'hidden' : 'visible', // Change visibility value
            opacity: isActive ? '0' :'1',
            duration: 1,
            ease:'power4.inOut',
            overwrite:true,
            onComplete: function () {
                if (!isActive) {
                    setComplete(true)
                    return
                }
                return setComplete(false) 
            }
        },"-=1")
        .to(slideRef.current,{
            "--slidingText": isActive ? "0%" : "100%",
            duration:  0.5,
            ease:'power4.inOut',
        },`${isActive ? "-=2" : "-=0" }`)
        .fromTo(slideRef.current.querySelector('.sword'),{
            opacity: isActive ? '1':'0',
        },{
            opacity: isActive ? '0' :'1',
            transform: isActive ? "translateX(-100%)" : "translateX(0%)",
            duration: 1.8,
            ease:'power4.inOut',
        },`${isActive ? "-=2" : "-=0" }`)

        themePageFunctions(
            wrapper[id],
            wrapper,
            isActive
        )

    }

    

    const handleMouseOver = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isActive) {
            // staticColor.play()
            staticAnm.play()
            gsap.to(themeRef.current,{
                maxHeight:"77vh",
                ease:"power2.inOut",
                duration:1.5,
                // overwrite:true
            })
        }
    }
    const handleMouseLeave = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        staticAnm.reverse()
        // staticColor.reverse()
        if (!isActive) {
            gsap.to(themeRef.current,{
                maxHeight:"70vh",
                ease:"power2.inOut",
                duration:1.5,
            })
        }
    }

    return (
        <div 
            ref={themeRef}
            className={`themeWrapper ${isActive ? "selected" : ""}`} 
            onClick={handleClick}
            onMouseOver={ e => handleMouseOver(e)}
            onMouseLeave={ e => handleMouseLeave(e)}
        >   
            <div 
                className="slidingOpeningText"
                ref={slideRef}    
            >
                <h3 className='l-hide'>
                    <span className="sword">
                        {
                            theme.themeName
                        }
                    </span>
                </h3>
            </div>

            <Image 
                ref={refStatic}
                className={`themeImage static-image`} 
                src={theme.url} alt="Static Image" 
                width={1000}
                height={300}
            />
            {/* <Image 
                ref={refOverlay}
                className={`themeImage overlay-image`} 
                src={theme.url} alt="Static Image" 
                width={1000}
                height={300}
            /> */}
            <Image
                ref={refSVGImage}
                src={theme.svg}
                width={100}
                height={100}
                alt="icon"
                className='icon-theme'
            />
            <div className="layer-bg" ref={layerThemeRef}></div>
            <video 
                ref={refGif}
                className={`gif-background`} 
                src={theme.mp4}
                width={1000}
                height={300}
                loop={true}
                autoPlay
            />
            <div className="intro-theme">
                <p className="themeTitle">
                    {theme.themeName.toUpperCase()}
                </p>
            </div>
        </div >
    )
}

export default ThemeWrapper