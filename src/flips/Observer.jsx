import gsap from 'gsap';
import { Flip, Observer } from 'gsap/all';
import React, { useEffect, useRef } from 'react'
import SplitType from 'split-type';

gsap.registerPlugin(Observer,Flip);
const Observers = () => {

    const outerRefs = useRef([])
    const innerRefs = useRef([])
    const sectionHeaderRefs = useRef([])
    const textBgRefs = useRef([])
    const textBodyRefs = useRef([])
    const shownUpBodyRefs = useRef([])
    useEffect(() => {
        let shownUpBody = document.querySelector('.shownUpBody')
        let sections = document.querySelectorAll("section"),
            images = document.querySelectorAll(".bg"),
            textBgs = gsap.utils.toArray(textBgRefs.current),
            headings = gsap.utils.toArray(sectionHeaderRefs.current),
            outerWrappers = gsap.utils.toArray(outerRefs.current),
            innerWrappers = gsap.utils.toArray(innerRefs.current),
            bodyWrappers = gsap.utils.toArray(textBodyRefs.current),
            splitHeadings = headings.map(heading => new SplitType(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
            currentIndex = -1,
            
            wrap = gsap.utils.wrap(0, sections.length),
            animating;
        
        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });
        
        const FlipBody = (index) => {
            const state = Flip.getState('.shownUpBody, .showUpBody')

            shownUpBodyRefs.current[index].appendChild(shownUpBody)

            Flip.from(state,{
                zIndex:100,
                position:true,
                absolute:true,
                duration:1,
                ease:'power.inOut'
            })
        }

        function gotoSection(index, direction) {
            index = wrap(index); // make sure it's valid
            animating = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => animating = false
                });

            if (currentIndex >= 0) {
                // The first time this function runs, current is -1
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor })
                .to(bodyWrappers[currentIndex], { yPercent: -100 * dFactor, duration:1.25, onStart:() => FlipBody(currentIndex)},0)
                .set(sections[currentIndex], { autoAlpha: 0 });
            }

            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo(bodyWrappers[index],{
                yPercent: i => i ? -100 * dFactor : 100 * dFactor,
                visibility:dFactor ? 'hidden' : 'visible'
            },{
                yPercent: 0,
                visibility:dFactor ? 'visible' : 'hidden',
                duration: dFactor ? 1.25 : 0,
            },0)
            tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
                yPercent: i => i ? -100 * dFactor : 100 * dFactor,
                }, { 
                yPercent: 0,
                }, 0)
                .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(splitHeadings[index].chars, { 
                    autoAlpha: 0, 
                    yPercent: 150 * dFactor
                }, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "power2",
                    stagger: {
                    each: 0.02,
                    from: "random"
                    }
                })
                .fromTo(textBgs[index],{
                    // autoAlpha:0,
                    "--clip-text":`${0}%`,
                    "--clip-text2":`${0}%`
                },{
                    // autoAlpha:1,
                    "--clip-text":`${100}%`,
                    "--clip-text2":`${125}%`,
                    duration:2,
                    ease:"power4.inOut"
                },"-=1.5")
                .fromTo(textBgRefs.current[index].querySelectorAll('img'),{
                    "--clip-overlay":"100%",
                },{
                    '--clip-overlay':'-110%',
                    stagger:0.125,
                    duration:1.5,
                    ease:"power2.inOut"
                },"-=1.35")
            
            currentIndex = index;
        }
        
        Observer.create({
            type: "wheel,touch,pointer,scroll",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true
        });
        
        gotoSection(0, 1);        
    },[])

    return (
        <div className='observer-component'>
            <div ref={e => shownUpBodyRefs.current.push(e)} className="shownUp top-left">
                <div className="shownUpBody">
                    <div className="text_body_img" ref={e => textBodyRefs.current.push(e)}>
                        <img src="./hololive/zerotwo.png" alt="" />
                        <h4> Strong Girl </h4>
                    </div>
                    <div className="text_body_img" ref={e => textBodyRefs.current.push(e)}>
                        <img src="./hololive/hoshino.jpg" alt="" />
                        <h4> Liar Girl </h4>
                    </div>
                    <div className="text_body_img" ref={e => textBodyRefs.current.push(e)}>
                        <img src="./hololive/violet.jpg" alt="" />
                        <h4> Doll Girl </h4>
                    </div>
                    <div className="text_body_img" ref={e => textBodyRefs.current.push(e)}>
                        <img src="./hololive/shiori.jpg" alt="" />
                        <h4> Loving Girl </h4>
                    </div>
                </div>
            </div>
            <div ref={e => shownUpBodyRefs.current.push(e)} className="shownUp top-right"></div>
            <div ref={e => shownUpBodyRefs.current.push(e)} className="shownUp bottom-right"></div>
            <div ref={e => shownUpBodyRefs.current.push(e)} className="shownUp bottom-left"></div>
            <div className="scrolldown">
                Scroll down/up
            </div>
            <section className="first">
                <div className="outer" ref={e => outerRefs.current.push(e)}>
                    <div className="inner" ref = {e => innerRefs.current.push(e)}>
                        <div className="bg one">
                            <img src="./hololive/zerotwo.png" alt="" />
                            <div className="text-bg" ref={e => textBgRefs.current.push(e)}>
                                <img src="./hololive/zerotwo.png" alt="" />
                                <img src="./hololive/zerotwo.png" className='pl2' alt="" />
                                <img src="./hololive/zerotwo.png" className='pl3' alt="" />
                                <h2 className="section-heading" ref={e => sectionHeaderRefs.current.push(e)}> ZERO TWO </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="second">
                <div className="outer" ref={e => outerRefs.current.push(e)}>
                    <div className="inner" ref = {e => innerRefs.current.push(e)}>
                        <div className="bg">
                            <img src="./hololive/hoshino.jpg" alt="" />
                            <div className="text-bg" ref={e => textBgRefs.current.push(e)}>
                                <img src="./hololive/hoshino.jpg" alt="" />
                                <img src="./hololive/hoshino.jpg" className='pl2' alt="" />
                                <img src="./hololive/hoshino.jpg" className='pl3' alt="" />
                                <h2 className="section-heading" ref={e => sectionHeaderRefs.current.push(e)}> AI HOSHINO </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="third">
                <div className="outer" ref={e => outerRefs.current.push(e)}>
                    <div className="inner" ref = {e => innerRefs.current.push(e)}>
                        <div className="bg">
                            <img src="./hololive/violet.jpg" alt="" />
                            <div className="text-bg" ref={e => textBgRefs.current.push(e)}>
                                <img src="./hololive/violet.jpg" alt="" />
                                <img src="./hololive/violet.jpg" className='pl2' alt="" />
                                <img src="./hololive/violet.jpg" className='pl3' alt="" />
                                <h2 className="section-heading" ref={e => sectionHeaderRefs.current.push(e)}> VIOLET EVERGARDEN </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fourth">
                <div className="outer" ref={e => outerRefs.current.push(e)}>
                    <div className="inner" ref = {e => innerRefs.current.push(e)}>
                        <div className="bg">
                            <img src="./hololive/shiori.jpg" alt="" />
                            <div className="text-bg" ref={e => textBgRefs.current.push(e)}>
                                <img src="./hololive/shiori.jpg" alt="" />
                                <img src="./hololive/shiori.jpg" className='pl2' alt="" />
                                <img src="./hololive/shiori.jpg" className='pl3' alt="" />
                                <h2 className="section-heading" ref={e => sectionHeaderRefs.current.push(e)}> SHIORI GOSHIKI </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Observers