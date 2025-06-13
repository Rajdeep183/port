import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
}

interface ConversationContext {
  topics: string[];
  userPreferences: string[];
  previousQuestions: string[];
  conversationFlow: string;
}

const portfolioKnowledge = {
  personal: {
    name: "Rajdeep Roy",
    age: () => new Date().getFullYear() - 2004,
    birthday: "June 7, 2004",
    location: "India",
    email: "royrajdeep20@gmail.com",
    personality: "innovative, detail-oriented, passionate about technology",
    interests: ["AI/ML", "cloud computing", "open source"],
    philosophy: "leveraging technology to solve real-world problems"
  },
  skills: {
    backend: ["Python", "SQL"],
    databases: ["PostgreSQL"],
    cloud: [],
    tools: ["Git", "Linux", "Dataiku", "Figma"],
    specializations: ["AI integration"]
  },
  education: [
    {
      school: "Vellore Institute of Technology (VIT), Vellore",
      degree: "B.Tech in Computer Science and Engineering",
      graduation: "Expected 2026"
    }
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/rajdeep-roy-4086a2274/",
    github: "https://github.com/Rajdeep183",
    twitter: "https://twitter.com/_rajdeep_roy",
    website: "https://royfolio.me"
  },
  facts: [
    "Rajdeep Roy is pursuing a B.Tech in Computer Science and Engineering at Vellore Institute of Technology (VIT), Vellore.",
    "He is expected to graduate in 2026.",
    "He is AWS Solutions Architect certified.",
    "He holds the Dataiku ML Practitioner certification.",
    "He completed the Data Science Foundations course.",
    "He interned at VECC (Dept. of Atomic Energy, Govt. of India) as a Software Development Intern in 2023.",
    "At VECC, he developed OTP systems and security solutions in Python.",
    "He worked as a Data Engineering Intern at SOL Analytics, Dubai, in 2023.",
    "At SOL Analytics, he built automated data pipelines and analytics systems using Python and Dataiku.",
    "He served as Project & Events Head at IETE ISF, VIT Vellore.",
    "He led technical workshops and seminars at university.",
    "He organized cloud computing and AI events.",
    "Rajdeep is skilled in Python, SQL, and PostgreSQL.",
    "He is proficient in using Git for version control and Linux for development.",
    "He uses Dataiku for data engineering and Figma for design.",
    "He specializes in AI integration.",
    "He has experience building data-intensive applications and analytics solutions.",
    "He automated a real-world data pipeline during his internship in Dubai.",
    "He has created dashboards for data visualization using Python and PostgreSQL.",
    "He received awards for cloud computing seminars.",
    "He was recognized for leadership in AI workshops.",
    "He is an active open source contributor.",
    "His GitHub handle is Rajdeep183.",
    "His LinkedIn profile is linkedin.com/in/rajdeep-roy-2004.",
    "He has contributed to open source projects in Python and SQL.",
    "He maintains public projects on GitHub including data science and AI repositories.",
    "He has over 20 repositories on GitHub.",
    "Rajdeep is based in India.",
    "He is passionate about AI/ML and cloud computing.",
    "He enjoys sci-fi movies and chess.",
    // Add more if you want!
  ]
};

const internshipInfo = `
**Internship Experience:**

- Software Development Intern at VECC (Department of Atomic Energy, Govt. of India) — 2023
  - Developed OTP systems and security solutions in Python.

- Data Engineering Intern at SOL Analytics, Dubai — 2023
  - Built automated data pipelines and analytics systems using Python and Dataiku.

[LinkedIn Profile](https://www.linkedin.com/in/rajdeep-roy-2004/)
`;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Rajdeep's AI assistant. I have deep knowledge about his expertise, projects, and professional journey. What would you like to explore today?",
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
    conversationFlow: 'greeting'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const intents = {
    greeting: /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i,
    age: /\b(age|how old|birthday|birth date)\b/i,
    school: /\b(school|college|university|study|studies|education|alma mater)\b/i,
    linkedin: /\b(linkedin)\b/i,
    github: /\b(github)\b/i,
    twitter: /\b(twitter|tweet)\b/i,
    website: /\b(website|portfolio|personal site)\b/i,
    location: /\b(location|country|city|where from|where live|reside)\b/i,
    email: /\b(email|mail)\b/i,
    fun_fact: /\b(fun fact|funny|joke|random|something cool|did you know)\b/i,
    skills: /\b(skills?|technologies?|programming|languages?|frameworks?|tools?)\b/i,
    specializations: /\b(specialization|specialities|focus|expertise)\b/i,
    general: /.*/
  };

  const analyzeUserIntent = (message: string): string => {
    const lowercase = message.toLowerCase();
    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(lowercase)) return intent;
    }
    return 'general';
  };

  // <--- CHANGE IS HERE: Add internship keyword check at the top --->
  const generateIntelligentResponse = (userMessage: string): string => {
    const lowercaseMsg = userMessage.toLowerCase();
    if (lowercaseMsg.includes("internship") || lowercaseMsg.includes("internships")) {
      return internshipInfo;
    }
    const intent = analyzeUserIntent(userMessage);

    switch (intent) {
      case 'greeting':
        return "Hello! How can I assist you in learning more about Rajdeep?";
      case 'age':
        return `Rajdeep is ${portfolioKnowledge.personal.age()} years old (born ${portfolioKnowledge.personal.birthday}).`;
      case 'school':
        return `Rajdeep studies at ${portfolioKnowledge.education[0].school}, pursuing ${portfolioKnowledge.education[0].degree} (graduating ${portfolioKnowledge.education[0].graduation}).`;
      case 'linkedin':
        return `Here's Rajdeep's LinkedIn: ${portfolioKnowledge.links.linkedin}`;
      case 'github':
        return `Check out Rajdeep's GitHub: ${portfolioKnowledge.links.github}`;
      case 'twitter':
        return `Follow Rajdeep on Twitter: ${portfolioKnowledge.links.twitter}`;
      case 'website':
        return `Visit Rajdeep's personal website: ${portfolioKnowledge.links.website}`;
      case 'location':
        return `Rajdeep is based in ${portfolioKnowledge.personal.location}, India.`;
      case 'email':
        return `Rajdeep's email is: ${portfolioKnowledge.personal.email}`;
      case 'fun_fact': {
        const facts = portfolioKnowledge.facts;
        return `Here's a fun fact: ${facts[Math.floor(Math.random() * facts.length)]}`;
      }
      case 'skills':
        return `Rajdeep's core skills are:\n- Backend: ${portfolioKnowledge.skills.backend.join(", ")}\n- Databases: ${portfolioKnowledge.skills.databases.join(", ")}\n- Tools: ${portfolioKnowledge.skills.tools.join(", ")}`;
      case 'specializations':
        return `Rajdeep specializes in: ${portfolioKnowledge.skills.specializations.join(", ")}`;
      default: {
        const facts = portfolioKnowledge.facts;
        return `Here's something about Rajdeep: ${facts[Math.floor(Math.random() * facts.length)]}`;
      }
    }
  };
  // <--- END OF CHANGE --->

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
    const responseText = generateIntelligentResponse(inputValue);

    // Simulate realistic typing delay
    const typingDelay = Math.min(Math.max(responseText.length * 20, 1000), 3000);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        confidence: 1.0,
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
