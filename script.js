// script.js

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('wave-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    
    // Wave configuration (matching the cyan aesthetic of the video)
    const waves = [
        { yOffset: 0.6, amplitude: 20, frequency: 0.005, speed: 0.015, color: 'rgba(0, 229, 255, 0.3)', lineWidth: 2 },
        { yOffset: 0.7, amplitude: 35, frequency: 0.008, speed: 0.02, color: 'rgba(0, 229, 255, 0.5)', lineWidth: 2.5 },
        { yOffset: 0.85, amplitude: 50, frequency: 0.004, speed: 0.01, color: 'rgba(0, 229, 255, 1)', lineWidth: 3 }
    ];

    let phase = 0;

    function resize() {
        // High-DPI screen fix for crisp canvas rendering
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight * 0.4; // 40vh
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = wave.lineWidth;
            
            // Draw the sine wave points
            for (let x = 0; x <= width; x += 2) {
                // Combine standard sine with a slight secondary sine for more organic ocean movement
                let y = (height * wave.yOffset) 
                      + Math.sin(x * wave.frequency + phase * wave.speed) * wave.amplitude 
                      + Math.sin(x * wave.frequency * 0.5 + phase * (wave.speed * 1.5)) * (wave.amplitude * 0.3);
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        });

        phase += 1;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    
    // Initialize
    resize();
    draw();
});
