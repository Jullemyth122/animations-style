import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useState,useRef } from 'react'
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger,Flip)

const Anim2 = () => {

    let ctx = useRef(gsap.context(() => {}))
    const [animState,setAnimState] = useState(false)
    const [animState2,setAnimState2] = useState(false)
    const [animState3,setAnimState3] = useState(false)
    const showMovieRef = useRef()
    const midLayerRef = useRef()
    const wrapperRef = useRef()
    const pathRef = useRef()
    const showcases = useRef()

    let flipCtx;
    let animating;
    let currentIndex = 0;
    let previousDirection = 0; 
    let intentObserver;


    useEffect(() => {
        ctx.current.add("animIntro",() => {
            let tl1 = gsap.timeline({ 
                defaults: { 
                    duration: 1.25, 
                    ease:"power2.inOut" 
                }, 
                onComplete:() => {
                    setAnimState(true)
                    gsap.to('.showcases',{
                        display:'block',
                    })
                }
            })
            tl1.fromTo('.wrapper .mid-layer',{
                "--mid-clip":"0%",
            },{
                "--mid-clip":"10%", 
                duration:2,
                ease:"power4.inOut"
            })
            .fromTo('.wrapper .layer.lf',{
            },{
                "--lf-clip":"50%",
            })
            .fromTo('.wrapper .layer.lf h1',{
                transform:"translateX(-50%)",
                scale:1.4,
            },{
                transform:"translateX(0%)",
                scale:1,
            },3)
            .fromTo('.wrapper .layer.rt h1',{
                transform:"translateX(-50%)",
            },{
                transform:"translateX(0%)",
            },3)
            .fromTo('.wrapper .layer.rt',{
                scale:1
            },{
                "--rt-clip":"100%",
                scale:1.4,
            },3)
        })
        return () => {
            ctx.current.revert()
        }
    },[])

    useEffect(() => {
        const lenis = new Lenis({
            orientation: "vertical", // vertical, horizontal
            gestureOrientation: "vertical", // vertical, horizontal, both
            smoothWheel: true,
            wheelMultiplier: 1.0, // sensibility
            smoothTouch: true, // Mobile
            touchMultiplier: 2, // sensibility on mobile
            infinite: false // Infinite scrolling
        })

        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)

        ctx.current.animIntro()
    },[])

    useEffect(() => {
        if (animState) {
            ctx.current.add(() => {
                const tl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.banner',
                        pin: true,
                        invalidateOnRefresh: true,
                        scrub: true,
                        end: "+=350%",
                    },
                    onComplete:() => {
                        setAnimState2(true)
                    }
                })
                tl2.fromTo('.wrapper .mid-layer, .wrapper .mid-layer img',{
                    "--mid-clip":"10%",
                },{
                    "--mid-clip":"50%",
                    opacity:1,
                })
                tl2.fromTo('.wrapper .mid-layer',{
                    "--mid-h-clip":"0%",
                },{
                    "--mid-h-clip":"49%",
                })            
            })
        }
    },[animState])

    const anim = () => {
        flipCtx && flipCtx.revert();
        wrapperRef.current.appendChild(midLayerRef.current);
    
        flipCtx = gsap.context(() => {
            const showText = gsap.to('.title-text',{
                paused:true,
                opacity:1,
                duration:2.0
            })
            const clipAnim = gsap.timeline({ defaults: { duration: 1.5,ease:"power2.inOut" } })
            // clipAnim.to("") 

            const state = Flip.getState(midLayerRef.current,{ });
            showMovieRef.current.appendChild(midLayerRef.current);
            const flip = Flip.from(state, {
                absolute: true,
            });
            
            ScrollTrigger.create({
                trigger: ".banner",
                scrub: true,
                start: "clamp(+=40% center)",
                endTrigger: '.showInside',
                // end: "clamp(+=100% 100%)",
                end: () => {
                    return "clamp(+=150% 100%)"
                },
                pin:true,
                animation: flip,
                onEnterBack:() => {
                    console.log('leave')
                    // setAnimState3(false)
                },
                onLeaveBack:() => {
                    console.log('enter')
                },
                // markers:true,
                onLeave: ({progress, direction, isActive}) => {
                    // setAnimState3(true)
                    showText.play()
                }
            });
        });
    }

    useEffect(() => {
        if (animState2) {
            anim()
        }
    },[animState2])

    useEffect(() => {
        // ctx.current.add(() => {
        //     const list = [0, 1, 2];
        //     const wrap = gsap.utils.wrap(0, list.length);
        //     const forwardPaths = [
        //         "M0 0L1 0.4V0.6L0 1Z",
        //         // "M0.05 0L0.35 0.05V0.95L0.05 1V0Z",
        //         "M0.2 0L0.8 0.05V0.95L0.2 1V0Z",
        //         "M0 0.29L1 0V1L0 0.66Z", // Trapezoid equivalent to your CSS clip-path
        //     ];
            
        //     const reversePaths = [
        //         "M0.01 0L0.99 0.01V0.99L0.01 1V0Z", // Slightly skewed rectangle
        //         // "M0.05 0L0.35 0.05V0.95L0.05 1V0Z",
        //         "M0 0L1 0.4V0.6L0 1Z",
        //         "M0.2 0L0.8 0.05V0.95L0.2 1V0Z",
        //     ];

        //     function gotoSection(index, direction) {
        //         if (previousDirection !== direction) {
        //             if (direction === 1) {
        //                 index = index - 1;
        //             } else {
        //                 index = index + 1;
        //             }
        //         }

        //         console.log(`Checking boundaries with index ${index} and direction ${direction}`);
        //         if ((index >= list.length && direction === 1) || (index < 0 && direction === -1)) {
        //             animating = false;
        //             intentObserver.disable();
        //             console.log("Animation complete");
        //             return;
        //         }
            
        //         index = wrap(index);
        //         let targetPath = direction === 1 ? forwardPaths[index] : reversePaths[index];
        //         animating = true;
        //         gsap.to(pathRef.current, {
        //             duration: 1.5,
        //             attr: {
        //                 d: targetPath,
        //             },
        //             onComplete: () => {
        //                 animating = false
        //             },
        //             ease: "power2.inOut",
        //         });
            
        //         currentIndex = index;
        //         previousDirection = direction;
        //     }

        //     intentObserver = ScrollTrigger.observe({
        //         type: "wheel,touch,pointer",
        //         target:showcases.current,
        //         onDown: () =>
        //         !animating && gotoSection(currentIndex + 1, 1),
        //         onUp: () =>
        //         !animating && gotoSection(currentIndex - 1, -1),
        //         tolerance: 10,
        //         preventDefault: true,
        //         onPress: self => {
        //             // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
        //             ScrollTrigger.isTouch && self.event.preventDefault();
        //         },
        //         // wheelSpeed:-1,
        //     });
        //     intentObserver.disable()
        //     let intentInstanceScrollTrigger = ScrollTrigger.create({
        //         trigger:showcases.current,
        //         pin:true,
        //         scrub:true,
        //         start: "top top",
        //         end:"+=100%",
        //         markers:true,
        //         onEnter:() => {
        //             intentObserver.enable()
        //             gotoSection(currentIndex+1,1)
        //         },
        //         onEnterBack:() => {
        //             intentObserver.enable()
        //             gotoSection(currentIndex-1,-1)
        //         }
        //     })
        //     intentInstanceScrollTrigger.disable()

        //     if (animState3) {
                
        //     }
        // });

    },[
    ])
    
    return (
        <div className='anim2-component'>
            <section className="banner">
                <div className="wrapper" ref={wrapperRef}>
                    <div className="layer lf">
                        <h1>
                            ANIME
                        </h1>
                    </div>
                    <div className="mid-layer" ref={midLayerRef}>
                        <img src="./products/OshiB.jpg" alt="" />
                    </div>
                    <div className="layer rt">
                        <h1>
                            ANIME
                        </h1>
                    </div>
                </div>
                <section className="showcases" ref={showcases}>
                    <h1 className="title-text">
                        B-KOMACHI
                    </h1>
                    <div className="showInside">
                        <svg width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="clip-path-1" clipPathUnits="objectBoundingBox">
                                    <path ref={pathRef} d="M0.01 0L0.99 0.01V0.99L0.01 1V0Z" fill="#D9D9D9"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="showMovie" ref={showMovieRef}>

                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Anim2