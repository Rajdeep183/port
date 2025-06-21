import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
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
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background relative overflow-hidden">
        {/* Hidden SEO content that's still readable by search engines */}
        <SeoContent />
        
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
                ML Engineer & Software Developer
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
