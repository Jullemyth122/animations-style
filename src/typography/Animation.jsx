import gsap  from 'gsap'
import { Flip } from 'gsap/all'
import SplitType from 'split-type'
import React, { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(Flip)

const Animation = () => {
    
    const borderRefs = useRef([])
    const rtRef = useRef()
    const rtRef2 = useRef()
    const [allowHovering,setAllowHovering] = useState(false)

    useEffect(() => {
        const ourText = new SplitType('.japanese_words .hashi h1', { types: 'words', tagName:'span' })
        
        const japaneseWords = () => {
            gsap.timeline().to('.japanese_words',{
                display:'grid',
                duration:1,
                ease:"power4.inOut"
            })
            .to('.hashi span',{
                transform:'translateY(0%)',
                duration:2,
                stagger:0.115,
                ease:'power4.inOut'
            })
            .to('.hashi',{
                "--display-line":"100%",
                duration:4,
                stagger:0.115,
                ease:"power4.inOut",
                onComplete:() => {
                    setAllowHovering(true);
                }
            },"-=2")
        }

        const AnimateTextFlip = () => {
            const state = Flip.getState('.rt_1, .rt_2')

            borderRefs.current[0].appendChild(rtRef.current)            
            borderRefs.current[1].appendChild(rtRef2.current)            
            
            Flip.from(state,{
                position:true,
                absolute:true,
                ease:"power4.inOut",
                duration:1,
                onStart:() => {
                    gsap.to('.rt_2',{
                        opacity:1,
                        visibility:'visible',
                        duration:1.5,
                        ease:"power4.inOut"
                    })
                },
                onComplete:() => {
                    gsap.timeline().to('.rt_2',{
                        '--mixItem-dif':'difference',
                        ease:'power4.inOut',
                        duration:4,
                        right:"125%",
                    })
                    .to('.border_item.rt .doubleBox',{
                        scale:1,
                        stagger:0.2375,
                        duration:2,
                    },"-=2.5")
                    .to('.rt_2',{
                        opacity:0,
                        duration:1,
                        ease:'power4.inOut',
                    })
                    .to('.border_item.rt .doubleBox',{
                        scale:0,
                        transform:'rotateY(180deg)',
                        stagger:0.2375,
                        duration:2,
                        ease:"expo.inOut"
                    },"-=0.5")
                    gsap.timeline().to('.rt_1',{
                        '--mixItem-dif':'difference',
                        ease:'power4.inOut',
                        duration:4,
                        left:"125%",
                    })
                    .to('.border_item.lf .doubleBox',{
                        scale:1,
                        stagger:0.2375,
                        duration:2,
                    },"-=2.5")
                    .to('.rt_1',{
                        opacity:0,
                        duration:1,
                        ease:'power4.inOut',
                    })
                    .to('.border_item.lf .doubleBox',{
                        scale:0,
                        transform:'rotateY(180deg)',
                        stagger:0.2375,
                        duration:2,
                        ease:"expo.inOut",
                        onComplete:() => {
                            japaneseWords()
                        }
                    },"-=0.5")
                }
            })
        }

        gsap.to('.rt_1',{
            opacity:1,
            scale:1,
            duration:1.5,
            ease:"expo.inOut",
            onComplete:() => {
                AnimateTextFlip()
            }
        })

    },[])

    useEffect(() => {
        const boxImages = document.querySelectorAll('.hashi')

        if (allowHovering) {
            boxImages.forEach((elem,i) => {
                // console.log(elem)
                elem.addEventListener("mouseleave",(e) => {
                    gsap.to('.hashi .boxImage',{
                        "--clip-image":"100%",
                        duration:1.5,
                        ease:"power4.inOut"
                    })
                })
                elem.addEventListener("mouseenter",(e) => {
                    console.log("hover")
                    gsap.to(elem.querySelector('.boxImage'),{
                        "--clip-image":"0%",
                        duration:1.5,
                        ease:"power4.inOut",
                    })
                })
            })
        }
    },[allowHovering])

    return (
        <div className='animation-component'>
            
            <h1 className='rt_1' ref={rtRef}>
                ASHURA
            </h1>
            <h1 className='rt_2' ref={rtRef2}>
                ASHURA
            </h1>
            <div className="two_items">
                <div className="border_item lf" ref={e => borderRefs.current.push(e)}>
                    <div className="doubleBox"></div>
                    <div className="doubleBox"></div>
                    <div className="doubleBox"></div>
                </div>
                <div className="border_item rt" ref={e => borderRefs.current.push(e)}>
                    <div className="doubleBox"></div>
                    <div className="doubleBox"></div>
                    <div className="doubleBox"></div>
                </div>
            </div>

            <div className="japanese_words">
                <div className="hashi">
                    <h1>金木犀</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>走馬灯</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>またね</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>さよならの支度</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>アキレア</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>風を食む</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>好きだから</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>平行線 </h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>会場</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
                <div className="hashi">
                    <h1>日時</h1>
                    <div className="boxImage">
                        <img src="./hololive/zerotwo.png" alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Animation