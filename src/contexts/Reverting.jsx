import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const shapes = ["circle","box","rect","bino","leaf"]

const Reverting = () => {

    const ctx = useRef(gsap.context(() => {}) )
    const shapeRefs = useRef([])
    let tl = gsap.timeline()
    let anim = useRef()
    let itemBoolean = useRef(null)

    const [selectedItem,setSelectedItem] = useState(null)
    
    const handleAnimate = (index) => {
        ctx.current.animating(index)
    }
    
    const handleClick = (items,item,index) => {
        if (selectedItem === index) {
            ctx.current.animating(index,null)
        } else {
            ctx.current.animating(index,'')
        }
    }

    const handleRevert = () => {

    }
    
    useEffect(() => {
        ctx.current.add("animating",(index,status) => {
            if (!tl.isActive()) {
                shapeRefs.current.map((elem,i) => {
                    if (!anim.current?.isActive()) {
                        anim.current = gsap.fromTo(elem,{
                            rotate:0,
                        },{
                            rotate:360,
                            scale: 1,
                            duration:3,
                            ease:'power2.inOut'
                        })
                    }                    
                })
                tl.clear()
                tl.fromTo(shapeRefs.current[index],{
                    rotate: status == null ? 0 : 360,
                },{
                    rotate: status == null ? 360 : 0,
                    duration:3,
                    ease:'power2.inOut'
                })
                .fromTo(shapeRefs.current[index],{
                    scale: status == null ? 2 : 1,
                },{
                    scale: status == null ? 1 : 2,
                    duration:3,
                    ease:'power2.inOut',
                    onComplete:() => {
                        if (status === null) {
                            setSelectedItem(null)
                        } else {
                            setSelectedItem(index)
                        }
                    }
                },"-=3")
            }
        })
    },[])

    return (
        <div className='reverting-component'>
            {shapes.map((elem,i) => {
                return (
                    <div className={`${elem} ${selectedItem === i ? "selected" : ""}`} key={i} 
                        ref={e => shapeRefs.current[i] = e}
                        onClick={ e => handleClick(shapeRefs.current,shapeRefs.current[i],i)}
                    ></div>
                )
            })}
            <button onClick={e => 
                null
            // handleAnimate(null)
            }>
                Start Animation
            </button>
            <button onClick={handleRevert} className='revert'>
                Start Animation
            </button>
        </div>
    )
}

export default Reverting