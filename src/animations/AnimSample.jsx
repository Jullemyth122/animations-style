import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip);

const AnimSample = () => {
    const p1 = useRef(null);
    const p2 = useRef(null);
    const p3 = useRef(null);
    const bg = useRef(null);
    let flipCtx;
    let flipCtx2;
  
    const anim = () => {
        flipCtx && flipCtx.revert();
        p1.current.appendChild(bg.current);
    
        flipCtx = gsap.context(() => {
            const state = Flip.getState(bg.current, {props: "transform, top, left"});
            p2.current.appendChild(bg.current);
            const flip = Flip.from(state, { scale:true, absolute: true });
            ScrollTrigger.create({
                trigger: ".container",
                start: "clamp(+=10 center)",
                markers:true,
                endTrigger: p2.current,
                end: "clamp(+=100% +=100%)",
                scrub: true,
                pin:true,
                animation: flip,
                onEnter: () => {
                    p1.current.classList.remove("active");
                },
                onLeaveBack: () => {                      
                    p1.current.classList.add("active");
                },
                onLeave: () => {
                    p2.current.classList.add("active"); 
                },
                onEnterBack: () => {
                    p2.current.classList.remove("active");
                },
            }).refresh()
        });
    };
  
    useEffect(() => {
        anim();
        window.addEventListener("resize", anim);
    
        return () => window.removeEventListener("resize", anim);
    }, []);

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
    },[])
  
    return (
        <div className="container">
            <div className="p p-1 active" ref={p1}>
                <div className="p-bg" ref={bg}>
                    <img src="./products/OshiB.jpg" alt="" />
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="p rev p-2 p-right" ref={p2}>
                <p>
                    My Life Has Been Bullish
                </p>
            </div>
            <div className="p rev p-2 p-right" ref={p3}>
                <p> My Life Has Been Bearish </p>
            </div>
        </div>
    );
}

export default AnimSample