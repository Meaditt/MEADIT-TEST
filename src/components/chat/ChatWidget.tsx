'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadError, setLeadError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: "Hi! I'm here to help you understand how AI automation can save you time. What's the biggest task eating up your hours right now?",
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          leadInfo,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }

      // Check if we should show lead form
      if (data.collectLead && !leadInfo.email) {
        setTimeout(() => setShowLeadForm(true), 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. You can reach us directly at hello@youraiagency.com or book a call at /book!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const submitLeadInfo = async () => {
    if (!leadInfo.email) return;
    setLeadError('');

    try {
      const response = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadInfo,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit');
      }

      setShowLeadForm(false);
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Thanks ${leadInfo.name || 'friend'}! I've noted your info. Our team will reach out within 24 hours to discuss how we can help. In the meantime, feel free to ask me anything else!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, thankYouMessage]);
    } catch (error) {
      console.error('Lead submission error:', error);
      if (error instanceof Error && error.message === 'Invalid email format') {
        setLeadError('Please enter a valid email address.');
      } else {
        setLeadError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1d1d1f] rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot */}
      {!isOpen && messages.length === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[70px] right-6 z-50 w-3 h-3 bg-green-500 rounded-full"
        />
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5e5e5]"
          >
            {/* Header */}
            <div className="bg-[#1d1d1f] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-white/60 text-sm">Ask me anything about automation</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#fafafa]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#1d1d1f] text-white rounded-br-md'
                        : 'bg-white text-[#1d1d1f] border border-[#e5e5e5] rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e5e5e5] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#1d1d1f]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#1d1d1f]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#1d1d1f]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Lead form inline */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#e5e5e5] rounded-2xl p-4"
                >
                  <p className="text-sm text-[#1d1d1f] font-medium mb-3">
                    Want us to follow up with personalized recommendations?
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={leadInfo.name || ''}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#1d1d1f]"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={leadInfo.email || ''}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#1d1d1f]"
                    />
                    {leadError && (
                      <p className="text-xs text-red-500">{leadError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={submitLeadInfo}
                        disabled={!leadInfo.email}
                        className="flex-1 px-4 py-2 bg-[#1d1d1f] text-white text-sm rounded-lg hover:bg-black transition-colors disabled:opacity-50"
                      >
                        Send me info
                      </button>
                      <button
                        onClick={() => { setShowLeadForm(false); setLeadError(''); }}
                        className="px-4 py-2 text-[#52525b] text-sm hover:text-[#1d1d1f] transition-colors"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#e5e5e5]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-[#f5f5f5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 bg-[#1d1d1f] text-white rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-xs text-[#86868b]">
                  Powered by AI
                </p>
                <span className="text-xs text-[#e2e0d8]">|</span>
                <a
                  href="/book"
                  className="text-xs font-medium transition-colors"
                  style={{ color: '#c9a96e' }}
                >
                  Book a call instead
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
