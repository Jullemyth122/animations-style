import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)
const Anim4 = () => {
    const swipeSectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [animating, setAnimating] = useState(false);
  
    useEffect(() => {
        let currentIndex = -1;
        let animating;

        // Convert NodeList into Array
        let swipePanels = Array.from(swipeSectionRef.current.querySelectorAll('.panel'));

        // set second panel two initial 100%
        gsap.set(".x-100", {xPercent: 100});

        // set z-index levels for the swipe panels
        gsap.set(swipePanels, { zIndex: (i) => i });

        // handle the panel swipe animations
        function gotoPanel(index, isScrollingDown) {
            animating = true;
            // return to normal scroll if we're at the end or back up to the start
            if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
                let target = index;
                gsap.to(target, {
                    // xPercent: isScrollingDown ? -100 : 0,
                    duration: 0.00,
                    onComplete: () => {
                        animating = false;
                        isScrollingDown && intentObserver.disable();
                    }
                });
                return;
            }

            // target the second panel, last panel?
            let target = isScrollingDown ? swipePanels[index] : swipePanels[currentIndex];
            gsap.to(target, {
                xPercent: isScrollingDown ? 0 : 100,
                duration: 0.75,
                onComplete: () => {
                animating = false;
                }
            });
            currentIndex = index;
            console.log(index);
        }

        let intentObserver = ScrollTrigger.observe({
            type: "wheel,touch,pointer",
            onUp: () => !animating && gotoPanel(currentIndex + 1, true),
            onDown: () => !animating && gotoPanel(currentIndex - 1, false),
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onPress: self => {
                // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
                ScrollTrigger.isTouch && self.event.preventDefault();
            }
        });
        intentObserver.disable();

        ScrollTrigger.create({
            trigger: swipeSectionRef.current,
            pin: true,
            start: "top top",
            end: "+=1",
            onEnter: () => {
                intentObserver.enable();
                gotoPanel(currentIndex + 1, true);
            },
            onEnterBack: () => {
                intentObserver.enable();
                gotoPanel(currentIndex - 1, false);
            }
        });
    }, []);


    return (
        <div className='anim4-component'>
            <div className="swipe-section" ref={swipeSectionRef}>
                <section className="panel red">
                    ASHURA HISTORY
                </section>
                <section className="panel purple x-100">
                    <img src="./products/OshiB.jpg" alt="" />
                </section>
                <section className="panel blue x-100">
                    <img src="./products/OshiB.jpg" alt="" />
                </section>
                <section className="panel orange x-100 vh-200">
                    <img src="./products/OshiB.jpg" alt="" />
                </section>
            </div>
            <div className='extra'></div>
        </div>
    )
}

export default Anim4