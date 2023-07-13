import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(Flip,ScrollTrigger);

const parents = [
    {lt:"A",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    {lt:"B",text:"My Life Has Been Bullish"},
    {lt:"C",text:"My Life Has Been Bearish"}
]

const FlipScrolls = () => {

    const ctx = useRef(gsap.context(() => {}))
    const [parentIndex, setParentIndex] = useState(0);
    const flipState = useRef();
    const childRef = useRef();
    const wrappersRef = useRef();
    const guides = useRef();
    const items = useRef();
    const handleClick = () => {
        flipState.current = Flip.getState(childRef.current);
        setParentIndex(parentIndex === parents.length - 1 ? 0 : parentIndex + 1);
    };
    
    
    useEffect(() => {
        guides.current = gsap.utils.toArray('.guide', wrappersRef.current);
    }, []);
  
    useLayoutEffect(() => {
        if (!flipState.current) return;
        Flip.from(flipState.current, {
            duration: 1,
            targets: [childRef.current],
        });
    }, [parentIndex]);
    
    const scrollFlipState = useRef()
    const secondWrapperRefs = useRef();
    const secondChildRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(0);

    useEffect(() => {
        items.current = gsap.utils.toArray('.component-two .p', secondWrapperRefs.current);
    },[])

    useEffect(() => {
        ctx.current.add(() => {
            items.current.map((item,idx) => {
                console.log(item)
                const tl = gsap.timeline({
                    scrollTrigger:{
                        trigger: item,
                        start: "top top", // animation starts when top of the item hits the center of the viewport
                        end: "bottom 10%", // animation ends when the center of the item hits the center of the viewport
                        pin: true,
                        scrub: true,
                        markers: true,
                        onEnter: () => {
                            setScrollIndex(idx)
                            scrollFlipState.current = Flip.getState(secondChildRef.current,{ props: "transform, top, left" });
                        }, // called when scrolling down and start of ScrollTrigger region enters the viewport
                        onEnterBack: () => {
                            setScrollIndex(idx)
                            scrollFlipState.current = Flip.getState(secondChildRef.current,{ props: "transform, top, left" });
                        }, 
                    }
                })
            })
        })
        // return () => {
        //     ctx.current.revert()
        // }
    },[])

    useLayoutEffect(() => {
        if (!scrollFlipState.current) return;
        Flip.from(scrollFlipState.current, {
            duration: 2,
            ease:'power2.inOut',
            // absolute:true,
            // scale:true,
            targets: [secondChildRef.current],
        });
    },[scrollIndex])

    return (
        <div className="container">
            <div className="active-button" onClick={handleClick}>
                Next Item
            </div>
            <div className="component-one" ref={wrappersRef}>
                {parents.map((parent,i) => (
                    <div key={i} className={`p ${ i == 0 ? "p-1" : "rev p-right"}`}>
                        {i == parentIndex && 
                            <div 
                                className="p-bg" 
                                ref={childRef}
                                data-flip-id="test"
                            ></div>
                        }
                        <p>{parent.text}</p>
                    </div>
                ))}
            </div>
            <section className="component-two" ref={secondWrapperRefs}>
               {parents.map((parent,i) => (
                    <div key={i} className={`p ${ i == 0 ? "p-1" : "rev p-right"}`}>
                        <div className="main-item">
                            {i == scrollIndex && 
                                <div 
                                    className="p-bg" 
                                    ref={secondChildRef}
                                    data-flip-id="test2"
                                ></div>
                            }
                            <p>{parent.text}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default FlipScrolls

