import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', href: '#home', ariaLabel: 'Navigate to Rajdeep Roy\'s home section' },
    { icon: User, label: 'About', href: '#about', ariaLabel: 'Learn about Rajdeep Roy\'s background and skills' },
    { icon: Briefcase, label: 'Projects', href: '#projects', ariaLabel: 'View Rajdeep Roy\'s software and ML projects' },
    { icon: Mail, label: 'Contact', href: '#contact', ariaLabel: 'Contact Rajdeep Roy for opportunities' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6" aria-label="Main navigation for Rajdeep Roy's portfolio">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-foreground cursor-pointer"
          onClick={() => handleNavClick('#home')}
          aria-label="Rajdeep Roy's Portfolio"
        >
          <span className="sr-only">Rajdeep Roy</span>
          <span aria-hidden="true">RR</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8 items-center"
        >
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-foreground hover:text-cyan-400 transition-colors flex items-center gap-2"
              aria-label={item.ariaLabel}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-foreground hover:text-cyan-400 transition-colors p-2"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="text-foreground p-2"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border"
          role="menu"
          aria-label="Mobile navigation menu for Rajdeep Roy's portfolio"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left text-foreground hover:text-cyan-400 transition-colors py-2 flex items-center gap-2"
              role="menuitem"
              aria-label={item.ariaLabel}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
