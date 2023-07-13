import gsap from 'gsap';
import { Flip } from 'gsap/all';
import React, { useEffect } from 'react'

gsap.registerPlugin(Flip);
const DashingText = () => {

    useEffect(() => {

        const outerContainer = document.querySelector("#outer-container"),
            containers = gsap.utils.toArray(".flex-container"),
            movingContent = gsap.utils.toArray(".inner-container, .inner-container > *");
        
        function switchLayout(newLayout) {
            const state = Flip.getState(movingContent);
            
            newLayout === "column" ? outerContainer.classList.add("column") : outerContainer.classList.remove("column");
            
            containers.forEach(container => container.classList.toggle("reverse"));
            
            Flip.from(state, { 
                absolute: true, // flips to position: absolute during the animation to work around flexbox challenges
                nested: true,
                duration: 1,
                ease: "power1.inOut"
            });
          
        };
        
        document.getElementById("column-btn").addEventListener("click", () => switchLayout("column"));
        document.getElementById("row-btn").addEventListener("click", () => switchLayout("row"));        
    },[])

    return (
        <div className='dashtext-component'>
            <div className="buttons-container">
                <button id="column-btn"> switch column order</button>
                <button id="row-btn">switch row order</button>
            </div>

            <div id="outer-container" className="flex-container">
                <div id="inner-container1" className="inner-container flex-container column">
                    <p className="item item1">
                        The Flip plugin lets you seamlessly transition between two states even if there are sweeping changes to the structure of the DOM like re-parenting of elements which would normally cause them to jump to a new position/size. Maybe it's a thumbnail image that should transition to fill the screen, or a grid of elements that get filtered and the remaining elements smoothly move to their new positions rather than suddenly jumping there. It makes complex UI transitions remarkably straightforward.    
                    </p>
                    <div className="item item2">
                        <img src="./hololive/shiori.jpg" alt="" />
                    </div>
                </div>

                <div id="inner-container2" className="inner-container flex-container column">
                    <div className="item item3">
                        <img src="./hololive/violet.jpg" alt="" />
                    </div>
                    <p className="item item4">Now go "flip out" and have some fun with the new plugin.</p>
                </div>
            </div>

            {/* <div className="inner-inner-container">
                <div id="outer-bounce" className="inner-bounce">
                    <p>
                        CLASSIC DESIGN 1
                    </p>
                    <h1>
                        Classic Design 2
                    </h1>
                </div>
                <div id='outer-bounce' className="inner-bounce">
                    <p>
                        CLASSIC DESIGN 3
                    </p>
                    <h1>
                        Classic Design 4
                    </h1>
                </div>
            </div> */}


        </div>
    )
}

export default DashingText