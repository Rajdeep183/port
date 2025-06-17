import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { SimpleScene3D } from '../components/3d/SimpleScene3D';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navigation } from '../components/Navigation';
import { ChatBot } from '../components/ChatBot';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ThemeProvider } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Rajdeep Roy - Software Developer | Machine Learning Enthusiast</title>
        <meta name="description" content="Portfolio of Rajdeep Roy - Software Developer and ML Enthusiast showcasing projects in machine learning, data science, and web development." />
        <meta name="keywords" content="Rajdeep Roy, Software Developer, Machine Learning, ML Engineer, Data Science, Portfolio, Projects" />
        <link rel="canonical" href="https://rajdeeproy21.com/" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background relative overflow-hidden">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen">
          {/* 3D Scene */}
          <div className="absolute inset-0 z-10">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 75 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <SimpleScene3D />
              </Suspense>
            </Canvas>
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-20 flex items-center justify-center min-h-screen">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center text-foreground px-6"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Rajdeep Roy
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                ML Enthusiast & Software Developer
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <a 
                  href="https://www.linkedin.com/in/rajdeep-roy-4086a2274/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Rajdeep183" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-colors"
                >
                  GitHub
                </a>
                <a 
  href="https://docs.google.com/document/d/1XUs4nQxRFyKGnd96vhWwu5U9xHkN3WhGlM8BjMkGsMQ/edit?usp=sharing" 
  target="_blank" 
  rel="noopener noreferrer"
  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
>
  Resume
</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Loading Screen */}
        <LoadingScreen />
        
        {/* Chatbot */}
        <ChatBot />
      </div>
    </ThemeProvider>
  );
};

export default Index;
