import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/all';


const Sliders = () => {
  const layouts = ["final", "plain", "columns", "grid"];
  const [curLayout, setCurLayout] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(Flip);

    let layouts = ["final", "plain", "columns", "grid"],
            container = document.querySelector(".container"),
            curLayout = 0; // index of the current layout
    
    function nextState() {
      const state = Flip.getState(
        ".letter, .for, .gsap", {
        props: "color,backgroundColor", simple: true
      }); // capture current state
      
      container.classList.remove(layouts[curLayout]); // remove old class
      curLayout = (curLayout + 1) % layouts.length;   // increment (loop back to the start if at the end)
      container.classList.add(layouts[curLayout]);    // add the new class
    
      Flip.from(state, { // animate from the previous state
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: curLayout === 0, // only spin when going to the "final" layout
        simple: true,
        onEnter: (elements, animation) => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
        onLeave: elements => gsap.to(elements, {opacity: 0})
      });
    
      gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
    }
    
    gsap.delayedCall(1, nextState);
  }, []);

  return (
    <div className='slider-transform_comp'>
      <div className="container final">
        <div className="letter F">F</div>
        <div className="letter l">l</div>
        <div className="letter i">i</div>
        <div className="letter p">p</div>
        <div className="for">for</div>
        <div className="gsap">GSAP</div>
      </div>
    </div>
  )
}

export default Sliders;
