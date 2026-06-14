// ==========================================
// RAVIE.IN - UNIVERSAL CORE ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // 2. MOBILE HAMBURGER DROPDOWN
    const hamburger = document.getElementById('hamburger-menu');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (hamburger && mobileDropdown) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileDropdown.classList.toggle('active-menu');
        });
    }

    // 3. GATEWAY LIQUID GLASS MENU (PC ONLY)
    const gatewayMenuBtn = document.getElementById('gateway-menu-btn');
    const liquidGlassOverlay = document.getElementById('liquid-glass-overlay');

    if (gatewayMenuBtn && liquidGlassOverlay) {
        gatewayMenuBtn.addEventListener('click', () => {
            const isActive = liquidGlassOverlay.classList.contains('active-glass');
            if (isActive) {
                liquidGlassOverlay.classList.remove('active-glass');
                gatewayMenuBtn.textContent = 'MENU';
            } else {
                liquidGlassOverlay.classList.add('active-glass');
                gatewayMenuBtn.textContent = 'CLOSE';
            }
        });
    }

    // 4. INNER PLATFORM ENGINE (LEDGER)
    const btnCreators = document.getElementById("btn-creators");
    const btnBrands = document.getElementById("btn-brands");
    const gatewayView = document.getElementById("gateway-view");
    const platformView = document.getElementById("platform-view");
    
    const sideTalents = document.getElementById("side-talents");
    const sideBrands = document.getElementById("side-brands");
    const streamTalents = document.getElementById("ledger-talents");
    const streamBrands = document.getElementById("ledger-brands");

    function transitionToPlatform(targetStream) {
        if (gatewayView && platformView) {
            gatewayView.style.opacity = '0';
            gatewayView.style.pointerEvents = 'none';
            
            setTimeout(() => {
                gatewayView.classList.remove('active-view');
                gatewayView.style.display = 'none';
                
                platformView.style.display = 'block';
                
                setTimeout(() => {
                    platformView.classList.add('active-platform');
                    switchStream(targetStream);
                }, 50); // Small delay to allow display:block to render before fading in
            }, 600); // Matches CSS transition timing
        }
    }

    function switchStream(target) {
        // Safely reset Compass (Left Axis)
        sideTalents?.classList.remove('active-sidebar');
        sideBrands?.classList.remove('active-sidebar');
        
        // Safely hide Streams (Right Axis)
        streamTalents?.classList.remove('active-stream');
        streamBrands?.classList.remove('active-stream');

        // Activate the target streams
        if (target === 'talents') {
            sideTalents?.classList.add('active-sidebar');
            streamTalents?.classList.add('active-stream');
        } else if (target === 'brands') {
            sideBrands?.classList.add('active-sidebar');
            streamBrands?.classList.add('active-stream');
        }
    }

    // Event Listeners for Gateway & Compass
    btnCreators?.addEventListener("click", () => transitionToPlatform("talents"));
    btnBrands?.addEventListener("click", () => transitionToPlatform("brands"));
    sideTalents?.addEventListener("click", () => switchStream("talents"));
    sideBrands?.addEventListener("click", () => switchStream("brands"));
});
