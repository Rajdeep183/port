import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SimpleScene3D } from '../components/3d/SimpleScene3D';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navigation } from '../components/Navigation';
import { ChatBot } from '../components/ChatBot';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ThemeProvider } from '../contexts/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// SEO-friendly content section with rich text and keyword optimization
const SeoContent = () => {
  return (
    <div className="sr-only">
      <h2>About Rajdeep Roy - Software Developer & Machine Learning Engineer</h2>
      <p>
        Rajdeep Roy is a talented Software Developer and Machine Learning Engineer with expertise in full-stack development,
        data science, and AI applications. A Computer Science graduate from VIT Vellore, Rajdeep has professional experience
        at SOL Analytics where he built scalable data pipelines and optimized reporting systems.
      </p>
      <p>
        As a Project & Events Head at IETE ISF, Rajdeep Roy led multiple technical events and workshops, demonstrating
        his leadership abilities alongside his technical skills. His portfolio showcases projects in stock price prediction,
        real estate prediction, recommendation systems, and plant disease detection.
      </p>
      <p>
        Rajdeep Roy's technical skills include Python, TypeScript, React, Machine Learning, Data Engineering, AWS, and more.
        You can contact Rajdeep Roy via email at royrajdeep20@gmail.com or connect on LinkedIn and GitHub.
      </p>
      <h3>Key Projects by Rajdeep Roy</h3>
      <ul>
        <li>Stock price predictor using advanced machine learning models</li>
        <li>Real Estate Predictor with 91% R² score</li>
        <li>Collaborative filtering recommendation system</li>
        <li>Plant disease detection using machine learning</li>
      </ul>
    </div>
  );
};

