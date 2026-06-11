// --- KINETIC BACKGROUND TRACKING ENGINE --- //
const body = document.body;

// Desktop Mouse Tracking
document.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        body.style.setProperty('--x', `${x}%`);
        body.style.setProperty('--y', `${y}%`);
    });
});

// Mobile/Tablet Touch Tracking
document.addEventListener("touchmove", (e) => {
    requestAnimationFrame(() => {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 100;
        const y = (touch.clientY / window.innerHeight) * 100;
        body.style.setProperty('--x', `${x}%`);
        body.style.setProperty('--y', `${y}%`);
    });
}, { passive: true }); // Passive flag ensures smooth scrolling on mobile
// ------------------------------------------ //

// (Your existing routing logic for btnCreators and btnBrands goes below here)
document.addEventListener("DOMContentLoaded", () => {
  const btnCreators = document.getElementById("btn-creators");
  const btnBrands = document.getElementById("btn-brands");
  const gatewayView = document.getElementById("gateway-view");

  // Dynamic View Replacement Logic
  function transitionToRoute(route) {
    // Fade out current view
    gatewayView.style.opacity = "0";

    setTimeout(() => {
      gatewayView.classList.remove("active-view");
      gatewayView.style.display = "none";

      console.log(
        `[RAVIE.IN] System routed to: ${route.toUpperCase()} Protocol.`
      );

      // Temporary visual feedback until we build the inner components
      document.body.innerHTML += `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                            font-family: 'Inter'; letter-spacing: 3px; color: #fff; font-size: 0.85rem; 
                            text-shadow: 0px 0px 15px rgba(0, 34, 255, 0.8);">
                    INITIALIZING ${route.toUpperCase()} LEDGER...
                </div>
            `;
    }, 600); // Matches the CSS transition time perfectly
  }

  btnCreators.addEventListener("click", () => {
    transitionToRoute("talents");
  });

  btnBrands.addEventListener("click", () => {
    transitionToRoute("brands");
  });
});
