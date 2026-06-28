// ==========================================
// RAVIE.IN - UNIVERSAL CORE ENGINE (v2.0 SANITIZED)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    let targetDepth = 0;   
    let currentDepth = 0;  
    let isBackgroundFrozen = document.body.classList.contains('legal-page'); 

    const canvas = document.getElementById('webgl-canvas');
    const hamburger = document.getElementById('hamburger-menu');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const gatewayMenuBtn = document.getElementById('gateway-menu-btn');
    const liquidGlassOverlay = document.getElementById('liquid-glass-overlay');
    
    const gatewayView = document.getElementById("gateway-view");
    const platformView = document.getElementById("platform-view");
    const btnCreators = document.getElementById("btn-creators");
    const btnBrands = document.getElementById("btn-brands");
    
    const sideTalents = document.getElementById("side-talents");
    const sideBrands = document.getElementById("side-brands");
    const streamTalents = document.getElementById("ledger-talents");
    const streamBrands = document.getElementById("ledger-brands");

    // ==========================================
    // 1. UI NAVIGATION ENGINE
    // ==========================================
    if (hamburger && mobileDropdown) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileDropdown.classList.toggle('active-menu');
            isBackgroundFrozen = !isBackgroundFrozen;
            if (canvas) canvas.classList.toggle('frozen-blur');
        });
    }

    if (gatewayMenuBtn && liquidGlassOverlay) {
        gatewayMenuBtn.addEventListener('click', () => {
            const isActive = liquidGlassOverlay.classList.contains('active-glass');
            if (isActive) {
                liquidGlassOverlay.classList.remove('active-glass');
                gatewayMenuBtn.textContent = 'MENU';
                isBackgroundFrozen = document.body.classList.contains('legal-page');
                if (canvas) canvas.classList.remove('frozen-blur');
            } else {
                liquidGlassOverlay.classList.add('active-glass');
                gatewayMenuBtn.textContent = 'CLOSE';
                isBackgroundFrozen = true;
                if (canvas) canvas.classList.add('frozen-blur');
            }
        });
    }

    // ==========================================
    // 2. ROUTING ENGINE WITH NATIVE HISTORY HOOKS
    // ==========================================
    function transitionToPlatform(targetStream, pushToHistory = true) {
        if (!gatewayView || !platformView) return;

        if (pushToHistory) {
            history.pushState({ view: targetStream }, '', `?view=${targetStream}`);
        }

        gatewayView.style.opacity = '0';
        gatewayView.style.pointerEvents = 'none';
        
        setTimeout(() => {
            gatewayView.classList.remove('active-view');
            gatewayView.style.display = 'none';
            platformView.style.display = 'block';
            setTimeout(() => {
                platformView.classList.add('active-platform');
                switchStream(targetStream);
            }, 50); 
        }, 600); 
    }

    function returnToGateway() {
        if (!gatewayView || !platformView) return;
        platformView.classList.remove('active-platform');
        platformView.style.display = 'none';
        gatewayView.style.display = 'flex';
        setTimeout(() => {
            gatewayView.classList.add('active-view');
            gatewayView.style.opacity = '1';
            gatewayView.style.pointerEvents = 'auto';
            targetDepth = 0;
            if (canvas) canvas.className = 'depth-surface';
        }, 50);
    }

    function switchStream(target) {
        if (sideTalents) sideTalents.classList.remove('active-sidebar');
        if (sideBrands) sideBrands.classList.remove('active-sidebar');
        if (streamTalents) streamTalents.classList.remove('active-stream');
        if (streamBrands) streamBrands.classList.remove('active-stream');

        if (target === 'talents') {
            if (sideTalents) sideTalents.classList.add('active-sidebar');
            if (streamTalents) streamTalents.classList.add('active-stream');
            targetDepth = 0;
            if (canvas) canvas.className = 'depth-surface';
        } else if (target === 'brands') {
            if (sideBrands) sideBrands.classList.add('active-sidebar');
            if (streamBrands) streamBrands.classList.add('active-stream');
            targetDepth = 1; 
            if (canvas) canvas.className = 'depth-deep';
        }
    }

    // Browser Back Button Listener
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.view) {
            transitionToPlatform(event.state.view, false);
        } else {
            returnToGateway();
        }
    });

    // Deep link check on direct load (e.g., user refreshes ravie.in/?view=brands)
    const urlParams = new URLSearchParams(window.location.search);
    const requestedView = urlParams.get('view');
    if (requestedView === 'talents' || requestedView === 'brands') {
        transitionToPlatform(requestedView, false);
    }

    if (btnCreators) btnCreators.addEventListener("click", () => transitionToPlatform("talents"));
    if (btnBrands) btnBrands.addEventListener("click", () => transitionToPlatform("brands"));
    if (sideTalents) sideTalents.addEventListener("click", () => {
        history.replaceState({ view: 'talents' }, '', '?view=talents');
        switchStream("talents");
    });
    if (sideBrands) sideBrands.addEventListener("click", () => {
        history.replaceState({ view: 'brands' }, '', '?view=brands');
        switchStream("brands");
    });

    const legalNavLinks = document.querySelectorAll('.sidebar-option, .sidebar-sub-option');
    legalNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(link.id === 'side-privacy') window.location.href = 'policy.html';
            if(link.id === 'side-terms-talents') window.location.href = 'tterms.html';
            if(link.id === 'side-terms-brands') window.location.href = 'bterms.html';
        });
    });

    // ==========================================
    // 3. WEBGL ENGINE (THROTTLED & DEBOUNCED)
    // ==========================================
    if (canvas) {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const VERT = `attribute vec2 pos;void main(){gl_Position=vec4(pos,0,1);}`;
        const FRAG = `
        precision highp float;
        uniform float u_t; uniform vec2 u_res; uniform float u_depth;
        vec2 ghash(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.0+2.0*fract(sin(p)*43758.5453);}
        float gn(vec2 p){
          vec2 i=floor(p),f=fract(p),u=f*f*f*(f*(f*6.0-15.0)+10.0);
          return mix(mix(dot(ghash(i),f),dot(ghash(i+vec2(1,0)),f-vec2(1,0)),u.x),
                     mix(dot(ghash(i+vec2(0,1)),f-vec2(0,1)),dot(ghash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y)*0.5+0.5;
        }
        vec2 curl(vec2 p,float t){
          float e=0.001; float ax=gn(p+vec2(e,0)+vec2(t*0.031,t*0.017)); float ay=gn(p-vec2(e,0)+vec2(t*0.031,t*0.017));
          float bx=gn(p+vec2(0,e)+vec2(t*0.019,t*0.041)); float by=gn(p-vec2(0,e)+vec2(t*0.019,t*0.041));
          return vec2((bx-by)/(2.0*e),-(ax-ay)/(2.0*e));
        }
        vec2 curlFBM(vec2 p,float t){
          vec2 v=vec2(0);float a=0.6,f=1.0;
          for(int i=0;i<3;i++){v+=a*curl(p*f+v*0.5,t+float(i)*1.7);f*=1.85;a*=0.50;}
          return v;
        }
        vec3 pal(float n,float angle,float spd){
          vec3 s0=vec3(0.004,0.012,0.065); vec3 s1=vec3(0.010,0.055,0.230); vec3 s2=vec3(0.035,0.175,0.650);
          vec3 s3=vec3(0.070,0.330,0.900); vec3 s4=vec3(0.620,0.840,1.000); vec3 s5=vec3(0.940,0.970,1.000);
          vec3 d0=vec3(0.001,0.003,0.014); vec3 d1=vec3(0.003,0.012,0.045); vec3 d2=vec3(0.006,0.038,0.110);
          vec3 d3=vec3(0.012,0.085,0.190); vec3 d4=vec3(0.025,0.190,0.330); vec3 d5=vec3(0.070,0.340,0.460);
          vec3 c0=mix(s0,d0,u_depth); vec3 c1=mix(s1,d1,u_depth); vec3 c2=mix(s2,d2,u_depth);
          vec3 c3=mix(s3,d3,u_depth); vec3 c4=mix(s4,d4,u_depth); vec3 c5=mix(s5,d5,u_depth);
          vec3 col=c0; col=mix(col,c1,smoothstep(0.00,0.22,n)); col=mix(col,c2,smoothstep(0.18,0.50,n));
          col=mix(col,c3,smoothstep(0.42,0.72,n)); col=mix(col,c4,smoothstep(0.65,0.88,n)); col=mix(col,c5,smoothstep(0.84,0.97,n));
          float hue=sin(angle*2.0)*0.10; col.b=clamp(col.b+hue,0.0,1.0); col.r=clamp(col.r-hue*0.4,0.0,1.0);
          col+=vec3(-0.005,0.015,0.06)*smoothstep(0.0,2.0,spd)*0.5; return clamp(col,0.0,1.0);
        }
        void main(){
          vec2 uv=gl_FragCoord.xy/u_res; vec2 st=(uv*2.0-1.0)*vec2(u_res.x/u_res.y,1.0);
          vec2 p=st*1.0; vec2 pos=p;vec3 col=vec3(0);float wsum=0.0;
          float drift=1.0-0.35*u_depth;
          for(int step=0;step<3;step++){
            vec2 flow=curlFBM(pos,u_t); pos-=flow*0.28*drift; float n=gn(pos*0.85+u_t*0.012);
            float angle=atan(flow.y,flow.x); float spd=length(flow); float w=1.0/(float(step)+1.0);
            col+=pal(n,angle,spd)*w;wsum+=w;
          }
          col/=wsum;
          float vigFloor=mix(0.35,0.10,u_depth); float vigRange=mix(0.65,0.80,u_depth);
          float vig=1.0-smoothstep(0.45,1.35,length(st*0.65)); col*=vigFloor+vigRange*vig;
          gl_FragColor=vec4(col,1.0);
        }`;
        
        function mk(t,s){const sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);return sh;}
        const prog=gl.createProgram();
        gl.attachShader(prog,mk(gl.VERTEX_SHADER,VERT)); gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,FRAG));
        gl.linkProgram(prog);gl.useProgram(prog);
        const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
        const ap=gl.getAttribLocation(prog,'pos');gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);
        const uT=gl.getUniformLocation(prog,'u_t'); const uR=gl.getUniformLocation(prog,'u_res');
        const uDepth=gl.getUniformLocation(prog,'u_depth');
        
        const DOWNSCALE = 0.15;
        function resize(){
            canvas.width = window.innerWidth * DOWNSCALE;
            canvas.height = window.innerHeight * DOWNSCALE;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize(); 

        // Debounced mobile scroll protector
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 150);
        });
        
        let lastTime = 0;
        let shaderTime = 0;

        function render(ts){
            let deltaTime = ts - lastTime;
            lastTime = ts;

            if (!isBackgroundFrozen) {
                shaderTime += deltaTime * 0.0035; 
            }

            currentDepth += (targetDepth - currentDepth) * Math.min(1, deltaTime * 0.0025);

            gl.uniform1f(uT, shaderTime);
            gl.uniform1f(uDepth, currentDepth);
            gl.uniform2f(uR, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    // ==========================================
    // 4. REAL-TIME CLOCK
    // ==========================================
    function startConsoleClock() {
        const clockElement = document.getElementById('console-clock');
        if (!clockElement) return;

        setInterval(() => {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            });
        }, 1000);
    }

    startConsoleClock();
});
