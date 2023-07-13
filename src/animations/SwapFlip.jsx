import { gsap } from 'gsap'
import { Flip } from 'gsap/all'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(Flip)
const SwapFlip = () => {

    const ctx = useRef(gsap.context(() => {}))
    const swapRefState = useRef()

    const [state,setState] = useState(false)
    const childRef = useRef()
    const childRef2 = useRef()
    const childRef3 = useRef()
    const childRef4 = useRef()

    useEffect(() => {

    },[])

    const handleSwap = () => {
        swapRefState.current = Flip.getState([childRef.current,childRef2.current,childRef3.current,childRef4.current])
        setState(!state)
    }

    useLayoutEffect(() => {
        if (!swapRefState.current) return;
        Flip.from(swapRefState.current,{
            duration:1,
            targets:[childRef.current,childRef2.current,childRef3.current,childRef4.current]
        })

    },[state])

    return (
        <div className='swap-flip'>
            <div className="button-swap" onClick={handleSwap}>
                <h3>
                    SWAP
                </h3>
            </div>

            <div className="wrapper">
                <div className="box">
                    <div className="top-side">
                        {state && 
                            <div className="insider" data-flip-id="test2" ref={childRef2}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                        {!state && 
                            <div className="insider" data-flip-id="test3" ref={childRef3}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                    </div>
                    <div className="bot-side">
                        {state && 
                            <div className="insider" data-flip-id="test1" ref={childRef}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                        {!state && 
                            <div className="insider" data-flip-id="test4" ref={childRef4}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                    </div>
                </div>
                <div className="box">
                    <div className="top-side">
                        {!state && 
                            <div className="insider" data-flip-id="test2" ref={childRef2}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                        {state && 
                            <div className="insider" data-flip-id="test3" ref={childRef3}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                    </div>
                    <div className="bot-side">
                        {!state && 
                        <div className="insider" data-flip-id="test1" ref={childRef}>
                            <img src="./aesthetic/sky.jpg" alt="" />
                        </div>
                        }
                        {state && 
                            <div className="insider" data-flip-id="test4" ref={childRef4}>
                                <img src="./aesthetic/sky.jpg" alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwapFlip