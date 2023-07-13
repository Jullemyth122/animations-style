import { gsap } from 'gsap'
import { Flip, Observer, ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger,Flip)

const OshiNoko = () => {

    const ctx = useRef(gsap.context(() => {}))
    let instanceObserver;
    let currentIndex = 0;

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

        ctx.current.add(() => {
            let swipePanels = gsap.utils.toArray(".wrapper .item-text");
            let topOffsetPercent = 50;
            let bottomOffsetPercent = 50;
            
            gsap.set('.list-of-items', { yPercent: 0});
            
            const tl = gsap.timeline({
                paused: true
            });
            
            let progress = 0;
            
            Observer.create({
                tolerance: 10,
                preventDefault: true,
                type: "wheel,touch,pointer,scroll",
                onChange: (self) => {
                    if (!(progress <= 0 && self.deltaY < 0) && !(progress >= 1 && self.deltaY > 0)) progress += self.deltaY / 25000;
                    progress = gsap.utils.clamp(0, 1, progress);
                    gsap.to(tl, {overwrite: 'auto',progress:progress,ease:'none' });
                }
            });

            let totalPanelAnimationDuration = ((swipePanels.length - 1) * 2) / swipePanels.length; // Added 6s to the total duration

            swipePanels.forEach((target) => {
                tl.to(target.querySelector('img'), {
                    width: '135px',
                    duration: totalPanelAnimationDuration / 2,
                    ease: "none"
                })
                .to(target.querySelector('img'), {
                    width: '0px',
                    duration: totalPanelAnimationDuration / 2,
                    ease: "none"
                })
            }) 
            
            // tl.to('.list-of-items', {
            //     yPercent: (i, t) => {
            //         return -bottomOffsetPercent;
            //     },
            //     duration: (swipePanels.length - 1) * 2, // Added 6s to the duration
            //     ease: "power2.inOut"
            // }, 0);            
            

        })
    },[])

    return (
        <div className='oshi-no-ko-component'>
            <div className="drag-cursor">
                <h4>
                    DRAG
                </h4>
            </div>
            <div className="wrapper">
                <div className="list-of-items">
                    <div className="item-text">
                        <h1>
                            AQUA
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            HOSHINO
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            RUBY
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            HOSHINO
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            AI
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            HOSHINO
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            HIKARU
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            KAMIKI
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            KANA
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            ARIMA
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            AKANE
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            KUROKAWA
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            MIYAKO 
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            SAITO
                        </h1>
                    </div>
                    <div className="item-text">
                        <h1>
                            ICHIGO
                        </h1>
                        <img src="./products/OshiB.jpg" alt="" />
                        <h1>
                            SAITO
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OshiNoko