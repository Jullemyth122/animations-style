import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger,Flip)

const Anim5 = () => {

    useEffect(() => {
        let duration = 10,
        sections = gsap.utils.toArray(".panel"),
        sectionIncrement = duration / (sections.length - 1),
        tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".container",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            start: "top top",
            end: "+=5000"
        }
        });
    
        tl.to(sections, {
            xPercent: -100 * (sections.length - 1),
            duration: duration,
            ease: "none"
        });
    
        sections.forEach((section, index) => {
            let tween = gsap.from(section, {
                opacity: 0, 
                scale: 0.6, 
                duration: 1, 
                force3D: true, 
                paused: true
            });
            addSectionCallbacks(tl, {
                start: sectionIncrement * (index - 0.99),
                end: sectionIncrement * (index + 0.99),
                onEnter: () => tween.play(),
                onLeave: () => tween.reverse(),
                onEnterBack: () => tween.play(),
                onLeaveBack: () => tween.reverse()
            });
            index || tween.progress(1);
        });
    
        function addSectionCallbacks(timeline, {start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack}) {
            let trackDirection = animation => { 
                let onUpdate = animation.eventCallback("onUpdate"), 
                prevTime = animation.time();
                animation.direction = animation.reversed() ? -1 : 1;
                animation.eventCallback("onUpdate", () => {
                let time = animation.time();
                if (prevTime !== time) {
                    animation.direction = time < prevTime ? -1 : 1;
                    prevTime = time;
                }
                onUpdate && onUpdate.call(animation);
                });
            },
            empty = v => v; 
            timeline.direction || trackDirection(timeline); 
            start >= 0 && timeline.add(() => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param), start);
            end <= timeline.duration() && timeline.add(() => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param), end);
        }
    }, [])


    return (
        <div className='anim5-component'>
            <div className="slider-item">
                <div className="container">
                    <div className="description panel blue">
                        <div><h1>Horizontal snapping sections (advanced)</h1>
                        <p>Scroll vertically to scrub the horizontal animation. It also dynamically snaps to the sections in an organic way based on the velocity. The snapping occurs based on the natural ending position after momentum is applied, not a simplistic "wherever it is when the user stops". The fading/scaling happens at a consistent rate, not based on how fast you scroll.</p>
                        </div>
                    </div>
                    <section className="panel red">
                        ONE
                    </section>
                    <section className="panel orange">
                        TWO
                    </section>
                    <section className="panel purple">
                        THREE
                    </section>
                    <section className="panel green">
                        FOUR
                    </section>
                    <section className="panel gray">
                        FIVE
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Anim5