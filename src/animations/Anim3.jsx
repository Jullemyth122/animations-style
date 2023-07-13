import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger,Flip)
const Anim3 = () => {

    const ctx = useRef(gsap.context(() => {}))
    let animating;
    let currentIndex = 0;
    let previousDirection = 0; 

    const wrapperRef = useRef()
    const pathRef = useRef()
    let intentObserver;

    useEffect(() => {
        ctx.current.add(() => {
            const list = [0, 1, 2];
            const wrap = gsap.utils.wrap(0, list.length);
            const forwardPaths = [
                "M0 0L1 0.4V0.6L0 1Z",
                "M0.2 0L0.8 0.05V0.95L0.2 1V0Z",
                "M0 0.29L1 0V1L0 0.66Z", // Trapezoid equivalent to your CSS clip-path
            ];
            
            const reversePaths = [
                "M0.01 0L0.99 0.01V0.99L0.01 1V0Z", // Slightly skewed rectangle
                "M0 0L1 0.4V0.6L0 1Z",
                "M0.2 0L0.8 0.05V0.95L0.2 1V0Z",
            ];

            function gotoSection(index, direction) {
                if (previousDirection !== direction) {
                    if (direction === 1) {
                        index = index - 1;
                    } else {
                        index = index + 1;
                    }
                }

                console.log(`Checking boundaries with index ${index} and direction ${direction}`);
                if ((index >= list.length && direction === 1) || (index < 0 && direction === -1)) {
                    animating = false;
                    intentObserver.disable();
                    console.log("Animation complete");
                    return;
                }
            
                index = wrap(index);
                let targetPath = direction === 1 ? forwardPaths[index] : reversePaths[index];
                animating = true;
                gsap.to(pathRef.current, {
                    duration: 1.5,
                    attr: {
                        d: targetPath,
                    },
                    onComplete: () => {
                        animating = false
                    },
                    ease: "power2.inOut",
                });
            
                currentIndex = index;
                previousDirection = direction;
            }

            intentObserver = ScrollTrigger.observe({
                type: "wheel,touch,pointer,scroll",
                target: ".wrapper",
                onDown: () =>
                !animating && gotoSection(currentIndex + 1, 1),
                onUp: () =>
                !animating && gotoSection(currentIndex - 1, -1),
                tolerance: 10,
                preventDefault: true,
                onPress: self => {
                    // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
                    ScrollTrigger.isTouch && self.event.preventDefault();
                },
                // wheelSpeed:-1,
            });
            intentObserver.disable()
            ScrollTrigger.create({
                trigger:wrapperRef.current,
                pin:true,
                scrub:true,
                start: "top top",
                end:"+=100%",
                markers:true,
                onEnter:() => {
                    intentObserver.enable()
                    gotoSection(currentIndex+1,1)
                },
                onEnterBack:() => {
                    intentObserver.enable()
                    gotoSection(currentIndex-1,-1)
                }
            })

        });
    }, []);


    return (
        <div className='anim3-component'>
            <div className="extra-height"></div>
            <div className="wrapper" ref={wrapperRef}>
                <svg width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clip-path-1" clipPathUnits="objectBoundingBox">
                            <path ref={pathRef} d="M0.01 0L0.99 0.01V0.99L0.01 1V0Z" fill="#D9D9D9"/>
                        </clipPath>
                    </defs>
                </svg>
                <img src="./products/OshiB.jpg" alt="" />
            </div>
            <div className="next-section"></div>
        </div>
    )
}

export default Anim3