const Index = () => {
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile devices for performance optimization
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Add useEffect to ping Google's indexing API when the page loads
  useEffect(() => {
    // This is a way to inform Google about your site changes
    // You should implement a proper server-side solution for production
    const pingSearchEngines = async () => {
      try {
        // This is a simplified example - in production, use a server endpoint
        console.log('Pinging search engines for indexing...');
        // In a real implementation, you'd make server-side requests to indexing APIs
      } catch (error) {
        console.error('Error pinging search engines:', error);
      }
    };

    pingSearchEngines();

    // Track page views for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_title: 'Rajdeep Roy - Portfolio',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  const handleLoadingComplete = () => {
    // Faster transition on mobile
    setTimeout(() => {
      setIsMainContentVisible(true);
    }, isMobile ? 100 : 200);
  };

  // Mobile-optimized animation variants
  const mobileVariants = {
    mainContainer: {
      initial: { opacity: 0, scale: isMobile ? 1 : 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: isMobile ? 0.8 : 1.2, 
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: isMobile ? 0.05 : 0.1
        }
      }
    },
    navigation: {
      initial: { opacity: 0, y: isMobile ? -10 : -20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.1 : 0.2 }
      }
    },
    scene3d: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration: isMobile ? 1.0 : 1.5, delay: isMobile ? 0.15 : 0.3 }
      }
    },
    heroContent: {
      initial: { opacity: 0, y: isMobile ? 15 : 30, scale: isMobile ? 1 : 0.95 },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: isMobile ? 0.7 : 1, delay: isMobile ? 0.3 : 0.6 }
      }
    },
    heroTitle: {
      initial: { opacity: 0, scale: isMobile ? 0.95 : 0.8 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: isMobile ? 0.8 : 1.2, delay: isMobile ? 0.4 : 0.8 }
      }
    },
    heroSubtitle: {
      initial: { opacity: 0, y: isMobile ? 10 : 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.5 : 1.0 }
      }
    },
    heroButtons: {
      initial: { opacity: 0, y: isMobile ? 10 : 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.6 : 1.2 }
      }
    },
    section: {
      initial: { opacity: 0, y: isMobile ? 25 : 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: isMobile ? 0.6 : 0.8 }
      }
    }
  };

  return (
    <ThemeProvider>
      <Helmet>
        <title>Rajdeep Roy - Software Developer | Machine Learning Engineer | Data Science Portfolio</title>
        <meta name="description" content="Official portfolio of Rajdeep Roy - Software Developer, ML Engineer, and Data Science enthusiast from VIT Vellore. Expert in React, Three.js, and full-stack development with professional experience at SOL Analytics." />
        <meta name="keywords" content="Rajdeep Roy, Software Developer, Machine Learning Engineer, Data Science, ML Engineer, VIT Vellore, Portfolio, React Developer, Three.js, Projects, Full-Stack Developer, rajdeeproy21.com" />
        <link rel="canonical" href="https://rajdeeproy21.com/" />
        
        {/* Additional SEO meta tags */}
        <meta property="article:author" content="Rajdeep Roy" />
        <meta property="article:published_time" content="2025-06-18T12:00:00+00:00" />
        <meta property="article:modified_time" content="2025-06-18T12:00:00+00:00" />
        
        {/* Preload key resources */}
        <link rel="preload" href="/profile.jpg" as="image" />
        <link rel="preload" href="/thumbnail.png" as="image" />
        
        {/* Schema.org markup as JSON-LD for current page */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2025-06-18T12:00:00+00:00",
            "dateModified": "2025-06-18T12:00:00+00:00",
            "mainEntity": {
              "@type": "Person",
              "name": "Rajdeep Roy",
              "url": "https://rajdeeproy21.com",
              "jobTitle": "Software Developer & ML Engineer",
              "description": "Computer Science graduate from VIT Vellore specializing in Software Development, Machine Learning, and Data Science"
            }
          }
        `}</script>
      </Helmet>
      
      <AnimatePresence mode="wait">
        {!isMainContentVisible ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main-content"
            variants={mobileVariants.mainContainer}
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background relative overflow-hidden"
            style={{
              // Hardware acceleration for mobile
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {/* Hidden SEO content that's still readable by search engines */}
            <SeoContent />
            
            {/* Navigation */}
            <motion.div
              variants={mobileVariants.navigation}
              style={{ willChange: 'transform' }}
            >
              <Navigation />
            </motion.div>
            
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen">
              {/* 3D Scene - Conditionally rendered with reduced complexity on mobile */}
              <motion.div 
                className="absolute inset-0 z-10"
                variants={mobileVariants.scene3d}
                style={{ willChange: 'opacity' }}
              >
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 75 }}
                  gl={{ 
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    alpha: true,
                    powerPreference: isMobile ? "low-power" : "high-performance"
                  }}
                  dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
                  performance={{ min: isMobile ? 0.7 : 0.5 }} // Adjust performance threshold
                >
                  <Suspense fallback={null}>
                    <SimpleScene3D />
                  </Suspense>
                </Canvas>
              </motion.div>

              {/* Hero Content Overlay */}
              <div className="relative z-20 flex items-center justify-center min-h-screen">
                <motion.div 
                  variants={mobileVariants.heroContent}
                  className="text-center text-foreground px-6"
                  style={{ willChange: 'transform' }}
                >
                  <motion.h1 
                    className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6"
                    variants={mobileVariants.heroTitle}
                  >
                    Rajdeep Roy
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                    variants={mobileVariants.heroSubtitle}
                  >
                    ML Engineer & Software Developer
                  </motion.p>
                  <motion.div
                    className="flex gap-4 justify-center"
                    variants={mobileVariants.heroButtons}
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
            <motion.div
              variants={mobileVariants.section}
              animate="animate"
              transition={{ delay: isMobile ? 0.7 : 1.4 }}
              style={{ willChange: 'transform' }}
            >
              <AboutSection />
            </motion.div>

            {/* Projects Section */}
            <motion.div
              variants={mobileVariants.section}
              animate="animate"
              transition={{ delay: isMobile ? 0.8 : 1.6 }}
              style={{ willChange: 'transform' }}
            >
              <ProjectsSection />
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={mobileVariants.section}
              animate="animate"
              transition={{ delay: isMobile ? 0.9 : 1.8 }}
              style={{ willChange: 'transform' }}
            >
              <ContactSection />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ChatBot - Outside AnimatePresence for immediate visibility */}
      {isMainContentVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: isMobile ? 0.5 : 1.0,
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
          className="fixed bottom-0 right-0 z-[9999]"
          style={{ willChange: 'transform' }}
        >
          <ChatBot />
        </motion.div>
      )}
    </ThemeProvider>
  );
};

export default Index;
