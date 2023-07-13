import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import SplitType from 'split-type';
import Lenis from "@studio-freight/lenis";


const Product = () => {

    const pathRef = useRef(null);
    const pathRef2 = useRef(null);
    const pathRef3 = useRef(null);

    const loadRef = useRef(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    let ctx = useRef(gsap.context(() => {}))
    const prodText = useRef(null);
    const imgSlideRef = useRef([]);

    useEffect(() => {
        
        ctx.current.add("loadingState",() => {
            const tl1 = gsap.timeline({ onUpdate:updateProgress })
            
            function updateProgress() {
                setLoadingProgress(Math.floor(tl1.progress() * 100));
            }

            loadRef.current = tl1.to({},{ duration: 5 })
        })
        return () => {
            ctx.current.revert()
        }
    }, []);
    
    useEffect(() => {
        ctx.current.loadingState()
    },[])
    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // Get the width of a slide
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

        let isScrolling;
        let scrollTween;
        let lastScrollPos = window.pageYOffset;
        
        // Scroll event
        window.addEventListener('scroll', function (event) {
            window.clearTimeout(isScrolling);
            
            // Kill any existing animation
            if (scrollTween) {
                scrollTween.kill();
            }
        
            // Check scroll direction
            let currentScrollPos = window.pageYOffset;
            if (currentScrollPos > lastScrollPos){
                // Scrolling down
                scrollTween = gsap.to(pathRef3.current, {
                    duration: 0.5,
                    overwrite:true,
                    attr: { d: 'M0.235 0H1C1 0 0.835 0.294381 0.835 0.5C0.835 0.705619 1 1 1 1H0.235C0.235 1 0 0.845 0 0.5C0 0.155 0.235 0 0.235 0Z' },
                });
            } else {
                // Scrolling up
                gsap.to(pathRef3.current,{
                    duration:0.5,
                    overwrite:true,
                    attr:{ d: 'M0 0H0.81C0.81 0 1 0.294381 1 0.5C1 0.705619 0.81 1 0.81 1H0C0 1 0.23 0.845 0.23 0.5C0.23 0.155 0 0 0 0Z' }
                });
            }
            lastScrollPos = currentScrollPos;
        
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function () {
                // Run the callback
                scrollTween = gsap.to(pathRef3.current, {
                duration: 0.5,
                overwrite:true,
                ease:'power2.inOut',
                attr: { d: 'M0 0H1C1 0 1 0.294381 1 0.5C1 0.705619 1 1 1 1H0C0 1 0 0.845 0 0.5C0 0.155 0 0 0 0Z' },
                });
            }, 100);
        }, false);

        
    }, []);    

    useEffect(() => {
        const textProdTop = new SplitType('.production-top h1',{ 
            types:'words, lines, chars',
            wordClass:"text-word",
            charClass:"span-word",
            tagName:"span" 
        })
        ctx.current.add(() => {
            const start = "M 0 1 V 0.5 Q 0.5 0 1 0.5 V 1 Z";
            const end = "M 0 1 V 0 Q 0.5 0 1 0 V 1 Z";    
            const utils = gsap.utils.toArray(prodText.current.querySelectorAll('.span-word'))
                        
            if (loadingProgress == 100) {
                const tl2 = gsap.timeline({ paused: true });
                tl2.to(pathRef.current, {duration: 0.8, attr: { d: start }, ease: "power2.in"})
                .to(pathRef.current, {duration: 0.4, attr: { d: end }, ease: "power2.out"})
                .to(pathRef2.current,{duration: 1.0, attr: { d: start }, ease: "power2.in"})
                .to(pathRef2.current,{duration: 1.0, attr: { d: end }, ease: "power2.out"})
                .fromTo(imgSlideRef.current,{
                    scale:2,
                    transform:'translateY(100%)'
                },{
                    transform:'translateY(0%)',
                    scale:1,
                    duration:1.2,
                    ease:"power2.inOut"
                },"-=1.5")
                utils.map((elem,i) => {
                    if (i % 2 != 0) {
                        tl2.fromTo(elem,{
                            filter:"blur(7.5px)",
                            transform:"translateY(100%)"
                        },{
                            transform:"translateY(0%)",
                            filter:"blur(0px)",
                            duration:2,
                            ease:"power2.inOut"
                        },1.2)
                    } else {
                        tl2.fromTo(elem,{
                            transform:"translateY(-100%)"
                        },{
                            transform:"translateY(0%)",
                            duration:2,
                            ease:"power2.inOut"
                        },1.2)
                    }
                })
                tl2.to('.first-container',{
                    display:'flex',
                },0)
                let slideWidth;
                if (window.matchMedia("(max-width: 768px)").matches) {
                    slideWidth = Math.max(150, Math.min(window.innerWidth * 0.1, 200));
                } else {
                    slideWidth = Math.max(150, Math.min(window.innerWidth * 0.2, 200));
                }
                gsap.to(".slide-track", {
                    x: -slideWidth * 7, // Slide width is used here
                    ease:"power2.inOut",
                    scrollTrigger: {
                        trigger: ".production-top",
                        pin: true,
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        end: "+=250%",
                    }
                });

                tl2.play()

                gsap.to('.abs-img',{
                    width:"100%",
                    height:"100%",
                    top:0,
                    bottom:0,
                    right:0,
                    left:0,
                    stagger:0.035,
                    duration:1,
                    filter:'contrast(1)',
                    scrollTrigger: {
                        trigger: '.banner-img',
                        invalidateOnRefresh:true,
                        start: "40% center", // when the top of the trigger hits the center of the viewport
                        end: "bottom center", // when the bottom of the trigger hits the center of the viewport
                        toggleActions:'play none none reverse'
                    }
                });
                gsap.to('.loading-site',{
                    display:'none',
                    duration:2
                })
            }
        })
    },[loadingProgress])

    return (
        <div className='production-parent'>
            <section className="loading-site">
                <h1> {loadingProgress}% </h1>
            </section>
            <svg id="svg" className='transition' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                <defs>
                    <clipPath id='transition' clipPathUnits={'objectBoundingBox'}>
                        <path ref={pathRef} className="path" d="M 0 1 V 1 Q 0.5 1 1 1 V 1 Z"/>
                    </clipPath>
                </defs>
            </svg>
            <svg id="svg" className='transition' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="0" width="0">
                <defs>
                    <clipPath id='transition2' clipPathUnits={'objectBoundingBox'}>
                        <path ref={pathRef2} className="path" d="M 0 1 V 1 Q 0.5 1 1 1 V 1 Z"/>
                    </clipPath>
                </defs>
            </svg>


            <svg width="0" height="0" id='svg' fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id='slide-transit2' clipPathUnits={'objectBoundingBox'}>
                        <path ref={pathRef3} d="M0 0H1C1 0 1 0.294381 1 0.5C1 0.705619 1 1 1 1H0C0 1 0 0.845 0 0.5C0 0.155 0 0 0 0Z" fill="#D9D9D9"/>
                    </clipPath>
                </defs>
            </svg>



            <section className="production-top">
                <h1 ref={prodText}> 
                    PRODUCTION DESIGN 
                </h1>
                <div class="slider">
                    <div class="slide-track">
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/1.jpg" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/mens1.jpg" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/watch2.png" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/mens2.jpg" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/watch3.jpg" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/mens4.jpg" alt="" />
                        </div>
                        <div class="slide">
                            <img ref={e => imgSlideRef.current.push(e)} src="./products/watch2.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="first-container">
                <div className="banner-img">
                    <img src="./products/1.jpg" alt="" />
                    <img className='abs-img l1' src="./products/1.jpg" alt="" />
                    <img className='abs-img l2' src="./products/1.jpg" alt="" />
                    <img className='abs-img l3' src="./products/1.jpg" alt="" />
                    <img className='abs-img l4' src="./products/1.jpg" alt="" />
                </div>
            </section>
        </div>
    )
}

export default Product
