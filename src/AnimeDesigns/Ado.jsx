import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import Lenis from "@studio-freight/lenis";

const Ado = () => {

    const ctx = useRef(gsap.context(() => {}))
    const [animState,setAnimState] = useState(false)
    const pathRef = useRef([])
    const normalRef = useRef()
    const jpRef = useRef()
    const gridRef = useRef([]);
    const [up,setUp] = useState(false)
    const imgWrapperRefs = useRef()

    const gridSize = 10;

    const boxes = Array.from({ length: gridSize * gridSize }, (_, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        return { row, col };
    });

    useEffect(() => {
        const lenis = new Lenis({
            direction: "vertical", // vertical, horizontal
            gestureDirection: "vertical", // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1.0, // sensibility
            smoothTouch: true, // Mobile
            touchMultiplier: 2, // sensibility on mobile
            infinite: false // Infinite scrolling
        })

        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)

        ctx.current.add(() => {
            const start = "M 0 1 V 0.5 Q 0.5 0 1 0.5 V 1 Z";
            const end = "M 0 1 V 0 Q 0.5 0 1 0 V 1 Z";    
            const tl2 = gsap.timeline({ defaults: { duration:1 },onComplete:() => setUp(true) });
            tl2.to(pathRef.current[0], {duration: 1, attr: { d: start }, ease: "power2.in"})
            .to(pathRef.current[0], {duration: 0.5, attr: { d: end }, ease: "power2.out"})
            .to('.wall',{
                height:'50%',
                ease:'power2.inOut'
            })
            .fromTo('img',{
                scale:2,
                transform:'translateY(65%)'
            },{
                transform:'translateY(0%)',
                scale:1,
                ease:'power2.inOut',
                duration:1.5,
            },"-=2")
            .to('.line',{
                width:"100%",
                duration:1.5,
                ease:'power2.inOut'
            })
            .to(['.normal','.jp'],{
                "--clip-normals1":"0%",
                "--clip-normals2":"0%",
                duration:2,
                ease:"power2.inOut"
            },"-=1.5")
            .to(['.normal','.jp'],{
                "--clip-normals1":"30%",
                "--clip-normals2":"30%",
                duration:2,
                ease:"power2.inOut"
            })
            .to(['.normal','.jp'],{
                "--clip-adjust1":"55%",
                "--clip-adjust2":"75%",
                duration:2,
                ease:"power2.inOut"
            },"-=1")

        })
    },[])

    useEffect(() => {
        if (up) {
            ctx.current.add(() => {
                const start2 = "M 0 0 V 0.5 Q 0.5 1 1 0.5 V 0 Z",
                end2 = "M 0 0 V 1 Q 0.5 1 1 1 V 0 Z"
                const tl1 = gsap.timeline({ 
                    scrollTrigger:{
                        trigger:'.intro',
                        scrub:1,
                        pin:true,
                        end:"+=300%",
                        invalidateOnRefresh:true
                    }
                })
                tl1.to(pathRef.current[1], {duration: 0.8, attr: { d: start2 }, ease: "power2.in"})
                .to(pathRef.current[1], {duration: 0.4, attr: { d: end2 }, ease: "power2.out"})
                .to('.wall',{ duration: 1, ease:'power2.inOut', top:'25%' },"-=1")
                .to(normalRef.current.querySelectorAll('span'),{ duration: 1, transform:`translateY(-100%)`,ease:'power2.inOut' },"-=1")
                .to(jpRef.current.querySelectorAll('span'),{ duration: 1, transform:`translateY(-100%)`,ease:'power2.inOut' },"-=1")
                .to(pathRef.current[2], {duration: 0.8, attr: { d: start2 }, ease: "power2.in"})
                .to(pathRef.current[2], {duration: 0.4, attr: { d: end2 }, ease: "power2.out"})
                .to('.wall',{ duration: 1, ease:'power2.inOut', top:'50%' },"-=1")
                .to(normalRef.current.querySelectorAll('span'),{ duration: 1, transform:`translateY(-200%)`,ease:'power2.inOut' },"-=1")
                .to(jpRef.current.querySelectorAll('span'),{ duration: 1, transform:`translateY(0%)`,ease:'power2.inOut' },"-=1")
            })
        }
    },[up])

    useEffect(() => {
        if (up) {
            if (gridRef.current) {
                const elements = gridRef?.current;
                elements.forEach((elem, i) => {
                    const st = elem?.children;
                    const tl = gsap.timeline({
                        scrollTrigger:{
                            trigger:elem,
                            start: "20% 30%",
                            // markers:true,
                            // pin:true,
                            // scrub:true,
                            toggleActions:'play reverse play reverse'
                        }
                    });
    
                    tl.fromTo(st, {
                        filter: 'grayscale(100%)',
                    }, {
                        filter: 'grayscale(0%)',
                        stagger: {
                            amount: 2.3,
                            grid: [gridSize, gridSize],
                            from: "center",
                        },
                        ease: "power2.inOut",
                    }).fromTo(st, {
                        // scale: 0.2,
                        scaleX:0.2,
                        backgroundPosition:'center 100%',
                    }, {
                        // scale: 1,
                        scaleX:1,
                        opacity: 1,
                        backgroundPosition:'center 10%',
                        stagger: {
                            amount: 1,
                            grid: [gridSize, gridSize],
                            from: "center",
                        },
                        ease: "circ.inOut",
                    },0);
                })
            }
        }
    }, [up]);

    return (
        <div className='music-comp'>
            {[0,1,2].map((elem,i) => {
                return (
                    <svg id="svg" key={i} className='transition' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                        <defs>
                            <clipPath id={`transition${i}`} clipPathUnits={'objectBoundingBox'}>
                                {
                                    i == 0 ?
                                    <path ref={e => pathRef.current.push(e)} className="path" d="M 0 1 V 1 Q 0.5 1 1 1 V 1 Z"/>
                                    :
                                    // <path d="M 0 0 V 0.5 Q 0.5 1 1 0.5 V 0 Z" fill="#D9D9D9"/>
                                    <path ref={e => pathRef.current.push(e)} className="path" d="M 0 0 V 0 Q 0.5 0 1 0 V 0 Z"/>
                                }
                            </clipPath>
                        </defs>
                    </svg>
                )
            })}
            <div className="intro">
                <div className="textWrapper">
                    <h1 className='normal' ref={normalRef}>
                        <span>
                            ADO 
                        </span> 
                        <span className="abs">
                            YOKU
                        </span>
                        <span className="abs">
                            MIRROR
                        </span>
                    </h1>
                    <div className="line"></div>
                    <h1 className='jp' ref={jpRef}>
                        <span className="abs">
                            ミラー
                        </span>
                        <span className="abs">
                            これ
                        </span>
                        <span>
                            金木犀 
                        </span> 
                    </h1>
                </div>
                <div ref={e => imgWrapperRefs.current.push(e)} className="imgWrapper">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <div className="wall"></div>
                </div>
                <div ref={e => imgWrapperRefs.current.push(e)} className="imgWrapper ct-1">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <div className="wall"></div>
                </div>
                <div ref={e => imgWrapperRefs.current.push(e)} className="imgWrapper ct-2">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <div className="wall"></div>
                </div>
            </div>
            <div className="multi-section" style={ up ? { display:'grid' } : { display:'none' }}>
                <div className="grid ado" ref={e => gridRef.current.push(e)}>
                    {boxes.map((box, idx) => (
                        <div
                            key={idx}
                            className="box"
                            style={{
                                clipPath: `polygon(
                                ${box.col * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%,
                                ${box.col * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%
                                )`
                            }}
                        />
                    ))}
                </div>
                <div className="grid yoku" ref={e => gridRef.current.push(e)}>
                    {boxes.map((box, idx) => (
                        <div
                            key={idx}
                            className="box"
                            style={{
                                clipPath: `polygon(
                                ${box.col * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%,
                                ${box.col * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%
                                )`
                            }}
                        />
                    ))}
                </div>
                <div className="grid mirror" ref={e => gridRef.current.push(e)}>
                    {boxes.map((box, idx) => (
                        <div
                            key={idx}
                            className="box"
                            style={{
                                clipPath: `polygon(
                                ${box.col * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${box.row * (100 / gridSize)}%,
                                ${(box.col + 1) * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%,
                                ${box.col * (100 / gridSize)}% ${(box.row + 1) * (100 / gridSize)}%
                                )`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Ado