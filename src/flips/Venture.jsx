import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Flip } from 'gsap/all';
import SplitType from 'split-type'

gsap.registerPlugin(Flip)

const Venture = () => {
    
    useEffect(() => {
        const tl = gsap.timeline()
        const layer = document.querySelector('.text-layer')
        const l2 = document.querySelector('.l2')
        const l1 = document.querySelector('.l1')
        const flipText = () => {
            const state = Flip.getState('.l1, .l2',{ props: "opacity" })
            
            l2.classList.add('show')        
            l1.classList.add('show')        
            layer.appendChild(l2)

            Flip.from(state,{
                position:true,
                absolute:true,
                ease:"power4.inOut",
                duration:1,
                onStart:() => {
                    gsap.to('.l2',{
                        "--show-text":"100%",
                        ease:"power4.inOut",
                        duration:1,
                        delay:0.25,
                        onComplete:() => {
                            gsap.to('.shift',{
                                "--shift-poly":"42.5%",
                                duration:2,
                                ease:"power4.inOut",
                            })
                        }
                    })
                }
            })
        }

        tl.fromTo('.l1',{
            opacity:0,
            rotate:0,
            // scale:0
        },{
            rotate:360,
            opacity:1,
            duration:1.5,
            scale:2,
            ease:"power4.inOut"
        })
        .to('.l1',{
            scale:1,
            duration:1,
            ease:"power4.inOut",
            onComplete:() => {
                flipText()
            }
        },"-=0.75")
    },[])

    return (
        <div className='venture-component'>
            <div className="sub-components">
                <div className="text-layer">
                    <h1 className='l1'> 
                        <span className="overlay">
                            V
                        </span>
                        <span className="shift">
                            V
                        </span>
                    </h1>
                </div>
                <h1 className='l2'>
                    ENTURE
                </h1>
            </div>
        </div>
    )
}

export default Venture