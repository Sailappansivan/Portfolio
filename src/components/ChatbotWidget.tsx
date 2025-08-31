'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm Sailappan's AI assistant. I can tell you all about his AI/ML expertise, cool projects, or help you get in touch. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: data.response,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble connecting right now. Please try again later! 🤖",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Oops! Something went wrong. Please check your connection and try again! 🔌",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    setInputValue(action);
    // Small delay to ensure input is set
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
        
        {/* Icon */}
        <div className="relative z-10 text-white text-2xl">
          {isOpen ? '✕' : '🤖'}
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glowing border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur opacity-50"></div>
            
            {/* Chat Header */}
            <div className="relative z-10 bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 border-b border-slate-600">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="text-cyan-400">Sailappan&apos;s AI Assistant</span>
                <span className="text-2xl">🤖</span>
              </h3>
              <p className="text-xs text-gray-400">AI & ML Expert</p>
            </div>

            {/* Messages Container */}
            <div className="relative z-10 h-64 overflow-y-auto p-4 space-y-3 bg-slate-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-slate-700 text-white'
                        : 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-slate-700 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="relative z-10 bg-slate-800 p-4 border-t border-slate-600">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                {['skills', 'projects', 'AI/ML', 'resume'].map((action) => (
                  <motion.button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    className="px-3 py-1 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-full text-xs hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
