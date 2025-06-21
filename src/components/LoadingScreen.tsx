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
          }, isMobile ? 800 : 1200);
          return 100;
        }
        return prev + (isMobile ? 2 : 1);
      });
    }, isMobile ? 20 : 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete, isMobile]);

  // Generate elegant floating particles
  const backgroundParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 8,
    size: 1 + Math.random() * 2,
  }));

  // Generate orbital particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    radius: 140 + Math.random() * 20,
    speed: 0.7 + Math.random() * 0.3,
  }));

  // Use a dark purple shade for backgrounds and accents
  const darkPurple = "#2a003f";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${darkPurple}, #3b0764, #1e1832 90%)`
          }}
        >
          {/* Elegant Background Pattern */}
          <div className="absolute inset-0">
            {/* Radial gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 60% 40%, #7c3aed22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #a21caf33 0%, transparent 70%)`
              }}
            />

            {/* Floating background particles */}
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
                  boxShadow: `0 0 8px 2px #2e106580`
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

            {/* Subtle geometric pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="1" fill="#7c3aed" opacity="0.25" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Elegant orbital particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full opacity-60"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
                background: `linear-gradient(90deg, #c026d3 40%, #7c3aed 100%)`,
                boxShadow: `0 0 8px 2px #9d174d50`
              }}
              animate={{
                x: Math.cos((particle.angle * Math.PI) / 180) * particle.radius,
                y: Math.sin((particle.angle * Math.PI) / 180) * particle.radius,
                rotate: 360,
              }}
              transition={{
                x: { duration: 12 / particle.speed, repeat: Infinity, ease: "linear" },
                y: { duration: 12 / particle.speed, repeat: Infinity, ease: "linear" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
            />
          ))}

          {/* Main Loading Container */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              className="relative flex items-center justify-center"
            >
              {/* Outer elegant ring */}
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

              {/* Middle rotating ring */}
              <motion.div
                className="absolute w-60 h-60 rounded-full"
                style={{ border: "2px solid #a21caf22" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner counter-rotating ring */}
              <motion.div
                className="absolute w-52 h-52 rounded-full"
                style={{ border: "2px solid #a21caf55" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Main Progress Circle */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg
                  className="absolute -rotate-90"
                  width="192"
                  height="192"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#2a003f"
                    strokeWidth="6"
                    fill="none"
                    opacity="0.4"
                  />

                  {/* Progress Circle */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#progressGradientDark)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="553"
                    strokeDashoffset="553"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: 553 - (progress / 100) * 553 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      filter: "drop-shadow(0 0 12px #7c3aed88)",
                    }}
                  />

                  <defs>
                    <linearGradient id="progressGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2a003f" />
                      <stop offset="40%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#a21caf" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Simplified RR Animation that actually renders */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2
                    }}
                    className="relative flex items-center justify-center mb-4"
                  >
                    {/* Main RR Text - Appears in place with dramatic effect */}
                    <motion.h1
                      className={`font-light leading-none tracking-[0.1em] ${isMobile ? 'text-5xl' : 'text-7xl'}`}
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 200,
                        color: "#ffffff",
                        textShadow: "0 0 30px rgba(124, 58, 237, 0.5)"
                      }}
                    >
                      {/* First R with dramatic scale from behind */}
                      <motion.span
                        initial={{ 
                          opacity: 0,
                          scale: 0.1,
                          rotateX: 180
                        }}
                        animate={{ 
                          opacity: 1,
                          scale: 1,
                          rotateX: 0
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: 0.3
                        }}
                        style={{ 
                          display: "inline-block",
                          transformOrigin: "center"
                        }}
                      >
                        R
                      </motion.span>

                      {/* Second R with dramatic scale from behind */}
                      <motion.span
                        initial={{ 
                          opacity: 0,
                          scale: 0.1,
                          rotateX: 180
                        }}
                        animate={{ 
                          opacity: 1,
                          scale: 1,
                          rotateX: 0
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: 0.45
                        }}
                        style={{ 
                          display: "inline-block",
                          transformOrigin: "center"
                        }}
                      >
                        R
                      </motion.span>
                    </motion.h1>

                    {/* Glow effect behind text */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
                        filter: "blur(20px)"
                      }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.8, 1.1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Progress Percentage */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center"
                  >
                    <motion.p
                      className={`font-medium tracking-wider tabular-nums ${isMobile ? 'text-xs' : 'text-sm'}`}
                      style={{ 
                        color: "#a78bfa",
                        fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace"
                      }}
                    >
                      {progress.toString().padStart(3, '0')}%
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Elegant Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-20 text-center"
            >
              <motion.p
                className="text-lg font-light tracking-[0.3em] uppercase"
                style={{ color: "#e0e7ff" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Loading Portfolio
              </motion.p>

              {/* Elegant dots animation */}
              <div className="flex justify-center mt-8 space-x-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #a21caf, #7c3aed 90%)`
                    }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Elegant corner accents */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-20 h-20"
              style={{
                [corner < 2 ? 'top' : 'bottom']: '3rem',
                [corner % 2 === 0 ? 'left' : 'right']: '3rem',
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 2.5,
                delay: corner * 0.4,
                repeat: Infinity,
              }}
            >
              <div
                className="w-full h-full rounded-tl-lg"
                style={{
                  borderLeft: "2px solid #7c3aed55",
                  borderTop: "2px solid #a21caf44",
                  transform: `rotate(${corner * 90}deg)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
