import { gsap } from 'gsap';
import { Flip, Observer, ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react'


gsap.registerPlugin(Flip,ScrollTrigger)
const Opening = () => {

    const statusMainRef = useRef()
    const slideWrapperRef = useRef()
    const [status,setStatus] = useState(false)
    const ctx = useRef(gsap.context(() => {}))
    function generateRandomLetter(index) {
        var letters = '1234567890123456789012345';
        // var randomIndex = Math.floor(Math.random() * letters.length);
        // return letters.charAt(randomIndex);
        return letters[index];
    }
      
    const [text,setText] = useState("A")
    useEffect(() => {
        let lastUpdate = 0
        ctx.current.add(() => {
            const anim = gsap.to(text,{
                duration:2,
                ease:"expo.inOut",
                onUpdate:(self) => {
                    const currentProgress = Math.floor(anim.progress() * 25);
                    if ( currentProgress == 25) {
                        setText("100%") 
                    }
                    else if (currentProgress > lastUpdate) {
                        lastUpdate = currentProgress;
                        // Generate a random letter and set it
                        // setText(generateRandomLetter(currentProgress) + "%") 
                        setText( Math.floor(anim.progress() * 100) + "%") 
                    }
                }
            })
            gsap.set(slideWrapperRef.current.querySelectorAll('.item-case'),{
                "--clip-case":"0%",
            })
        })
    },[])

    const FlipAnim = () => {
        setStatus(true)
        const state = Flip.getState('.other-text')
        const logoItem = document.querySelector('.logo-item')
        logoItem.appendChild(statusMainRef.current.querySelector('.other-text'))
        Flip.from(state,{
            scale:true,
            absolute:true,
            ease:'power2.inOut',
            duration:2
        })
    }

    useEffect(() => {
        if (text == "100%") {
            const line = gsap.to('.text-line',{
                width:'100px',
                duration:2,
                ease:'expo.inOut',
                onReverseComplete:() => {
                    FlipAnim()
                }
            })
            const textAnim = gsap.fromTo(".other-text",{
                width:"0%",
            },{
                width:"auto",
                duration:2,
                ease:"expo.inOut"
            })
            const textAnim2 = gsap.fromTo('.other-text h1',{
                transform:"translateX(-100%)",
            },{
                transform:"translateX(0%)",
                duration:2,
                delay:0.5,
                ease:"expo.inOut",
                onComplete:() => {
                    gsap.to('.warp-text',{width:'0%',duration:1,ease:'power2.inOut'})
                    line.reverse()
                    // textAnim2.reverse().then(() => FlipAnim)
                }
            })
        }
    },[text])

    useEffect(() => {
        console.log(status)
        if (status) {
            ctx.current.add(() => {
                console.log(slideWrapperRef.current.querySelectorAll('.item-case'))
                const anim = gsap.fromTo(slideWrapperRef.current,{
                    // width:'100%',
                    xPercent:-400/5,
                },{
                    xPercent:0,
                    // width:"400%",
                    duration:4.5,
                    ease:"power2.inOut"
                })
                gsap.to(slideWrapperRef.current.querySelectorAll('.item-case'),{
                    "--clip-case":"100%",
                    stagger:{
                        each:0.5,
                        from:'end'
                    },
                    duration:3,
                    ease:'power2.inOut'
                })


                const tl = gsap.timeline({
                    paused: true
                });
                
                let progress = 0;
                
                let observe = Observer.create({
                    tolerance: 10,
                    preventDefault: true,
                    type: "wheel,touch,pointer,scroll",
                    onChange: (self) => {
                        if (!(progress <= 0 && self.deltaY < 0) && !(progress >= 1 && self.deltaY > 0)) progress += self.deltaY / 25000;
                        progress = gsap.utils.clamp(0, 1, progress);
                        gsap.to(tl, {overwrite: 'auto',progress:progress,ease:'none' });
                    }
                });
                observe.disable()

                if (!anim.isActive()) {
                    observe.enable()
                }

                tl.to(slideWrapperRef.current,{
                    xPercent:-400/5,
                    ease: "none"
                })
                slideWrapperRef.current.querySelectorAll('img').forEach((elem,i) => {
                    tl.to(elem,{
                        transform:`translateX(-${(5 - i) * 10}%)`,
                        ease: "none"

                    },0)
                })


                

            })
        }
    },[status])

    return (
        <div className='opening-comp'>
            <div className="logo-item">

            </div>
            <div className="status-main" ref={statusMainRef}>
                <h1 className='warp-text'>
                    {/* ORBITRON FONT */}
                    {text}
                </h1>
                <div className="text-line"></div>
                <div className="other-text">
                    <h1>
                        ORBITRON
                    </h1>
                </div>
            </div>
            <div className="wrapper">
                <div className="slideWrapper" ref={slideWrapperRef}>
                    <div className="item-case"><img src="./transformer/prime.jpg" alt="" /></div>
                    <div className="item-case"><img src="./transformer/bumblebee.jpg" alt="" /></div>
                    <div className="item-case"><img src="./transformer/ironhide.jpg" alt="" /></div>
                    <div className="item-case"><img src="./transformer/megatron.jpg" alt="" /></div>
                    <div className="item-case"><img src="./transformer/starscream.jpg" alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default Opening