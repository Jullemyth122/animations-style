import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Flip } from 'gsap/all';
import SplitType from 'split-type'

gsap.registerPlugin(Flip)

const PassFlips = () => {

    const itemRefs = useRef([])
    const bigWrapperRef = useRef()

    useEffect(() => {
        const bottom = document.querySelector('.sliders-bottom-wrapper')
        // Function to handle window resize events
        const handleResize = () => {

            const Rebounce = () => {
                const state = Flip.getState('.sliders-small, .sliders-bottom-wrapper',{props:'clipPath' })
                
                itemRefs.current.forEach((elem,i) => {
                    bottom.appendChild(elem)    
                })

                Flip.from(state,{
                    zIndex:100,
                    position:true,
                    absolute:true,
                    stagger:0.1,
                    duration:2,
                    ease:'power4.inOut',
                    "--small-bottom":"100%",
                })
            }

            // Function to handle the Flip animation
            const FlipSliders = (wrapper) => { 
                const state = Flip.getState('.sliders-small',{ props: 'clipPath' })

                itemRefs.current.forEach((elem,i) => {
                    wrapper.appendChild(elem)    
                })

                Flip.from(state,{
                    zIndex:100,
                    position:true,
                    absolute:true,
                    stagger:0.1,
                    duration:2,
                    "--small-bottom":"100%",
                    ease:'power4.inOut',
                    onComplete:() => {
                        gsap.to('.sliders-small',{
                            "--small-top":"100%",
                            stagger:0.1,
                            duration:2,
                            ease:'power4.inOut',
                            onComplete:() => {
                                Rebounce()
                            }
                        })
                    }
                })
            }

            // Create GSAP timeline
            const tl = gsap.timeline()

            tl.to('.sliders-small',{
                "--clip-overlay":"0%",
                duration:2.5,
                stagger:0.165,
                ease:"power4.inOut"
            })
            .to('.sliders-small',{
                "--clip-border":"25%",
                duration:1,
                stagger:0.1,
                ease:"power4.inOut"
            },"-=1")
            .to('.sliders-small',{
                "--clip-bottom":"100%",
                duration:1,
                stagger:0.1,
                ease:"power4.inOut",
                onComplete:() => {
                    FlipSliders(bigWrapperRef.current)
                }
            })

            // Restart the animation
            tl.restart()
        }

        // Add event listener for window resize events
        window.addEventListener('resize', handleResize)

        // Call handleResize function initially to start the animation
        handleResize()

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    return (
        <div className='passflips-component'>
            <div className="sliders-small-wrapper top">
                <div className="sliders-small" ref={e => itemRefs.current.push(e)}>
                    <img src="./img/garou3.png" alt="" />
                </div>
                <div className="sliders-small" ref={e => itemRefs.current.push(e)}>
                    <img src="./img/genos.png" alt="" />
                </div>
                <div className="sliders-small" ref={e => itemRefs.current.push(e)}>
                    <img src="./img/orochi.jpg" alt="" />
                </div>
                <div className="sliders-small" ref={e => itemRefs.current.push(e)}>
                    <img src="./img/saitama.png" alt="" />
                </div>
            </div>
            <div className="sliders-big-wrapper" ref={bigWrapperRef}>

            </div>
            <div className="sliders-bottom-wrapper">
                
            </div>

        </div>
    )
}

export default PassFlips
