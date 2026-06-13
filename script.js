// ==========================================
// RAVIE.IN - UNIVERSAL CORE ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

 // 1. KINETIC BACKGROUND TRACKING (DESKTOP ONLY)
    document.addEventListener("mousemove", (e) => {
        const glassLayer = document.getElementById('liquid-glass-overlay');
        
        // ABORT tracking if the glass menu is open
        if (glassLayer && glassLayer.classList.contains('active-glass')) {
            return; 
        }

        if (window.innerWidth > 768) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                body.style.setProperty('--x', `${x}%`);
                body.style.setProperty('--y', `${y}%`);
            });
        }
    });

    // 2. MOBILE HAMBURGER DROPDOWN LOGIC
    const hamburger = document.getElementById('hamburger-menu');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (hamburger && mobileDropdown) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileDropdown.classList.toggle('active-menu');
        });
    }
// 2.5 GATEWAY LIQUID GLASS MENU
    const gatewayMenuBtn = document.getElementById('gateway-menu-btn');
    const liquidGlassOverlay = document.getElementById('liquid-glass-overlay');

    if (gatewayMenuBtn && liquidGlassOverlay) {
        gatewayMenuBtn.addEventListener('click', () => {
            const isActive = liquidGlassOverlay.classList.contains('active-glass');
            
            if (isActive) {
                // Close the menu
                liquidGlassOverlay.classList.remove('active-glass');
                gatewayMenuBtn.textContent = 'MENU';
            } else {
                // Open the menu
                liquidGlassOverlay.classList.add('active-glass');
                gatewayMenuBtn.textContent = 'CLOSE';
            }
        });
    }
        // 3. HOME VIEW GATEWAY ROUTING & PLATFORM ENGINE
    const btnCreators = document.getElementById("btn-creators");
    const btnBrands = document.getElementById("btn-brands");
    const gatewayView = document.getElementById("gateway-view");
    const platformView = document.getElementById("platform-view");
    
    // Inner Compass Elements
    const sideTalents = document.getElementById("side-talents");
    const sideBrands = document.getElementById("side-brands");
    const streamTalents = document.getElementById("ledger-talents");
    const streamBrands = document.getElementById("ledger-brands");

    function transitionToPlatform(targetStream) {
        if (gatewayView && platformView) {
            // Fade out the center gateway
            gatewayView.style.opacity = '0';
            gatewayView.style.pointerEvents = 'none';
            
            setTimeout(() => {
                // Hide gateway, prep platform
                gatewayView.classList.remove('active-view');
                gatewayView.style.display = 'none';
                
                platformView.style.display = 'block';
                
                // Trigger a tiny delay to allow CSS to register the display change
                setTimeout(() => {
                    platformView.classList.add('active-platform');
                    switchStream(targetStream);
                }, 50);

            }, 600);
        }
    }

    function switchStream(target) {
        // Reset Compass
        sideTalents.classList.remove('active-sidebar');
        sideBrands.classList.remove('active-sidebar');
        // Hide all streams
        streamTalents.classList.remove('active-stream');
        streamBrands.classList.remove('active-stream');

        // Activate targeted stream & compass link
        if (target === 'talents') {
            sideTalents.classList.add('active-sidebar');
            streamTalents.classList.add('active-stream');
        } else if (target === 'brands') {
            sideBrands.classList.add('active-sidebar');
            streamBrands.classList.add('active-stream');
        }
    }

    // Gateway Click Listeners
    if (btnCreators) btnCreators.addEventListener("click", () => transitionToPlatform("talents"));
    if (btnBrands) btnBrands.addEventListener("click", () => transitionToPlatform("brands"));

    // Inner Compass Click Listeners
    if (sideTalents) sideTalents.addEventListener("click", () => switchStream("talents"));
    if (sideBrands) sideBrands.addEventListener("click", () => switchStream("brands"));
    
