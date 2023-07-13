import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger)
const InfiniteScroll = () => {
    
    const ctx = useRef(gsap.context(() => {}))
    const cardsRef = useRef([])
    
    useEffect(() => {
        const lenis = new Lenis({
            direction: "vertical", // vertical, horizontal
            gestureDirection: "vertical", // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1.0, // sensibility
            smoothTouch: true, // Mobile
            touchMultiplier: 2, // sensibility on mobile
            infinite: true // Infinite scrolling
        })

        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)

    },[])

    useEffect(() => {
        const container = document.querySelector('.container')
        const textSplit = new SplitType('p',{ split:'chars', charClass:'p-word', tagName:'span' })
        const textSplit2 = new SplitType('.p-word',{ split:'chars', charClass:'p2-word', tagName:'span' })

        ScrollTrigger.create({
            trigger:container,
            // pin:true,
            start: 0,
            end: "max",
            onLeave: self => {
                self.scroll(1);
                ScrollTrigger.update();
            },
            onLeaveBack: self => {
                self.scroll(ScrollTrigger.maxScroll(container)-1);
                ScrollTrigger.update();
            }
        });

        // Change opacity of link on scroll
        const selectAll = (e) => document.querySelectorAll(e);
        const recipe = selectAll(".recipe-link");

        recipe.forEach((recipe, i) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: recipe,
                    start: "+=40% bottom",
                    end:"+=50% top",
                    // markers:true,
                    scrub:true,
                },
                repeat: 1,
                yoyo: true,
            })
            tl.to(recipe, {
                opacity: 1,
                ease: "none",
            }).fromTo(recipe.querySelectorAll('p .p2-word'),{
                transform:'translateX(100%) scaleX(0) rotateY(180deg)',
                opacity:0,
            },{
                stagger:{
                    each:0.015,
                    from:'center'
                },
                opacity:1,
                transform:'translateX(0%) scaleX(1) rotateY(0deg)',
                ease:'none'
            },0)  
            ;
        });
    },[])

    return (
        <div className='infinite-scroll'>
            <div className="container">
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link ">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link ">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/ADO.jpg" alt="" />
                    <p> STATIC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/honeycomebear.jpg" alt="" />
                    <p> MANIAC </p>
                </a>
                <a className="recipe-link">
                    <img src="./transformer/yoku.jpg" alt="" />
                    <p> WEIGHTLESS </p>
                </a>
            </div>
            {/* <div className="warrior"></div> */}
        </div>
    )
}

export default InfiniteScroll