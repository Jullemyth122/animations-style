import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const ball = useRef({ x: 100, y: 100, direction: 1 }); // the ball's state
    const startTimestamp = useRef(Date.now());

    useEffect(() => {
        const canvas = canvasRef.current;

        // Set the canvas size to match the display size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext('2d');
        const radius = 100; // radius of the ball
        const speed = 2; // speed of the ball


        
        const renderFrame = () => {
        requestRef.current = requestAnimationFrame(renderFrame);
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update the position and direction of the ball
        ball.current.x += speed * ball.current.direction;
        if (
            ball.current.x + radius + speed > canvas.width ||
            ball.current.x - radius - speed < 0
        ) {
            ball.current.direction *= -1; // Reverse the direction
        }

        // Calculate the end angle for the arc, gradually increasing from 0 to 2*Math.PI over 1 second
        const elapsedSeconds = (Date.now() - startTimestamp.current) / 1000; // Convert milliseconds to seconds
        const elapsedSeconds2 = (Date.now() - startTimestamp.current) / 100; // Convert milliseconds to seconds
        // const endAngle = (elapsedSeconds % 1) * 2 * Math.PI; // Cycle every 1 second
        // const endAngle = Math.min(elapsedSeconds, 1) * 2 * Math.PI; // Stop at 2*Math.PI after 1 second
        const angleOffset = Math.min(elapsedSeconds, 1) * Math.PI; // Stop at Math.PI after 1 second
        const angleOffset2 = Math.min(elapsedSeconds2, 1) * Math.PI / 2; // Stop at Math.PI after 1 second

        // Draw the ball
        ctx.beginPath();
        ctx.arc(
            ball.current.x,
            canvas.height / 2,
            // ball.current.y,
            radius,
            Math.PI + angleOffset, // Start angle goes clockwise
            Math.PI - angleOffset, // End angle goes counterclockwise
            true // Set the anticlockwise argument to true
        );
        ctx.strokeStyle = 'green';
        ctx.stroke();
        };

        renderFrame();
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // empty dependencies array means this effect runs once on mount

    return <canvas ref={canvasRef} style={{width:'100%',height:"100vh"}}/>;
};

export default CanvasComponent;
