import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import EntitleTheme from './kazewrappers/EntitleTheme';
const color_theme = [
    {url:"./icons/kaze/shrine (1).png", icons: '/icons/icon2/SHRINE.svg',themeName : "SHRINE", mp4:'/vid/shrine.mp4' },
    {url:"./icons/kaze/lantern festival.png", icons: '/icons/icon2/LANTERN.svg',themeName : "LANTERN FESTIVAL",mp4:'/vid/lantern.mp4' },
    {url:"./icons/kaze/night city (1).png", icons: '/icons/icon2/NIGHTCITY.svg',themeName : "NIGHT CITY",mp4:'/vid/night_city.mp4' },
    {url:"./icons/kaze/hot spring (1).png", icons: '/icons/icon2/HOTSPRING.svg',themeName : "HOT SPRING",mp4:'/vid/hot_spring.mp4' },
    {url:"./icons/kaze/horizon.png", icons: '/icons/icon2/HORIZON.svg',themeName : "HORIZON",mp4:'/vid/horizon.mp4' },
]
let classSlides = ['a1','a2','m','m2','m1']
const Borders = () => {
    

    const [animating,setAnimating] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [initial, setInitial] = useState(null);
    const ctx = useRef(gsap.context(() => {}));
    let anim = useRef()
    let tlRepr = gsap.timeline({ 
        defaults: { duration:1.25, ease:"power2.inOut" },  
    })

    const circleRef = useRef(null);
    const afterRef = useRef(null);
    const textRef = useRef(null);
    const fillTween = useRef();
    const tweenTimeout = useRef(null);
    const tweenContinue = useRef(false);
    const tweenCompleted = useRef(false);
    const keyDown = useRef(false);
    const [textRefHold, setTextRefHold] = useState('Live')

    const handleKeyDown = (event) => {
        if (!tlRepr.isActive()) {
            if (event.key === " " && !keyDown.current) {
                keyDown.current = true;
                console.log("key down", Date.now());
                if (tweenTimeout.current) {
                    tweenTimeout.current.play();
                } else {
                    tweenTimeout.current = gsap.delayedCall(2.5, () => {
                    tweenContinue.current = true;
                    tweenTimeout.current.kill();
                    tweenTimeout.current = null;
                    });
                }
                if (!tweenCompleted.current) {
                    setTextRefHold("Live");
                    fillTween.current.play();
                } else {
                    setTextRefHold("Still");
                    fillTween.current.reverse();
                }
            }
        }
    };

    const handleKeyUp = () => {
        console.log("continue", tweenContinue.current);
        console.log("completed", tweenCompleted.current);
        
        if (!tlRepr.isActive()) {
            keyDown.current = false;
            if (!tweenContinue.current) {
                if (tweenCompleted.current) {
                    fillTween.current.play();
                } else {
                    fillTween.current.reverse();
                }
            }
            tweenTimeout.current && tweenTimeout.current.reverse();
        }
    };

    useEffect(() => {
        const ctx = gsap.context((index) => {
            const tlLayer = gsap.timeline({
                paused:true,
                yoyo:true,
                onComplete: () => {
                    tweenCompleted.current = true;
                    tweenContinue.current = false;
                },
                onReverseComplete: () => {
                    tweenCompleted.current = false;
                    tweenContinue.current = false;
                },
            })
            wrapperSlides.current.forEach((elem,i) => {
                tlLayer.to(elem.querySelector('img'),{
                    opacity:0,
                    duration:3,
                    ease:"none"
                },0)
            })
            fillTween.current = tlLayer.to(afterRef.current, {
                height: "100%",
                duration: 3,
                ease: "none",
            },0)
        });

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            ctx.revert();
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


    const videoRefs = useRef([])
    const bgRef = useRef()
    const mainThemeRef = useRef()
    const themeWrapperRefs = useRef([])
    const wrapperSlides = useRef([])
    const iconRefs = useRef([])

    useEffect(() => {
        import('gsap/Flip').then(({ Flip }) => {
            gsap.registerPlugin(Flip)
            ctx.current.add(() => {
                const tl = gsap.timeline({ defaults: { duration: 3, delay: 1.0 }})
                const delays = [.325, .135, 0, .135, .325]
                wrapperSlides.current.map((elem,idx) => {
                    tl.to(elem,{
                        right: 0,
                        left: 0, 
                        "--m-open": classSlides[idx] == "m" ? "50%" : "0%",
                        "--m1-open": classSlides[idx] == "m1" ? "100%" : "0%",
                        "--m2-open": classSlides[idx] == "m2" ? "100%" : "0%",
                        "--a1-open": classSlides[idx] == "a1" ? "0%" : "100%",
                        "--a2-open": classSlides[idx] == "a2" ? "0%" : "100%",
                        ease:'power2.inOut',
                        delay: delays[idx],
                    },0)
                    .to(elem.querySelector('img'),{
                        scale:1,
                        ease:'power2.inOut',
                        delay: delays[idx]
                    },0)
                })
            })
            
        })
    },[])
    
    useEffect(() => {
        const titles = document.querySelectorAll('.themeTitle')
        const types = new SplitType(titles,{ types:'chars', tagName:'span', charClass:'themeWord' })
    },[])

    const handleMouseOver = (item, index) => {
        if (selectedItem === index || initial !== null) {
            return;
        }
        if (animating) {
            return;
        }
        gsap.to(item.querySelectorAll('.themeWord'), {
            duration: 1.1,
            stagger: 0.0125,
            ease: "power3.inOut",
            translateY: "0%"
        })
    }
    
    const handleMouseLeave = (item, index) => {
        if (selectedItem === index || initial !== null) {
            return;
        }
        if (animating) {
            return;
        }
        gsap.to(item.querySelectorAll('.themeWord'), {
            duration: 1.1,
            stagger: 0.0125,
            ease: "power3.inOut",
            translateY: "100%"
        })
    }
    

    const handleMouseClick = (item, index) => {
        if (selectedItem === index) {
            setTextRefHold('Live')
            fillTween.current.revert()
            ctx.current.animTL(index,null)
        } else {
            setInitial(index)
            ctx.current.animTL(index,'')
            gsap.to(item.querySelectorAll('.themeWord'), {
                duration: 1.1,
                stagger: 0.0125,
                ease: "power3.inOut",
                translateY: "100%"
            });
        }
    }
    
    useEffect(() => {
        ctx.current.add("animTL",(index,status) => {
            if (!tlRepr.isActive()) {
                if (status == null) {
                    tlRepr.clear()
                    // ctx.current.revert()
                    themeWrapperRefs.current.forEach((elem) => {
                        if (!anim.current?.isActive()) {
                            anim.current = gsap.to(elem, {
                                width: "100%",
                                duration: 1.25,
                                ease: "power2.inOut",
                                onComplete:() => {
                                    elem.style.removeProperty('width'); 
                                }
                            });
                        }
                    });
                    tlRepr.to(circleRef.current,{
                        opacity:0,
                        display:'flex',
                        duration:1.25,
                    })
                    tlRepr.to(bgRef.current,{
                        duration:1.0,
                        zIndex:99,
                        opacity:0,
                    },0)
                    tlRepr.to(themeWrapperRefs.current[index].querySelector('.text-slider'),{
                        "--height-slider":'0%',
                        duration:1.25,
                    },0)
                    tlRepr.to(themeWrapperRefs.current[index].querySelector('.text-slider .word'),{
                        transform:'translateX(-100%)',
                        duration:1.25,
                    },0)
                    tlRepr.to(mainThemeRef.current,{
                        width:'96%',
                        gap: '2rem',
                        duration:1,
                        ease:"sine.inOut",
                        onComplete:() => {
                            setSelectedItem(null);
                            videoRefs.current[index].pause()
                            videoRefs.current[index].autoplay = false
                            setInitial(null)
                        
                        }
                    },0)
                } else {
                    themeWrapperRefs.current.forEach((elem, i) => {
                        if (!anim.current?.isActive()) {
                            anim.current = gsap.to(elem, {
                                width: "0%",
                                duration: 1.25,
                                delay:0.25,
                                ease: "power2.inOut",
                            });
                        }
                    });
                    tlRepr.clear()
                    tlRepr.to(themeWrapperRefs.current[index],{
                        width:"100%",
                        duration:1.25,
                        delay:0.25,
                    })
                    tlRepr.to(mainThemeRef.current,{
                        width:'100%',
                        gap: '0rem',
                        duration:1,
                        ease:"sine.inOut",
                    },0)
                    tlRepr.fromTo(themeWrapperRefs.current[index],{
                        "--clip":"0%",
                    },{
                        "--clip":"25%",
                        duration:1.25,
                        ease:"power3.inOut",
                    },0)
                    tlRepr.fromTo(themeWrapperRefs.current[index],{
                        "--clip":"25%"
                    },{
                        "--clip": "0%",
                        duration:1.75,
                        ease:"power3.inOut",
                    },0)
                    tlRepr.fromTo(themeWrapperRefs.current[index],{
                        "--clip-overlay1":"125%"
                    },{
                        "--clip-overlay1":"0%",
                        duration:1.25,
                    })
                    tlRepr.fromTo(themeWrapperRefs.current[index],{
                        "--clip-overlay2":"125%"
                    },{
                        "--clip-overlay2":"0%",
                        duration:1.25,
                    },"-=1.15")
                    tlRepr.fromTo(themeWrapperRefs.current[index].querySelector('.icons'),{
                        opacity:0,
                    },{
                        opacity:1,
                        scale:2,
                        duration:1.5,
                    })
                    tlRepr.to(themeWrapperRefs.current[index].querySelector('.icons'),{
                        opacity:0,
                        scale:1,
                        duration:1,
                        delay:0.35,
                    })
                    tlRepr.to(themeWrapperRefs.current[index],{
                        "--clip-overlay1":"-125%",
                        duration:1.25,
                    })
                    tlRepr.to(themeWrapperRefs.current[index],{
                        "--clip-overlay2":"-125%",
                        duration:1.25,
                    },"-=1.15")
                    tlRepr.to(themeWrapperRefs.current[index].querySelector('.text-slider .word'),{
                        transform:'translateX(0%)',
                        duration:1.25,
                    })
                    tlRepr.to(themeWrapperRefs.current[index].querySelector('.text-slider'),{
                        "--height-slider":'100%',
                        duration:1.25,
                    },"-=0.75")
                    tlRepr.to(circleRef.current,{
                        opacity:1,
                        display:'flex',
                        duration:1.25,
                    })
                    tlRepr.to(bgRef.current,{
                        duration:1.0,
                        zIndex:251,
                        opacity:1,
                        onComplete:() => {
                            videoRefs.current[index].play()
                            videoRefs.current[index].autoplay = true
                            setSelectedItem(index);
                        }
                    },"-=0.5")
                }
            }
        })
        return () => ctx.current.revert();
      }, []);

    return (
        <div className="borders-component">
            <EntitleTheme iconRefs={iconRefs} setAnimating={setAnimating}/>
            <div className="bgAnimate" ref={bgRef}></div>
            <div className="circle" ref={circleRef}>
                <div className="circle-text" ref={textRef}>
                    HOLD
                    <br/>
                    &quot;SPACE&quot; Key
                    <br/>
                    To View {textRefHold}
                </div>
                <div className="after" ref={afterRef}></div>
            </div>
            <div className="pagesContainer">
                <div className="themes gap" ref={mainThemeRef}>
                    {classSlides.map((elem,i) => {
                        return (
                            <div 
                                key={i}
                                // className={`themeWrapper ${elem} ${selectedItem === i && !initial ? "selected" : ""}`}
                                className={`themeWrapper ${elem} ${initial == i ? "selected" : ""}`}
                                onMouseOver={e => handleMouseOver(themeWrapperRefs.current[i],i)}
                                onMouseLeave={e => handleMouseLeave(themeWrapperRefs.current[i],i)}
                                onClick={() => handleMouseClick(themeWrapperRefs.current[i],i)}
                                ref={e => themeWrapperRefs.current[i] = e}
                            >
                                <div className={`themeSlides ${elem}`} ref={e => wrapperSlides.current[i] = e}>
                                    <img src={color_theme[i].url} width={1000} height={1000} alt=''/>
                                    <div className="intro-theme">
                                        <p className="themeTitle">
                                            {color_theme[i].themeName.toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="text-slider">
                                        <h5>
                                            <span className="word">
                                                {color_theme[i].themeName.toUpperCase()}
                                            </span>
                                        </h5>
                                    </div>
                                    <video 
                                        ref={(e) => videoRefs.current.push(e)}
                                        src={color_theme[i].mp4}
                                        className='video-theme'
                                        loop={true}
                                        // autoPlay
                                        muted
                                    ></video>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Borders