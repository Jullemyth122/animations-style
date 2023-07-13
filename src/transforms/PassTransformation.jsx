import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Flip } from 'gsap/all';

const PassTransformation = () => {

    const boxRef = useRef()
    const parentContainer = useRef()
    const parentBoxes = useRef([])
    let index = 0; // Moved index to the component scope
    let animationInProgress = false; // Flag to indicate if an animation cycle is in progress

    useEffect(() => {
        gsap.registerPlugin(Flip);
        const enlarger = ['enlarge1','enlarge2','enlarge3']
        
        const handleClick = () => {
            if (animationInProgress) {
                // If an animation cycle is already in progress, do nothing
                return;
            }
            animationInProgress = true;
            animateBox();
        }

        const animateBox = () => {
            const state = Flip.getState([boxRef.current,parentContainer.current,".boxLayers"],{props: "backgroundColor, opacity"});
            if(index < parentBoxes.current.length) {
                parentBoxes.current[index].appendChild(boxRef.current);
                boxRef.current.classList.remove('small');
                boxRef.current.classList.add(`${enlarger[index]}`);
                if(index > 0){
                    boxRef.current.classList.remove(`${enlarger[index-1]}`);
                }
            } else {
                parentContainer.current.prepend(boxRef.current);
                boxRef.current.classList.add('small');
                boxRef.current.classList.remove(`${enlarger[parentBoxes.current.length-1]}`);
            }
            
            // parentBoxes.current[index].appendChild(boxRef.current);
            
            Flip.from(state, {
                duration: 1,
                scale: true,
                absolute:true,
                position:true,
                ease: "scale.inOut",
                onComplete: () => {
                    index = (index + 1) % (parentBoxes.current.length + 1); // Loop index when it reaches the end
                    if (index === 0) {
                        animationInProgress = false;
                    } else {
                        // Otherwise, start the next animation
                        animateBox();
                    }
                } 
            });
        }

        boxRef.current.addEventListener("click", handleClick)

        // Cleanup on unmount
        return () => {
            // document.querySelector('.box').removeEventListener
            boxRef.current.removeEventListener("click", handleClick);
        }
    }, [])

    return (
        <div className='transform-component' ref={parentContainer}>
            <div className="box" ref={boxRef}> Amplification </div>
    
            <div className="boxLayers">
                <div className="boxParent l1" ref={e => parentBoxes.current.push(e)}></div>
                <div className="boxParent l2" ref={e => parentBoxes.current.push(e)}></div>
                <div className="boxParent l3" ref={e => parentBoxes.current.push(e)}></div>
            </div>
        </div>
    )
}

export default PassTransformation
