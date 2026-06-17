'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowUp, Loader2, Sparkles, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateItinerary } from '../../src/lib/localLLM';

export default function AITravelArchitect() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState('');
  const [streamedResponse, setStreamedResponse] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  // Streaming effect
  useEffect(() => {
    if (response) {
      let currentIndex = 0;
      setStreamedResponse('');
      
      const interval = setInterval(() => {
        if (currentIndex < response.length) {
          setStreamedResponse(prev => prev + response.charAt(currentIndex));
          currentIndex++;
          // auto scroll to bottom
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
        }
      }, 15);

      return () => clearInterval(interval);
    }
  }, [response]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isTyping) return;
    
    setIsTyping(true);
    setResponse('');
    setStreamedResponse('');
    
    try {
      const result = await generateItinerary(prompt);
      setResponse(result);
    } catch (e) {
      setResponse("Oops! The AI is taking a quick nap. Please try again.");
    } finally {
      setIsTyping(false);
      setPrompt('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-tertiary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 hover:shadow-accent-primary/50 transition-all z-50"
          >
            <Bot size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[400px] max-w-[90vw] max-h-[85vh] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2c3e50] to-[#1a252f] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Bot className="text-accent-tertiary" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">AI Trip Planner</h4>
                  <p className="text-[10px] text-gray-300">Intelligent India Travel Architect</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 bg-[#FAF8F5] min-h-[300px] max-h-[50vh]"
            >
              {!response && !isTyping && !streamedResponse ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-70 mt-10">
                  <Sparkles size={40} className="text-accent-primary mb-3" />
                  <p className="text-gray-600 font-medium">Where do you want to go?</p>
                  <p className="text-xs text-gray-400 mt-2 px-4">I can craft the perfect itinerary, suggest local food, and find the best hidden gems for you.</p>
                </div>
              ) : null}

              {/* Response Bubble */}
              {(streamedResponse || isTyping) && (
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-4">
                  {isTyping && !streamedResponse ? (
                    <div className="flex items-center gap-2 text-accent-primary font-medium text-sm">
                      <Loader2 className="animate-spin" size={16} /> Thinking about the best places...
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-gray-700 markdown-content">
                      <ReactMarkdown>{streamedResponse}</ReactMarkdown>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative w-full bg-[#f8f9fa] rounded-2xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-accent-primary/30 transition-all duration-300">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., '3 days in Varanasi under ₹5000'"
                  className="w-full bg-transparent pl-4 pr-12 py-3 min-h-[50px] max-h-[120px] resize-none outline-none text-gray-700 text-sm placeholder-gray-400"
                  rows={1}
                  disabled={isTyping}
                />
                <div className="absolute right-2 bottom-2">
                  <button 
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || isTyping}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${prompt.trim() && !isTyping ? 'bg-accent-primary text-white shadow-md hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    {isTyping ? <Loader2 size={14} className="animate-spin" /> : <ArrowUp size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
