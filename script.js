// ==========================================
// RAVIE.IN - UNIVERSAL CORE ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // 1. KINETIC BACKGROUND TRACKING (DESKTOP ONLY)
    document.addEventListener("mousemove", (e) => {
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

    // 3. HOME VIEW GATEWAY ROUTING
    const btnCreators = document.getElementById("btn-creators");
    const btnBrands = document.getElementById("btn-brands");
    const gatewayView = document.getElementById("gateway-view");
    const appContainer = document.getElementById("app-container");

    function transitionToRoute(route) {
        if (gatewayView && appContainer) {
            // Fade out the gateway layer
            gatewayView.style.opacity = '0';
            
            setTimeout(() => {
                // Hide the gateway completely after fade
                gatewayView.classList.remove('active-view');
                gatewayView.style.display = 'none';
                
                // Temporary console placeholder for inner platform screens
                console.log(`[RAVIE.IN] System routed to: ${route.toUpperCase()}`);
                
                // Safely inject the loading text without shattering the DOM
                const transitionScreen = document.createElement('div');
                transitionScreen.style.cssText = `
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    font-family: 'Inter'; letter-spacing: 3px; color: #fff; font-size: 0.85rem; 
                    text-shadow: 0px 0px 15px rgba(0, 229, 255, 0.8); text-align: center;
                `;
                transitionScreen.innerHTML = `INITIALIZING ${route.toUpperCase()} PROTOCOL...`;
                
                appContainer.appendChild(transitionScreen);
            }, 600);
        }
    }

    if (btnCreators) btnCreators.addEventListener("click", () => transitionToRoute("talents"));
    if (btnBrands) btnBrands.addEventListener("click", () => transitionToRoute("brands"));
});
