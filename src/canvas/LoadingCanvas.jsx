const CanvasLoading: React.FC<{ onComplete: () => void }> = ({
    onComplete,
}) => {
    const canvasRef = useRef<any>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
    
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const fontSize = 150;
        const rhombusSize = 800;
        let angle = 0;
        let xPos = -rhombusSize;
        let text = "L O A D I N G";
        let counter = 0;
    
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    
        const startTime = performance.now();
        const textDuration = 5000; // 5 seconds for each animation
        const scaleDuration = 2000; // 2 seconds for scaling
    
        function draw(currentTime: number) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            const elapsedTime = currentTime - startTime;
            const textProgress = Math.min((elapsedTime % textDuration) / textDuration, 1);
    
            if (elapsedTime < textDuration * 2) {
                angle = 0.05 * textProgress * 200;
                xPos = -rhombusSize + textProgress * (canvas.width + rhombusSize * 2);
    
                if (xPos >= canvas.width) {
                    counter++;
                    xPos = -rhombusSize;
                }
    
                if (counter === 1) {
                    text = "K A Z E";
                }
            } else {
                const scaleProgress = Math.min((elapsedTime - textDuration * 2) / scaleDuration, 1);
                const scaleFactor = 1 + scaleProgress * (Math.max(canvas.width, canvas.height) / rhombusSize - 1);
                ctx.save();
                ctx.translate(xPos + rhombusSize / 2, canvas.height / 2);
                ctx.scale(scaleFactor, scaleFactor);
                ctx.translate(-xPos - rhombusSize / 2, -canvas.height / 2);
            }
    
            ctx.save();
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "white";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            ctx.restore();
    
            ctx.save();
            ctx.globalCompositeOperation = "destination-in";
            ctx.translate(xPos, canvas.height / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -rhombusSize / 2);
            ctx.lineTo(rhombusSize / 2, 0);
            ctx.lineTo(0, rhombusSize / 2);
            ctx.lineTo(-rhombusSize / 2, 0);
            ctx.closePath();
    
            const gradient = ctx.createLinearGradient(
                -rhombusSize / 2,
                0,
                rhombusSize / 2,
                0
            );
    
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 1)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = gradient;
            ctx.fill();
    
            ctx.restore();
    
            if (elapsedTime >= textDuration * 2 + scaleDuration) {
                onComplete();
                return; // Stop the animation after both texts have been displayed and scaling is done
            }
    
            requestAnimationFrame(draw);
        }
    
        requestAnimationFrame(draw);
    }, []);
    
    

    return <canvas ref={canvasRef}></canvas>;
};