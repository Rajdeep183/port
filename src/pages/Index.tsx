import { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoadingScreen } from '../components/LoadingScreen';
import { ThemeProvider } from '../contexts/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { SimpleScene3D } from '../components/3d/SimpleScene3D';
import { Navigation } from '../components/Navigation';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ChatBot } from '../components/ChatBot';

const Index = () => {
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMainContentVisible(true);
    }, 200);
  }, []);

  const animationVariants = {
    container: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
    },
    background: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
    },
  };

  return (
    <ThemeProvider>
      <Helmet>
        <title>Rajdeep Roy - Software Developer | Machine Learning Engineer | Data Science Portfolio</title>
        <meta name="description" content="Official portfolio of Rajdeep Roy - Software Developer, ML Engineer, and Data Science enthusiast from VIT Vellore." />
      </Helmet>
      <AnimatePresence mode="wait">
        {!isMainContentVisible ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            variants={animationVariants.container}
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background relative overflow-hidden"
          >
            <Navigation />
            <section id="home" className="relative min-h-screen">
              <motion.div
                variants={animationVariants.background}
                className="absolute inset-0 z-0"
              >
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 75 }}
                  gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                  dpr={[1, 2]}
                >
                  <Suspense fallback={null}>
                    <SimpleScene3D />
                  </Suspense>
                </Canvas>
              </motion.div>
              <motion.div
                className="relative z-20 flex items-center justify-center min-h-screen"
              >
                <div className="text-center text-foreground px-6">
                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
                    Rajdeep Roy
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    ML Engineer & Software Developer
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a href="https://www.linkedin.com/in/rajdeep-roy-4086a2274/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      LinkedIn
                    </a>
                    <a href="https://github.com/Rajdeep183" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-colors">
                      GitHub
                    </a>
                    <a href="https://docs.google.com/document/d/1XUs4nQxRFyKGnd96vhWwu5U9xHkN3WhGlM8BjMkGsMQ/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      Resume
                    </a>
                  </div>
                </div>
              </motion.div>
            </section>
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <ChatBot />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;
