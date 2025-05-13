import { useEffect, useRef, useState, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  originalSpeed: number;
}

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  particleDensity?: number;
  colorScheme?: "blue" | "purple" | "teal" | "multicolor";
  interactionRadius?: number;
  interactionStrength?: number;
  maxConnections?: number;
}

const AnimatedBackground = ({
  children,
  particleDensity = 10000, // Lower number = more particles
  colorScheme = "blue",
  interactionRadius = 200, 
  interactionStrength = 0.08, 
  maxConnections = 150,
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isMouseMovingRef = useRef<boolean>(false);
  const mouseActiveRef = useRef<boolean>(false);
  const mouseIdleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Color schemes
  const colorSchemes = useMemo(() => ({
    blue: ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#1E3A8A"],
    purple: ["#7E22CE", "#A855F7", "#C084FC", "#DDD6FE", "#5B21B6"],
    teal: ["#0F766E", "#14B8A6", "#5EEAD4", "#99F6E4", "#115E59"],
    multicolor: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"]
  }), []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement;
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
        setDimensions({ width: clientWidth, height: clientHeight });
        
        // Only reinitialize particles if they don't exist yet or on significant resize
        if (particlesRef.current.length === 0 || 
            Math.abs(clientWidth - dimensions.width) > 200 || 
            Math.abs(clientHeight - dimensions.height) > 200) {
          initParticles();
        } else {
          // Just adjust existing particles to stay in bounds
          constrainParticlesToCanvas(clientWidth, clientHeight);
        }
      }
    };

    // Constrain existing particles to new canvas dimensions
    const constrainParticlesToCanvas = (width: number, height: number) => {
      particlesRef.current = particlesRef.current.map(p => ({
        ...p,
        x: Math.min(Math.max(p.x, 0), width),
        y: Math.min(Math.max(p.y, 0), height)
      }));
    };

    // Track mouse position with improved handling
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      isMouseMovingRef.current = true;
      mouseActiveRef.current = true;
      
      // Reset mouse idle timer
      if (mouseIdleTimerRef.current) {
        clearTimeout(mouseIdleTimerRef.current);
      }
      
      mouseIdleTimerRef.current = setTimeout(() => {
        isMouseMovingRef.current = false;
      }, 100); // Consider mouse idle after very short time for immediate response
    };
    
    // Track when mouse enters/leaves window
    const handleMouseEnter = () => {
      mouseActiveRef.current = true;
    };
    
    const handleMouseLeave = () => {
      mouseActiveRef.current = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (mouseIdleTimerRef.current) {
        clearTimeout(mouseIdleTimerRef.current);
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions.width, dimensions.height]);

  // Initialize particles with minimized size
  const initParticles = () => {
    if (!canvasRef.current) return;

    const { width, height } = canvasRef.current;
    const particleCount = Math.floor((width * height) / particleDensity);
    const particles: Particle[] = [];
    const colors = colorSchemes[colorScheme];

    for (let i = 0; i < particleCount; i++) {
      // Reduced particle size
      const size = Math.random() * 1.5 + 0.5; // Significantly smaller particles (was 4 + 1)
      const originalSpeed = Math.random() * 0.15 + 0.05; // Slightly lower speed
      const angle = Math.random() * Math.PI * 2; // Random direction
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: Math.cos(angle) * originalSpeed,
        speedY: Math.sin(angle) * originalSpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2, // Lower opacity for subtler effect
        originalSpeed
      });
    }

    particlesRef.current = particles;
  };

  // Animation loop with performance optimizations
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return;

    const ctx = canvasRef.current.getContext("2d", { alpha: true });
    if (!ctx) return;

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const particles = particlesRef.current;
      const mouseActive = mouseActiveRef.current;
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Mouse interaction - stronger attraction effect
        if (mouseActive) {
          const dx = mousePosition.x - p.x;
          const dy = mousePosition.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            // Calculate force - stronger at closer distances
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = Math.pow((interactionRadius - distance) / interactionRadius, 2);
            
            // Apply stronger attractive force
            p.speedX += forceDirectionX * force * interactionStrength;
            p.speedY += forceDirectionY * force * interactionStrength;
          }
        } else {
          // When mouse is inactive, gradually return to original speed
          const targetSpeed = p.originalSpeed;
          const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
          
          if (Math.abs(currentSpeed - targetSpeed) > 0.01) {
            const dampingFactor = 0.97;
            p.speedX *= dampingFactor;
            p.speedY *= dampingFactor;
            
            // Add a tiny bit of random movement
            if (currentSpeed < 0.05) {
              const angle = Math.random() * Math.PI * 2;
              p.speedX += Math.cos(angle) * 0.01;
              p.speedY += Math.sin(angle) * 0.01;
            }
          }
        }

        // Update particle position
        p.x += p.speedX;
        p.y += p.speedY;

        // Speed limit - higher max speed for more responsive movement
        const maxSpeed = mouseActive ? 2.0 : 0.8;
        const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
        if (currentSpeed > maxSpeed) {
          p.speedX = (p.speedX / currentSpeed) * maxSpeed;
          p.speedY = (p.speedY / currentSpeed) * maxSpeed;
        }

        // Boundary check with smoother bounce
        if (p.x < 0) {
          p.x = 0;
          p.speedX = Math.abs(p.speedX) * 0.5;
        } else if (p.x > dimensions.width) {
          p.x = dimensions.width;
          p.speedX = -Math.abs(p.speedX) * 0.5;
        }
        
        if (p.y < 0) {
          p.y = 0;
          p.speedY = Math.abs(p.speedY) * 0.5;
        } else if (p.y > dimensions.height) {
          p.y = dimensions.height;
          p.speedY = -Math.abs(p.speedY) * 0.5;
        }

        // Draw particle with minimized glow effect
        ctx.globalAlpha = p.opacity;
        
        // Reduced glow
        const glow = 4 * p.size; // Reduced glow size (was 8)
        const gradientGlow = ctx.createRadialGradient(
          p.x, p.y, 0, 
          p.x, p.y, glow
        );
        gradientGlow.addColorStop(0, p.color + "33"); // More transparent glow (was 55)
        gradientGlow.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fillStyle = gradientGlow;
        ctx.fill();
        
        // Smaller solid center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2); // Smaller particles (was 1.2)
        ctx.fillStyle = p.color;
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }

      // Connect nearby particles with thinner lines
      if (mouseActive) {
        ctx.lineWidth = 0.3; // Thinner lines (was 0.6)
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          // Focus connections on particles near mouse
          const distToMouse = Math.sqrt(
            Math.pow(p.x - mousePosition.x, 2) + 
            Math.pow(p.y - mousePosition.y, 2)
          );
          
          if (distToMouse < interactionRadius * 1.5) {
            // Only check a subset of particles for connections
            const checkStep = Math.ceil(particles.length / 200);
            
            for (let j = (i + 1) * checkStep; j < particles.length; j += checkStep) {
              if (j >= particles.length) continue;
              
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < maxConnections) {
                const opacity = (1 - distance / maxConnections) * 0.3 * p.opacity; // Reduced opacity (was 0.5)
                
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = opacity;
                ctx.stroke();
              }
            }
          }
        }
      }
      
      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions, mousePosition, colorScheme, interactionRadius, interactionStrength, maxConnections]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 absolute inset-0 z-0"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
      />
      <div className="relative z-20 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;