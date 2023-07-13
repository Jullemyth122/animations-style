import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger,Flip)

const items = ["sky","summer","japan1"]
const Texts = ["Landscape","Summer","Japan"]

const AestheticFlip = () => {
    
    const scrollFlipState = useRef()
    const secondWrapperRefs = useRef();
    const childRef = useRef();
    const childRef2 = useRef();
    const childRef3 = useRef();
    const animRefs = useRef();
    const textRef1 = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const mainRefs = useRef([]);

    const pathRef1 = useRef()
    const pathRef2 = useRef()

    const [scrollIndex, setScrollIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const ctx = useRef(gsap.context(() => {}))

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

        ctx.current.add("scrollAnim",() => {
            const tl = gsap.timeline({
                scrollTrigger:{
                    trigger:'.container',
                    start:"top top",
                    end:"+=300% 10%",
                    pin:true,
                    scrub:true,
                }
            })
            tl.to('.container',{
                onStart:() => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                    // setTextIndex(0)
                    setScrollIndex(0)
                },
                onReverseComplete: () => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                }
            })
            tl.to('.container',{
                onStart:() => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                    setScrollIndex(1)
                    // setTextIndex(1)
                },
                onReverseComplete: () => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                    // setTextIndex(0)
                    setScrollIndex(0)
                }
            })
            tl.to('.container',{
                onStart:() => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                    // setTextIndex(2)
                    setScrollIndex(2)
                },
                onReverseComplete: () => {
                    scrollFlipState.current = Flip.getState([
                        childRef.current,
                        childRef2.current,
                        childRef3.current,
                        textRef1.current,
                        textRef2.current,
                        textRef3.current
                    ])
                    // setTextIndex(2)
                    setScrollIndex(1)
                }
            })
        })
        
        ctx.current.scrollAnim()
    },[])


    useLayoutEffect(() => {
        if (!scrollFlipState.current) return;
        if (animRefs.current?.isActive()) return;
        animRefs.current = Flip.from(scrollFlipState.current,{
            duration:1,
            zIndex:5,
            scale:true,
            absolute:true,
            targets:[
                childRef.current,
                childRef2.current,childRef3.current,
                textRef1.current,
                textRef2.current,
                textRef3.current
            ],
            onStart:() => {
                gsap.to('.sample-text',{
                    width:'0%',
                    padding:0,
                    duration:1,
                    onComplete:() => setTextIndex(scrollIndex)
                })
            }
        })
    },[scrollIndex])

    useEffect(() => {
        const tl = gsap.timeline({defaults:{ ease:'power2.inOut', duration:0.5 }})

        if (animRefs.current?.isActive()) {
            return;
        }
        else {
            tl.fromTo('.sample-text',{
                width:'0%',
                padding: '0px',
            },{
                width:'auto',
                padding:'10px',
            })
        }
        
    },[scrollIndex,textIndex])


    useEffect(() => {
        ctx.current.add("animateSection",() => {
            // const targetPath1 = "M0 0H0.4C0.4 0 0.8 0.179746 0.8 0.5C0.8 0.820254 0.4 1 0.4 1H0V0Z";
            // const targetPath2 = "M1 0H0.6C0.6 0 0.2 0.179746 0.2 0.5C0.2 0.820254 0.6 1 0.6 1H1V0Z";

            const targetPath1 = "M0 0H0.25C0.25 0 0.5 0.179746 0.5 0.5C0.5 0.820254 0.25 1 0.25 1H0V0Z";
            const targetPath2 = "M1 0H0.75C0.75 0 0.5 0.179746 0.5 0.5C0.5 0.820254 0.75 1 0.75 1H1V0Z";

            const targetPathFill1 = "M0 0H0.5C0.5 0 0.5 0.179746 0.5 0.5C0.5 0.820254 0.5 1 0.5 1H0V0Z";
            const targetPathFill2 = "M1 0H0.5C0.5 0 0.5 0.179746 0.5 0.5C0.5 0.820254 0.5 1 0.5 1H1V0Z";

            mainRefs.current.forEach((elem,i) => {
                const tl = gsap.timeline({
                    scrollTrigger:{
                        trigger:elem,
                        scrub:true,
                        start:"top center",
                        end:"center center",
                        // markers:true
                    }
                })
                tl.to(elem.querySelector('.path1'),{
                    attr:{
                        d:targetPath1,
                    },
                    duration:2,
                    ease:'power2.inOut',
                })
                tl.to(elem.querySelector('.path2'),{
                    attr:{
                        d:targetPath2,
                    },
                    duration:2,
                    ease:'power2.inOut',
                },0)
                tl.to(elem.querySelector('.path1'),{
                    attr:{
                        d:targetPathFill1,
                    },
                    ease:'power2.inOut',
                },2)
                tl.to(elem.querySelector('.path2'),{
                    attr:{
                        d:targetPathFill2,
                    },
                    ease:'power2.inOut',
                },2)
                gsap.to(elem.querySelector('.intro-mid'),{
                    "--mid-liner":"0%",
                    duration:1.2,
                    ease:'power2.inOut',
                    scrollTrigger:{
                        trigger:elem.querySelector('.intro-mid'),
                        toggleActions: "play none none reverse"
                    }
                })
                
            })
    
        })

        ctx.current.animateSection()
    },[])

    return (
        <div className='aesthetic-comp'>
            {/* <div className="next-button" onClick={handleClick}>
                <h5>
                    TRANSITION
                </h5>
            </div> */}
            <section className="container">
                <div className="wrapper">
                    <div className="lf-side">
                        <div className="text-side show">
                            <h1>
                                { 0 == scrollIndex && <span data-flip-id="text1" ref={textRef1}>空</span>}
                                { 1 == scrollIndex && <span data-flip-id="text2" ref={textRef2}> 夏 </span>}
                                { 2 == scrollIndex && <span data-flip-id="text3" ref={textRef3}> 春 </span>}
                            </h1>
                            <div className="line-span"></div>
                            <h1>
                                { 1 == scrollIndex && <span data-flip-id="text1" ref={textRef1}>空</span>}
                                { 2 == scrollIndex && <span data-flip-id="text2" ref={textRef2}> 夏 </span>}
                                { 0 == scrollIndex && <span data-flip-id="text3" ref={textRef3}> 春 </span>}
                            </h1>
                            <div className="line-span"></div>
                            <h1>      
                                { 2 == scrollIndex && <span data-flip-id="text1" ref={textRef1}>空</span>}
                                { 0 == scrollIndex && <span data-flip-id="text2" ref={textRef2}> 夏 </span>}
                                { 1 == scrollIndex && <span data-flip-id="text3" ref={textRef3}> 春 </span>}
                            </h1>
                        </div>
                        <div className="s1-side show">
                            { 0 == scrollIndex &&  <img data-flip-id="sample" ref={childRef} src="./aesthetic/sky.jpg" alt="" /> }
                            { 1 == scrollIndex &&  <img data-flip-id="sample2" ref={childRef2} src="./aesthetic/summer.jpg" alt="" /> }
                            { 2 == scrollIndex &&  <img data-flip-id="sample3" ref={childRef3} src="./aesthetic/japan1.jpg" alt="" /> }
                            <div className="sample-text">
                                <h1>
                                    { Texts[textIndex] }
                                     {/* SKY  */}
                                </h1>
                                <h5> The Cleanist of All is something you banana </h5>
                            </div>
                        </div>
                    </div>
                    <div className="rt-side">
                        <div className="s2-side show">
                            {1 == scrollIndex && <img data-flip-id="sample" ref={childRef} src="./aesthetic/sky.jpg" alt="" />}
                            {2 == scrollIndex &&  <img data-flip-id="sample2" ref={childRef2} src="./aesthetic/summer.jpg" alt="" /> }
                            {0 == scrollIndex &&  <img data-flip-id="sample3" ref={childRef3} src="./aesthetic/japan1.jpg" alt="" /> }
                        </div>
                        <div className="s3-side show">
                            {2 == scrollIndex && <img data-flip-id="sample" ref={childRef} src="./aesthetic/sky.jpg" alt="" />}
                            {0 == scrollIndex &&  <img data-flip-id="sample2" ref={childRef2} src="./aesthetic/summer.jpg" alt="" /> }
                            {1 == scrollIndex &&  <img data-flip-id="sample3" ref={childRef3} src="./aesthetic/japan1.jpg" alt="" /> }
                        </div>
                    </div>
                </div>
            </section>
            <section className="main-items" ref={e => mainRefs.current.push(e) }>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clipBoth" clipPathUnits="objectBoundingBox">
                            <path className='path1' d="M0 0H0C0 0 0 0.5 0 0.5C0 0.5 0 1 0 1H0V0Z" ref={pathRef1}/>
                            <path className='path2' d="M1 0H1C1 0 1 0.5 1 0.5C1 0.5 1 1 1 1H1V0Z" ref={pathRef2}/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="show-bg">
                    <div className="title">
                        <div className="circle lf"></div>
                        <h1> 空 </h1>
                        <div className="circle rt"></div>
                    </div>
                    <img src="./aesthetic/sky.jpg" alt="" style={{clipPath:'url(#clipBoth)'}} />
                </div>
                <div className="intro-mid">
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> BLUE SKY </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> 青空 </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </section>
            <section className="main-items" ref={e => mainRefs.current.push(e) }>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clipBoth2" clipPathUnits="objectBoundingBox">
                            <path className='path1' d="M0 0H0C0 0 0 0.5 0 0.5C0 0.5 0 1 0 1H0V0Z"/>
                            <path className='path2' d="M1 0H1C1 0 1 0.5 1 0.5C1 0.5 1 1 1 1H1V0Z"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="show-bg">
                    <div className="title">
                        <div className="circle lf"></div>
                        <h1> 空 </h1>
                        <div className="circle rt"></div>
                    </div>
                    <img src="./aesthetic/summer.jpg" alt="" style={{clipPath:'url(#clipBoth2)'}} />
                </div>
                <div className="intro-mid">
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> Summer Vibes </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> サマー </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </section>
            <section className="main-items" ref={e => mainRefs.current.push(e) }>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clipBoth3" clipPathUnits="objectBoundingBox">
                            <path className='path1' d="M0 0H0C0 0 0 0.5 0 0.5C0 0.5 0 1 0 1H0V0Z"/>
                            <path className='path2' d="M1 0H1C1 0 1 0.5 1 0.5C1 0.5 1 1 1 1H1V0Z"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="show-bg">
                    <div className="title">
                        <div className="circle lf"></div>
                        <h1> 空 </h1>
                        <div className="circle rt"></div>
                    </div>
                    <img src="./aesthetic/japan1.jpg" alt="" style={{clipPath:'url(#clipBoth3)'}}/>
                </div>
                <div className="intro-mid">
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> JAPAN VILLAGE </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="text-line">
                        <div className="line lf"></div>
                        <h3> 日本村 </h3>
                        <div className="line rt"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AestheticFlip