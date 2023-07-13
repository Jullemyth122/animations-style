import React, { useEffect, useRef, useState } from 'react'
import { color_theme } from '@/utilities/theme.js'
import Lenis from '@studio-freight/lenis';
import ThemeWrapper from './Themes/ThemeWrapper';
import gsap from 'gsap'
import EntitleTheme from './Themes/EntitleTheme';
import { firstTextFunctions, GsapTextFunctions, iconsFunction } from '../functionality/TextFunctions';
import Image from 'next/image';


const ThemeMain = () => {
    
    const mainThemeRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const bgRef = useRef(null)
    const circleRef = useRef(null)
    const [start,setStart] = useState(true)
    const [holding,setHolding] = useState("Live")
    const [isAnimating,setIsAnimating] = useState(false)
    const [isClick,setIsClick] = useState(false)
    const [isSpaceBarLocked, setIsSpaceBarLocked] = useState(false);
    const [isThemeSelected, setThemeSelected] = useState(false);
    const [circleLock, setCircleLock] = useState(0);

    useEffect(() => {
        const wrapper = document.querySelectorAll('.themeWrapper')
        const titles = document.querySelectorAll('.themeWrapper .themeTitle')
        const animateTitles = gsap.utils.toArray(titles)

        GsapTextFunctions(animateTitles,false)

        // bgAnimate,circle display none first
        gsap.set([bgRef.current,circleRef.current],{
            visibility: 'hidden',
            opacity: '0',
        })
        
        wrapper.forEach((elem,i) => {
            var titleTexts = titles[i].children
            var icons = elem.querySelector<any>('.intro-theme-icons')
            elem.addEventListener('mouseenter', (e) => {
                firstTextFunctions(titleTexts,true,true)
            })
            
            elem.addEventListener('mouseleave',() => {
                firstTextFunctions(titleTexts,false,true)
            })
            
            elem.addEventListener('click', (e) => {
                firstTextFunctions(titleTexts,false,false)
                iconsFunction(icons,false,false)
            })
        })

    },[isAnimating])


    return (
        <div className='theme'>
            <EntitleTheme start={start} setStart={setStart}/>
            <div className="bgAnimate" ref={bgRef}>
            </div>
            <div className="circle" ref={circleRef}>
                <h3>
                    HOLD
                    <br/>
                    &quot;SPACE&quot; Key
                    <br/>
                    To View {holding}
                </h3>
            </div>
            <div className="liveBackground">
            <Image src="/bg/2.PNG" style={isThemeSelected || start ? {display:'flex'} : {display:"none"}} width={1920} height={1020} alt="Static Background" />
            {/* <Image src="/bg/1.gif" style={isThemeSelected || start ? {display:'none'} : {display:"flex"}}  width={1920} height={1020} alt="Animated Background" /> */}
            </div>
            <section 
                ref={scrollRef}
                data-scroll-container
                id="themes" 
                className={`
                    pageContainer 
                    themesContainer 
                    flex items-center justify-center
                `}
            >
                <div 
                    ref={mainThemeRef}
                    className={`themes gap`}
                >
                    {color_theme.map((theme,i:number) => (
                        <ThemeWrapper
                            circleLock={circleLock}
                            setCircleLock={setCircleLock}
                            isSpaceBarLocked={isSpaceBarLocked}
                            setIsSpaceBarLocked={setIsSpaceBarLocked}
                            isAnimating={isAnimating}
                            setIsAnimating={setIsAnimating}
                            id={i}
                            key={i}
                            theme={theme}
                            bgRef={bgRef}
                            mainThemeRef={mainThemeRef}
                            holding={holding}
                            circleRef={circleRef}
                            setHolding={setHolding}
                            isThemeSelected={isThemeSelected}
                            setThemeSelected={(x:any) => setThemeSelected(x)}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ThemeMain