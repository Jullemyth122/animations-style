import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/all'
import SplitType from 'split-type'
import imagesloaded from 'imagesloaded'

gsap.registerPlugin(Flip)
const LoadingText = () => {

    const [loading, setLoading] = useState(true)
    const centerRef = useRef()
    const wordsRef = useRef([])
    
    const flipKaze = () => {
        const state = Flip.getState('.nav-init .top, .nav-init .bottom',{ props:'color' })
        
        wordsRef.current.map((elem) => {
            centerRef.current.appendChild(elem)
        })

        Flip.from(state,{
            duration: 2,
            absolute:true,
            position:true,
            ease: "expo.inOut",
        })

    }

    useEffect(() => {
        
        const imageLoad = imagesloaded(document.querySelector('body')); // replace 'body' with a selector for your image container
        
        imageLoad.on('progress', function(instance, image) {
            setLoading(true) // one second per image
        });
        
        const ourText = new SplitType('.loading_shown .shift', { types: 'chars', tagName:'span' })
        const ourText2 = new SplitType('.loading_shown .overlay', { types: 'chars', tagName:'span' })
        const ourText3 = new SplitType('.nav-init .line-text h1', { types: 'words', tagName:'span', wordClass:'time' })
        const chars = ourText.chars
        
        
        const loadingTransition = () => {
            chars.forEach((elem,i) => {
                if (i % 2 == 0) {
                gsap.fromTo(elem,{
                    visibility:'hidden',
                    opacity:0,
                    transform:'translateY(100%)'
                },{
                    visibility:'visible',
                    opacity:1,
                    transform:'translateY(0%)',
                    duration:2,
                    ease:'power4.inOut'
                })
                } else {
                gsap.fromTo(elem,{
                    visibility:'hidden',
                    opacity:0,
                    transform:'translateY(-100%)'
                },{
                    visibility:'visible',
                    opacity:1,
                    transform:'translateY(0%)',
                    duration:2,
                    ease:'power4.inOut'
                })
                }
            })
        }

        const tl = gsap.timeline({})
        const tl2 = gsap.timeline({})

        tl.to('.nav-init .top .word',{
            transform:'translateY(0%)',
            visibility:'visible',
            opacity:1,
            duration:1.5,
            ease:'sin.inOut'
        })
        .to('.nav-init .line',{
            "--clip-path":"100%",
            duration:1.5,
            ease:'expo.inOut',
        },"-=0.2")
        .to('.nav-init .bottom .word',{
            transform:'translateY(0%)',
            visibility:'visible',
            opacity:1,
            duration:1,
            ease:'sin.inOut',
            onComplete:() => {
                loadingTransition()
            }
        })
        if (loading) {
            tl.to('.loading_shown .overlay',{
                "--clip-path":"0%",
                duration:10, // use calculated load time
                ease:"sin.inOut",
                delay:2,
                onStart:() => {
                    gsap.to('.KA_side .line-text.tf span',{
                        transform:'translateY(-100%)',
                        duration:3.5,
                        stagger:0.375,
                        opacity:1,
                        visibility:'visible',
                        ease:'sin.inOut'
                    })
                    gsap.to('.ZE_side .line-text.tf span',{
                        transform:'translateY(-100%)',
                        duration:3.5,
                        stagger:0.375,
                        opacity:1,
                        visibility:'visible',
                        ease:'sin.inOut'
                    })
                    gsap.to('.KA_side .line-text.rt span',{
                        transform:'translateY(-100%)',
                        duration:3.5,
                        stagger:0.375,
                        delay:3.5,
                        opacity:1,
                        visibility:'visible',
                        ease:'sin.inOut'
                    })
                    gsap.to('.ZE_side .line-text.rt span',{
                        transform:'translateY(-100%)',
                        duration:3.5,
                        stagger:0.375,
                        delay:3.5,
                        opacity:1,
                        visibility:'visible',
                        ease:'sin.inOut'
                    })
                }
            })
            tl.to('.loading_shown .overlay span, .loading_shown .shift span',{
                letterSpacing:"5vw",
                opacity:0,
                duration:2,
                ease:'sin.inOut',
                onComplete:() => {
                    tl.to('.nav-init .line',{
                        "--clip-path":"0%",
                        duration:1.5,
                        ease:'expo.inOut',
                    },"-=0.2")
                    flipKaze()
                }
            },"-=1")
        }
    },[loading])

    return (
        <div className='loading-component'>
            <div className="navbar-component"></div>
            <div className="center-component" ref={centerRef}>

            </div>
            <div className="KA_side nav-init">
                <h1 className='top' ref={e => wordsRef.current.push(e)}>
                    <span className="word">
                        K
                    </span>
                </h1>
                <div className="line-text tf">
                    <div>
                        <h1>
                            1
                        </h1>
                    </div>
                    <div>
                        <h1>
                            2
                        </h1>
                    </div>
                    <div>
                        <h1>
                            3
                        </h1>
                    </div>
                    <div>
                        <h1>
                            4
                        </h1>
                    </div>
                    <div>
                        <h1>
                            5
                        </h1>
                    </div>
                </div>
                <div className="line-text rt">
                    <div>
                        <h1>
                            6
                        </h1>
                    </div>
                    <div>
                        <h1>
                            7
                        </h1>
                    </div>
                    <div>
                        <h1>
                            8
                        </h1>
                    </div>
                    <div>
                        <h1>
                            9
                        </h1>
                    </div>
                    <div>
                        <h1>
                            10
                        </h1>
                    </div>
                </div>
                <span className="line"></span>
                <h1 className='bottom' ref={e => wordsRef.current.push(e)}>
                    <span className="word">
                        A
                    </span>
                </h1>
            </div>
            <div className="ZE_side nav-init">
                <h1 className='top' ref={e => wordsRef.current.push(e)}>
                    <span className="word">
                        Z
                    </span>
                </h1>
                <div className="line-text tf">
                    <div>
                        <h1>
                            1
                        </h1>
                    </div>
                    <div>
                        <h1>
                            2
                        </h1>
                    </div>
                    <div>
                        <h1>
                            3
                        </h1>
                    </div>
                    <div>
                        <h1>
                            4
                        </h1>
                    </div>
                    <div>
                        <h1>
                            5
                        </h1>
                    </div>
                </div>
                <div className="line-text rt">
                    <div>
                        <h1>
                            6
                        </h1>
                    </div>
                    <div>
                        <h1>
                            7
                        </h1>
                    </div>
                    <div>
                        <h1>
                            8
                        </h1>
                    </div>
                    <div>
                        <h1>
                            9
                        </h1>
                    </div>
                    <div>
                        <h1>
                            10
                        </h1>
                    </div>
                </div>
                <span className="line"></span>
                <h1 className='bottom' ref={e => wordsRef.current.push(e)}>
                    <span className="word">
                        E
                    </span>
                </h1>
            </div>
            <div className="loading_shown">
                <h1 className='overlay'>
                    LOADING
                </h1>
                <h1 className='shift'>
                    LOADING
                </h1>
            </div>
        </div>
    )
}

export default LoadingText