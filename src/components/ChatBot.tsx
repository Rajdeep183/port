import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
  hasLinks?: boolean;
}

interface ConversationContext {
  topics: string[];
  userPreferences: string[];
  previousQuestions: string[];
  conversationFlow: string;
  mentionedProjects: string[];
  askedAbout: string[];
}

// Enhanced knowledge base with much more detail
const portfolioKnowledge = {
  personal: {
    name: "Rajdeep Roy",
    age: () => new Date().getFullYear() - 2004,
    birthday: "June 7, 2004",
    location: "India",
    email: "royrajdeep20@gmail.com",
    personality: "innovative, detail-oriented, passionate about technology, problem-solver",
    interests: ["Machine Learning", "AI", "Cloud Computing", "Data Science", "Open Source", "Full-Stack Development"],
    philosophy: "leveraging cutting-edge technology to solve real-world problems and create meaningful impact"
  },
  education: {
    university: "Vellore Institute of Technology (VIT), Vellore",
    degree: "B.Tech in Computer Science and Engineering", 
    graduation: "Expected 2026",
    gpa: "Strong academic performance",
    coursework: ["Data Structures & Algorithms", "Machine Learning", "Database Management", "Cloud Computing", "Software Engineering"]
  },
  experience: [
    {
      company: "SOL Analytics",
      location: "Dubai, UAE",
      role: "Data Engineering Intern",
      duration: "2023",
      description: "Built automated data pipelines and analytics systems using Python and Dataiku. Developed real-time data processing solutions and optimized database performance for large-scale analytics.",
      technologies: ["Python", "Dataiku", "SQL", "Data Pipelines", "Analytics"],
      achievements: ["Automated critical data workflows", "Improved processing efficiency by 40%", "Built scalable analytics infrastructure"]
    },
    {
      company: "VECC (Department of Atomic Energy, Govt. of India)",
      location: "India",
      role: "Software Development Intern", 
      duration: "2023",
      description: "Developed secure OTP systems and security solutions in Python. Worked on government-level security protocols and authentication systems.",
      technologies: ["Python", "Security Systems", "Authentication", "Government Protocols"],
      achievements: ["Implemented secure authentication systems", "Enhanced security protocols", "Worked with sensitive government data"]
    }
  ],
  skills: {
    programming: ["Python", "JavaScript", "TypeScript", "SQL", "Java"],
    backend: ["Node.js", "Django", "Flask", "RESTful APIs"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
    ml_ai: ["Machine Learning", "Deep Learning", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"],
    tools: ["Git", "Linux", "Dataiku", "Figma", "Jupyter", "VS Code"],
    specializations: ["Data Engineering", "AI Integration", "Full-Stack Development", "Cloud Architecture"]
  },
  certifications: [
    "AWS Solutions Architect Associate",
    "Dataiku ML Practitioner", 
    "Data Science Foundations",
    "Cloud Computing Certification"
  ],
  projects: [
    {
      name: "Stock Price Predictor",
      description: "Advanced ML model for stock market prediction using deep learning algorithms",
      technologies: ["Python", "TensorFlow", "Pandas", "Financial APIs"],
      impact: "Achieved 85% accuracy in short-term predictions"
    },
    {
      name: "Real Estate Price Predictor", 
      description: "ML model for real estate valuation with high accuracy",
      technologies: ["Python", "Scikit-learn", "Feature Engineering"],
      impact: "91% R² score with comprehensive market analysis"
    },
    {
      name: "Recommendation System",
      description: "Collaborative filtering system for personalized recommendations",
      technologies: ["Python", "Machine Learning", "Collaborative Filtering"],
      impact: "Improved user engagement by 65%"
    },
    {
      name: "Plant Disease Detection",
      description: "AI-powered system for identifying plant diseases from images",
      technologies: ["Deep Learning", "Computer Vision", "CNN"],
      impact: "95% accuracy in disease identification"
    }
  ],
  leadership: [
    {
      role: "Project & Events Head",
      organization: "IETE ISF, VIT Vellore",
      responsibilities: ["Led technical workshops and seminars", "Organized cloud computing events", "Managed AI and ML workshops"],
      achievements: ["Successfully organized 15+ technical events", "Led teams of 20+ members", "Received leadership recognition awards"]
    }
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/rajdeep-roy-4086a2274/",
    github: "https://github.com/Rajdeep183",
    email: "royrajdeep20@gmail.com",
    website: "https://royfolio.me"
  }
};

// Advanced intent analysis with machine learning concepts
const intents = {
  greeting: /\b(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/i,
  personal: /\b(age|old|birthday|birth|personal|about you|tell me about)\b/i,
  education: /\b(school|college|university|study|studies|education|degree|vit|vellore)\b/i,
  experience: /\b(work|job|internship|experience|company|sol analytics|vecc|career)\b/i,
  skills: /\b(skills?|technologies?|programming|languages?|frameworks?|tools?|tech stack)\b/i,
  projects: /\b(projects?|portfolio|work|built|created|developed|stock|real estate|recommendation|plant)\b/i,
  certifications: /\b(certification|certified|aws|dataiku|certificate)\b/i,
  leadership: /\b(leadership|lead|manage|event|workshop|iete)\b/i,
  contact: /\b(contact|email|reach|hire|linkedin|github)\b/i,
  specific_project: /\b(stock|real estate|recommendation|plant|disease|prediction)\b/i,
  technologies: /\b(python|javascript|sql|aws|machine learning|ai|cloud)\b/i,
  achievements: /\b(achievement|award|recognition|success|accomplishment)\b/i,
  future: /\b(future|plan|goal|next|career|aspiration)\b/i,
  general: /.*/
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm Rajdeep's advanced AI assistant with deep knowledge about his professional journey, technical expertise, and achievements. I can provide detailed insights about his experience at SOL Analytics and VECC, discuss his projects, or help you connect with him. What would you like to explore?",
      sender: 'bot',
      timestamp: new Date(),
      confidence: 1.0,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    topics: [],
    userPreferences: [],
    previousQuestions: [],
    conversationFlow: 'greeting',
    mentionedProjects: [],
    askedAbout: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced intent analysis with context awareness
  const analyzeUserIntent = (message: string, conversationContext: ConversationContext): string => {
    const lowercase = message.toLowerCase();
    
    // Context-aware analysis
    if (conversationContext.askedAbout.includes('projects') && /\b(more|tell me|details|specific)\b/i.test(lowercase)) {
      return 'specific_project';
    }
    
    // Multi-intent detection
    const detectedIntents = [];
    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(lowercase)) detectedIntents.push(intent);
    }
    
    // Return most specific intent
    if (detectedIntents.includes('specific_project')) return 'specific_project';
    if (detectedIntents.includes('experience')) return 'experience';
    if (detectedIntents.includes('projects')) return 'projects';
    if (detectedIntents.includes('skills')) return 'skills';
    
    return detectedIntents[0] || 'general';
  };

  // Smart response generation with context awareness
  const generateIntelligentResponse = (userMessage: string, context: ConversationContext): { text: string, hasLinks: boolean } => {
    const intent = analyzeUserIntent(userMessage, context);
    const lowerMsg = userMessage.toLowerCase();

    // Check for LinkedIn-specific mentions
    if (lowerMsg.includes('linkedin') || lowerMsg.includes('linked in')) {
      return {
        text: `🔗 **LinkedIn Connection:**\n\nConnect with Rajdeep Roy on LinkedIn to see his professional network, endorsements, and latest updates:`,
        hasLinks: true
      };
    }

    // Check for GitHub-specific mentions
    if (lowerMsg.includes('github') || lowerMsg.includes('git hub')) {
      return {
        text: `💻 **GitHub Profile:**\n\nExplore Rajdeep's code repositories, open source contributions, and technical projects:`,
        hasLinks: true
      };
    }

    switch (intent) {
      case 'greeting':
        return {
          text: "Hello! 👋 I'm here to help you learn about Rajdeep Roy. I have comprehensive knowledge about his:\n\n🎓 Education at VIT Vellore\n💼 Professional experience at SOL Analytics & VECC\n🚀 Technical projects and achievements\n🏆 Leadership roles and certifications\n\nWhat aspect interests you most?",
          hasLinks: false
        };

      case 'personal':
        return {
          text: `👨‍💻 **About Rajdeep Roy:**\n\n• ${portfolioKnowledge.personal.age()} years old (born ${portfolioKnowledge.personal.birthday})\n• Based in ${portfolioKnowledge.personal.location}\n• Passionate about ${portfolioKnowledge.personal.interests.join(', ')}\n• Philosophy: ${portfolioKnowledge.personal.philosophy}\n\nHe's known for being ${portfolioKnowledge.personal.personality}!`,
          hasLinks: false
        };

      case 'education':
        const edu = portfolioKnowledge.education;
        return {
          text: `🎓 **Education Background:**\n\n**${edu.university}**\n• Degree: ${edu.degree}\n• Graduation: ${edu.graduation}\n• Academic Excellence: ${edu.gpa}\n\n**Key Coursework:**\n${edu.coursework.map(course => `• ${course}`).join('\n')}\n\nVIT Vellore is one of India's premier technical universities, known for innovation and industry partnerships.`,
          hasLinks: false
        };

      case 'experience':
        return {
          text: `💼 **Professional Experience:**\n\n**SOL Analytics, Dubai (2023)**\n🔹 Role: Data Engineering Intern\n🔹 Built automated data pipelines using Python & Dataiku\n🔹 Developed real-time analytics systems\n🔹 Achievements: 40% efficiency improvement\n\n**VECC - Dept. of Atomic Energy, Govt. of India (2023)**\n🔹 Role: Software Development Intern\n🔹 Developed secure OTP & authentication systems\n🔹 Worked with government-level security protocols\n🔹 Enhanced critical security infrastructure\n\nBoth roles involved cutting-edge technology and real-world impact!`,
          hasLinks: false
        };

      case 'skills':
        const skills = portfolioKnowledge.skills;
        return {
          text: `⚡ **Technical Expertise:**\n\n**Programming:** ${skills.programming.join(', ')}\n\n**Backend Development:** ${skills.backend.join(', ')}\n\n**Databases:** ${skills.databases.join(', ')}\n\n**Cloud & DevOps:** ${skills.cloud.join(', ')}\n\n**ML/AI:** ${skills.ml_ai.join(', ')}\n\n**Tools:** ${skills.tools.join(', ')}\n\n**Specializations:**\n${skills.specializations.map(spec => `🎯 ${spec}`).join('\n')}\n\nRajdeep has hands-on experience with enterprise-level implementations!`,
          hasLinks: false
        };

      case 'projects':
        return {
          text: `🚀 **Featured Projects:**\n\n**1. Stock Price Predictor**\n• Advanced ML model with 85% accuracy\n• Technologies: TensorFlow, Python, Financial APIs\n• Real-time market prediction capabilities\n\n**2. Real Estate Price Predictor**\n• Achieved impressive 91% R² score\n• Comprehensive market analysis features\n• Technologies: Scikit-learn, Feature Engineering\n\n**3. AI Recommendation System**\n• 65% improvement in user engagement\n• Collaborative filtering algorithms\n• Personalized user experience\n\n**4. Plant Disease Detection**\n• 95% accuracy using Computer Vision\n• CNN-based deep learning model\n• Agricultural impact and sustainability focus\n\nEach project demonstrates real-world problem solving! Would you like details about any specific project?`,
          hasLinks: false
        };

      case 'certifications':
        return {
          text: `🏆 **Professional Certifications:**\n\n${portfolioKnowledge.certifications.map(cert => `✅ ${cert}`).join('\n')}\n\nThese certifications validate Rajdeep's expertise in cloud computing, machine learning, and data science. The AWS Solutions Architect certification is particularly valuable for enterprise cloud solutions!`,
          hasLinks: false
        };

      case 'leadership':
        const leadership = portfolioKnowledge.leadership[0];
        return {
          text: `👑 **Leadership Experience:**\n\n**${leadership.role} - ${leadership.organization}**\n\n**Key Responsibilities:**\n${leadership.responsibilities.map(resp => `• ${resp}`).join('\n')}\n\n**Major Achievements:**\n${leadership.achievements.map(ach => `🎉 ${ach}`).join('\n')}\n\nRajdeep has demonstrated strong leadership skills in technical communities and event management!`,
          hasLinks: false
        };

      case 'contact':
        return {
          text: `📞 **Connect with Rajdeep:**\n\nReady to connect? Here are the best ways to reach Rajdeep Roy:`,
          hasLinks: true
        };

      case 'specific_project':
        if (lowerMsg.includes('stock')) {
          return {
            text: `📈 **Stock Price Predictor - Deep Dive:**\n\n**Overview:** Advanced machine learning model for financial market prediction\n\n**Technical Implementation:**\n• Deep Learning with TensorFlow\n• Feature engineering from multiple market indicators\n• Real-time data processing with financial APIs\n• LSTM networks for time series analysis\n\n**Performance:**\n• 85% accuracy in short-term predictions\n• Handles volatile market conditions\n• Backtested on 5+ years of historical data\n\n**Business Impact:**\n• Risk assessment capabilities\n• Portfolio optimization insights\n• Real-time trading signal generation\n\nThis project showcases Rajdeep's expertise in both ML and financial domain knowledge!`,
            hasLinks: false
          };
        }
        // Add more specific project details...
        break;

      case 'achievements':
        return {
          text: `🏆 **Key Achievements:**\n\n**Academic Excellence:**\n• Strong performance at VIT Vellore\n• Multiple technical certifications\n\n**Professional Impact:**\n• 40% efficiency improvement at SOL Analytics\n• Government-level security system development\n• Real-world data pipeline automation\n\n**Leadership Recognition:**\n• Successfully organized 15+ technical events\n• Led teams of 20+ members\n• Awards for cloud computing seminars\n\n**Technical Accomplishments:**\n• 91% R² score in ML model\n• 95% accuracy in AI vision system\n• Open source contributions\n\nEach achievement represents real value creation and technical excellence!`,
          hasLinks: false
        };

      case 'future':
        return {
          text: `🚀 **Future Aspirations:**\n\nRajdeep is focused on:\n\n**Career Goals:**\n• Full-stack development with AI integration\n• Cloud architecture and scalable systems\n• Leading innovative tech teams\n• Building products that create real-world impact\n\n**Technical Interests:**\n• Advanced machine learning applications\n• Cloud-native development\n• Open source contributions\n• Emerging technologies like quantum computing\n\n**Vision:**\nLeveraging cutting-edge technology to solve complex problems and create meaningful impact in the tech industry.\n\nHe's always open to exciting opportunities and collaborations!`,
          hasLinks: false
        };

      default:
        const randomFacts = [
          `🔍 **Did you know?** Rajdeep has experience with both government-level security systems (VECC) and international business analytics (SOL Analytics, Dubai)!`,
          `⚡ **Impressive fact:** His real estate prediction model achieved a 91% R² score, which is exceptionally high for real estate valuation!`,
          `🌟 **Leadership highlight:** As Project & Events Head at IETE ISF, he successfully organized 15+ technical events and led teams of 20+ members!`,
          `🤖 **AI Excellence:** His plant disease detection system achieved 95% accuracy, potentially helping farmers worldwide!`,
          `☁️ **Cloud Certified:** Rajdeep is AWS Solutions Architect certified, demonstrating enterprise-level cloud expertise!`
        ];
        return {
          text: randomFacts[Math.floor(Math.random() * randomFacts.length)] + "\n\nWhat specific aspect would you like to explore further? I can discuss his projects, experience, skills, or help you connect with him!",
          hasLinks: false
        };
    }

    return { text: "I'd be happy to help you learn more about Rajdeep! What specific aspect interests you?", hasLinks: false };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Update context
    const newContext = {
      ...context,
      previousQuestions: [...context.previousQuestions, inputValue].slice(-5),
      topics: [...new Set([...context.topics, ...inputValue.split(' ').filter(word => word.length > 3)])].slice(-10)
    };
    setContext(newContext);

    // Generate intelligent response
    const responseText = generateIntelligentResponse(inputValue, newContext);

    // Simulate realistic typing delay
    const typingDelay = Math.min(Math.max(responseText.text.length * 20, 1000), 3000);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText.text,
        sender: 'bot',
        timestamp: new Date(),
        confidence: 1.0,
        hasLinks: responseText.hasLinks
      };
      setMessages(prev => prev.concat(botResponse));
      setIsTyping(false);
    }, typingDelay);

    setInputValue('');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="relative">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 text-white">
              <h3 className="font-semibold flex items-center gap-2">
                <Bot size={20} />
                Rajdeep's AI Assistant
                <Sparkles size={16} className="text-yellow-300" />
              </h3>
              <p className="text-xs opacity-90 mt-1">Powered by advanced NLP • Context-aware responses</p>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white ml-4'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 mr-4 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.sender === 'bot' ? (
                        <div className="flex items-center gap-1">
                          <Bot size={14} />
                          {message.confidence && (
                            <div className="flex gap-1">
                              {[...Array(Math.ceil(message.confidence * 3))].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-green-500 rounded-full" />
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <User size={14} />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    
                    {/* Render clickable links for contact messages */}
                    {message.hasLinks && message.sender === 'bot' && (
                      <div className="mt-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={portfolioKnowledge.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                          >
                            <Linkedin size={12} />
                            LinkedIn
                            <ExternalLink size={10} />
                          </a>
                          <a
                            href={portfolioKnowledge.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-xs rounded-lg transition-colors"
                          >
                            <Github size={12} />
                            GitHub
                            <ExternalLink size={10} />
                          </a>
                          <a
                            href={`mailto:${portfolioKnowledge.links.email}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                          >
                            <Mail size={12} />
                            Email
                          </a>
                          <a
                            href="https://docs.google.com/document/d/1XUs4nQxRFyKGnd96vhWwu5U9xHkN3WhGlM8BjMkGsMQ/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg transition-colors"
                          >
                            <FileText size={12} />
                            Resume
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 p-3 rounded-lg mr-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Bot size={14} />
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-cyan-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask me anything about Rajdeep..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Context-aware</span>
                <span>•</span>
                <span>Smart responses</span>
                <span>•</span>
                <span>Press Enter to send</span>
              </div>
              {/* Clickable GitHub and LinkedIn links */}
              <div className="flex gap-4 justify-center mt-3">
                <a
                  href="https://github.com/Rajdeep183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 underline font-medium"
                >
                  GitHub
                </a>
                <span>|</span>
                <a
                  href="https://www.linkedin.com/in/rajdeep-roy-4086a2274/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 underline font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
