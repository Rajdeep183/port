import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center overflow-hidden"
        >
          {/* Elegant Background Pattern */}
          <div className="absolute inset-0">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-800/10 via-transparent to-slate-900/30" />
            
            {/* Floating background particles */}
            {backgroundParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-violet-400/20"
                style={{ 
                  left: `${particle.x}%`, 
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
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
                    <circle cx="30" cy="30" r="1" fill="#8B5CF6" opacity="0.3"/>
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
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full opacity-60"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
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
                className="absolute w-72 h-72 rounded-full border border-purple-500/20"
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
                className="absolute w-60 h-60 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner counter-rotating ring */}
              <motion.div
                className="absolute w-52 h-52 rounded-full border border-purple-400/30"
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
                    stroke="#374151"
                    strokeWidth="6"
                    fill="none"
                    opacity="0.3"
                  />
                  
                  {/* Progress Circle */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="553"
                    strokeDashoffset="553"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: 553 - (progress / 100) * 553 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(147, 51, 234, 0.6))",
                    }}
                  />
                  
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Animated RR Text */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 1, 
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 150,
                      delay: 0.3
                    }}
                    className="flex items-center justify-center"
                  >
                    <motion.h1
                      className="text-7xl font-light text-white leading-none tracking-wider"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))",
                        textShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
                      }}
                      animate={{
                        textShadow: [
                          "0 0 15px rgba(147, 51, 234, 0.3)",
                          "0 0 25px rgba(147, 51, 234, 0.5)",
                          "0 0 15px rgba(147, 51, 234, 0.3)"
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      RR
                    </motion.h1>
                  </motion.div>

                  {/* Progress Percentage */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-3 flex items-center justify-center"
                  >
                    <motion.p
                      className="text-sm font-medium text-purple-300 tracking-wider"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ 
                        duration: 1.8, 
                        repeat: Infinity 
                      }}
                    >
                      {progress}%
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
                className="text-lg font-light text-white tracking-[0.3em] uppercase"
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
                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"
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
                className="w-full h-full border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg"
                style={{ transform: `rotate(${corner * 90}deg)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
