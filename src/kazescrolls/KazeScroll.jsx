import { gsap } from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import React, { useEffect } from 'react'

const KazeScroll = () => {

    useEffect(() => {
        gsap.registerPlugin(Flip,ScrollTrigger)
        


    },[])

    return (
        <div className='kaze-scroll'>
            
        </div>
    )
}

export default KazeScroll