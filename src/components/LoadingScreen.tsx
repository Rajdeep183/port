import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile devices for performance optimization
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete?.();
          }, isMobile ? 800 : 1200); // Faster transition on mobile
          return 100;
        }
        return prev + (isMobile ? 2 : 1); // Faster progress on mobile
      });
    }, isMobile ? 20 : 30); // Faster updates on mobile

    return () => clearInterval(timer);
  }, [onLoadingComplete, isMobile]);

  // Reduce particle count on mobile for better performance
  const backgroundParticles = useMemo(() => 
    Array.from({ length: isMobile ? 8 : 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * (isMobile ? 3 : 5),
      duration: (isMobile ? 8 : 10) + Math.random() * (isMobile ? 4 : 8),
      size: 1 + Math.random() * (isMobile ? 1 : 2),
    })), [isMobile]
  );

  // Reduce orbital particles on mobile
  const particles = useMemo(() => 
    Array.from({ length: isMobile ? 4 : 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / (isMobile ? 4 : 8),
      radius: (isMobile ? 120 : 140) + Math.random() * 20,
      speed: 0.7 + Math.random() * 0.3,
    })), [isMobile]
  );

  // Premium color palette
  const colors = {
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2a2a2a 100%)",
    accent: "#f8fafc",
    secondary: "#64748b",
    highlight: "#e2e8f0",
    subtle: "#334155"
  };

  const darkPurple = "#2a003f";

  // Mobile-optimized animation variants
  const mobileVariants = {
    container: {
      initial: { opacity: 1 },
      exit: { 
        opacity: 0, 
        scale: isMobile ? 1 : 0.98,
        transition: { duration: isMobile ? 0.5 : 0.8, ease: "easeInOut" }
      }
    },
    mainContent: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
          duration: isMobile ? 0.8 : 1.2,
          ease: "easeOut"
        }
      }
    },
    text: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.4 : 0.8 }
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={mobileVariants.container}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${darkPurple}, #3b0764, #1e1832 90%)`,
            // Use transform3d for hardware acceleration
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >
          {/* Simplified Background Pattern for mobile */}
          <div className="absolute inset-0">
            {/* Radial gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 60% 40%, #7c3aed22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #a21caf33 0%, transparent 70%)`
              }}
            />

            {/* Conditionally render complex animations only on desktop or when motion is not reduced */}
            {!prefersReducedMotion && !isMobile && (
              <>
                {/* Floating background particles - desktop only */}
                {backgroundParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      background: `linear-gradient(90deg, #7c3aed33, #a21caf33)`,
                      willChange: 'transform'
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.1, 0.4, 0.1],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}

            {/* Simplified mobile particles */}
            {isMobile && (
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mobile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="#7c3aed" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mobile-grid)" />
                </svg>
              </div>
            )}
          </div>

          {/* Simplified orbital particles for mobile */}
          {!prefersReducedMotion && (
            <>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full opacity-60"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: isMobile ? "6px" : "8px",
                    height: isMobile ? "6px" : "8px",
                    marginLeft: isMobile ? "-3px" : "-4px",
                    marginTop: isMobile ? "-3px" : "-4px",
                    background: `linear-gradient(90deg, #c026d3 40%, #7c3aed 100%)`,
                    willChange: 'transform'
                  }}
                  animate={{
                    x: Math.cos((particle.angle * Math.PI) / 180) * particle.radius,
                    y: Math.sin((particle.angle * Math.PI) / 180) * particle.radius,
                    rotate: 360,
                  }}
                  transition={{
                    x: { duration: (isMobile ? 8 : 12) / particle.speed, repeat: Infinity, ease: "linear" },
                    y: { duration: (isMobile ? 8 : 12) / particle.speed, repeat: Infinity, ease: "linear" },
                    rotate: { duration: isMobile ? 2 : 3, repeat: Infinity, ease: "linear" },
                  }}
                />
              ))}
            </>
          )}

          {/* Main Loading Container - Optimized for mobile */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              variants={mobileVariants.mainContent}
              initial="initial"
              animate="animate"
              className="relative flex items-center justify-center"
              style={{ willChange: 'transform' }}
            >
              {/* Simplified rings for mobile */}
              {!isMobile && (
                <>
                  {/* Outer elegant ring - desktop only */}
                  <motion.div
                    className="absolute w-72 h-72 rounded-full"
                    style={{ border: `2px solid #7c3aed44` }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Rotating rings - desktop only */}
                  <motion.div
                    className="absolute w-60 h-60 rounded-full"
                    style={{ border: "2px solid #a21caf22" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}

              {/* Main Progress Circle - Mobile optimized */}
              <div className={`relative flex items-center justify-center ${isMobile ? 'w-32 h-32' : 'w-48 h-48'}`}>
                <svg
                  className="absolute -rotate-90"
                  width={isMobile ? "128" : "192"}
                  height={isMobile ? "128" : "192"}
                  viewBox={`0 0 ${isMobile ? "128" : "192"} ${isMobile ? "128" : "192"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ willChange: 'transform' }}
                >
                  {/* Background Circle */}
                  <circle
                    cx={isMobile ? "64" : "96"}
                    cy={isMobile ? "64" : "96"}
                    r={isMobile ? "56" : "88"}
                    stroke="#2a003f"
                    strokeWidth={isMobile ? "4" : "6"}
                    fill="none"
                    opacity="0.4"
                  />

                  {/* Progress Circle */}
                  <motion.circle
                    cx={isMobile ? "64" : "96"}
                    cy={isMobile ? "64" : "96"}
                    r={isMobile ? "56" : "88"}
                    stroke="url(#progressGradientDark)"
                    strokeWidth={isMobile ? "4" : "6"}
                    fill="none"
                    strokeDasharray={isMobile ? "352" : "553"}
                    strokeDashoffset={isMobile ? "352" : "553"}
                    strokeLinecap="round"
                    animate={{ 
                      strokeDashoffset: (isMobile ? 352 : 553) - (progress / 100) * (isMobile ? 352 : 553) 
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />

                  <defs>
                    <linearGradient id="progressGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2a003f" />
                      <stop offset="40%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#a21caf" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content - Mobile optimized */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Refined Initials */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: isMobile ? 1.0 : 1.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: isMobile ? 0.2 : 0.5
                    }}
                    className="flex items-center justify-center mb-2"
                  >
                    <h1
                      className={`font-light tracking-[0.2em] leading-none ${isMobile ? 'text-4xl' : 'text-6xl'}`}
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        color: colors.accent,
                        fontWeight: 300,
                        letterSpacing: "0.15em"
                      }}
                    >
                      RR
                    </h1>
                  </motion.div>

                  {/* Progress Percentage */}
                  <motion.div
                    variants={mobileVariants.text}
                    initial="initial"
                    animate="animate"
                    className="flex items-center justify-center"
                  >
                    <p
                      className={`font-medium tracking-wider ${isMobile ? 'text-xs' : 'text-sm'}`}
                      style={{ color: "#a78bfa" }}
                    >
                      {progress}%
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Simplified Loading Text for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.6 : 1.2 }}
              className={`text-center ${isMobile ? 'mt-8' : 'mt-20'}`}
            >
              <p
                className={`font-light tracking-[0.3em] uppercase ${isMobile ? 'text-sm' : 'text-lg'}`}
                style={{ color: "#e0e7ff" }}
              >
                Loading Portfolio
              </p>

              {/* Simplified dots animation */}
              <div className={`flex justify-center space-x-2 ${isMobile ? 'mt-4' : 'mt-8'}`}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`rounded-full ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
                    style={{
                      background: `linear-gradient(90deg, #a21caf, #7c3aed 90%)`
                    }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
