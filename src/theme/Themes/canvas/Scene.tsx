import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { CircleProps } from '@/props/GlobalProps'

function Planes({ img, ...props } : CircleProps) { 
    const planeRef = useRef<any>(null); 
    useFrame((state, delta) => { 
        const time = state.clock.getElapsedTime();// get the elapsed time 
        if (planeRef.current.material.uniforms.u_time.value >= 6.0) { 
            planeRef.current.material.uniforms.u_time.value = planeRef.current.material.uniforms.u_time.value;
        } else { planeRef.current.material.uniforms.u_time.value += time / 1000; } 
        planeRef.current.material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight); 
    }); 
    useEffect(() => { 
        function onMouseMove(event:MouseEvent) { 
            const { clientX, clientY } = event; 
            const x = (clientX / window.innerWidth) * 2 - 1; 
            const y = -(clientY / window.innerHeight) * 2 + 1; 
            planeRef.current.material.uniforms.u_mouse.value.set(x, y); 
        } 
        window.addEventListener("mousemove", onMouseMove); 
        return () => window.removeEventListener("mousemove", onMouseMove); 
    }, []); 
    const texture = useTexture(img); 
    return ( 
        <> 
            <mesh ref={planeRef} {...props}> 
            <planeBufferGeometry args={[2,1]}/> 
            <shaderMaterial 
                uniforms={{ 
                    u_tex0: { value: texture }, 
                    u_time: { value: 1.0 }, 
                    u_resolution: { value: new THREE.Vector2() }, 
                    u_mouse: { value: new THREE.Vector2() }, }
                } 
                vertexShader={`
                    varying vec2 vUv; 
                    void main() { 
                        vUv = uv; 
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); 
                    } 
                    `
                } 
                fragmentShader={` 
                    uniform sampler2D u_tex0; 
                    uniform float u_time; 
                    uniform vec2 u_resolution; 
                    varying vec2 vUv; 
                    #define PI 3.14159265358979323846 
                    float pixelPattern(float x, float frequency, float speed, float time) { 
                        return sin((x * frequency - time * speed) * 2.0 * PI); 
                    } 
                    void main() { 
                        vec2 st = vUv; 
                        vec4 original_img = texture2D(u_tex0, st); 
                        float grayscale_value = dot(original_img.rgb, vec3(0.299, 0.587, 0.114)); 
                        vec4 grayscale_img = vec4(vec3(grayscale_value), 1.0); 
                        float transitionSpeed = 1.0; 
                        float transition = st.x * 6.0 - u_time * transitionSpeed; 
                        float pixelSize = 0.005; 
                        vec2 pixelUV = vec2(floor(st.x / pixelSize) * pixelSize, floor(st.y / st.x / pixelSize * 2.0) * pixelSize); 
                        float pixelDistortion = pixelPattern(pixelUV.y / pixelUV.x, 5.0, 0.001, u_time); 
                        vec2 distortedUV = vec2(st.x, st.y + pixelDistortion * smoothstep(0.0, 1.0, transition)); 
                        vec4 distortedImg = texture2D(u_tex0, distortedUV); 
                        vec3 final_color = mix(distortedImg.rgb, grayscale_img.rgb, smoothstep(0.0, 1.0, transition)); 
                        gl_FragColor = vec4(final_color, 1.0); } 
                    `
                } 
            /> 
            </mesh> 
        </> 
    ); 
} 

const Scene = ({...props}:CircleProps) => {
    return (
        <>
            <Planes {...props} />
        </>
    )
}

export default Scene