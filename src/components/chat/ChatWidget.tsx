'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

interface ChatAction {
  type: string;
  path: string;
  label: string;
}

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
}

const QUICK_SUGGESTIONS = [
  { label: 'What do you do?', icon: '?' },
  { label: 'See your work', icon: '\u2192' },
  { label: 'Book a call', icon: '\u2615' },
  { label: 'Pricing info', icon: '$' },
];

export function ChatWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Show a teaser after 5 seconds
  const [showTeaser, setShowTeaser] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTeaser(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setHasUnread(false);
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: getPageContextGreeting(pathname),
        timestamp: new Date(),
        actions: getPageContextActions(pathname),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length, pathname]);

  // Scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Trap scroll inside chat — prevent page from scrolling when cursor is over the chat
  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = chatBody;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Only prevent default if we're NOT at a boundary, or if we are at a boundary
      // but the page would scroll — either way, stop propagation so Lenis doesn't pick it up
      if (!atTop && !atBottom) {
        e.stopPropagation();
      } else {
        // At boundary — still stop propagation but also prevent default so page doesn't scroll
        e.preventDefault();
        e.stopPropagation();
      }
    };

    chatBody.addEventListener('wheel', handleWheel, { passive: false });
    return () => chatBody.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  // Also trap scroll on the entire chat window (header, input area) so hovering anywhere on the chat doesn't scroll the page
  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    if (!chatWindow || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // If the event comes from the chat body, let the handler above deal with it
      if (chatBodyRef.current?.contains(e.target as Node)) return;
      // For header/input areas, just block the scroll entirely
      e.preventDefault();
      e.stopPropagation();
    };

    chatWindow.addEventListener('wheel', handleWheel, { passive: false });
    return () => chatWindow.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  // Handle navigation action
  const handleAction = useCallback((action: ChatAction) => {
    if (action.type === 'navigate') {
      router.push(action.path);
      // Don't close chat - let user continue chatting on new page
    }
  }, [router]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
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
          actions: data.actions || [],
        };
        setMessages((prev) => [...prev, assistantMessage]);

        if (!isOpen) setHasUnread(true);
      }

      if (data.collectLead && !leadInfo.email) {
        setTimeout(() => setShowLeadForm(true), 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. You can reach us directly or book a call!",
        timestamp: new Date(),
        actions: [{ type: 'navigate', path: '/book', label: 'Book a Call' }],
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
        content: `Thanks${leadInfo.name ? ` ${leadInfo.name}` : ''}! Our team will reach out within 24 hours. In the meantime, feel free to keep chatting or explore our site!`,
        timestamp: new Date(),
        actions: [
          { type: 'navigate', path: '/stories', label: 'See Our Work' },
          { type: 'navigate', path: '/blog', label: 'Read Our Blog' },
        ],
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

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* Teaser bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 max-w-[220px]"
          >
            <div
              onClick={() => { setIsOpen(true); setShowTeaser(false); }}
              className="bg-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg border border-[#e2e0d8] cursor-pointer hover:shadow-xl transition-shadow"
            >
              <p className="text-sm text-[#1a1a18] leading-relaxed">
                Have a question? I can help you find what you need
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs text-[#7a7a72]">Online now</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#eeede8] rounded-full flex items-center justify-center text-[#7a7a72] hover:bg-[#e2e0d8] transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat bubble button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowTeaser(false); setHasUnread(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #1a1a18 0%, #2a2a28 100%)'
            : 'linear-gradient(135deg, #c9a96e 0%, #a8854a 100%)',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201, 169, 110, 0.35)' }}
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
              transition={{ duration: 0.15 }}
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread / notification dot */}
        {!isOpen && (hasUnread || messages.length === 0) && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-32px)] flex flex-col overflow-hidden"
            style={{
              maxHeight: 'min(600px, calc(100vh - 140px))',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #1a1a18 0%, #2a2a28 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #a8854a 100%)' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a18]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-[15px]">MeadITT Assistant</h3>
                    <p className="text-white/50 text-xs">Ask me anything about our services</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Minimize chat"
                >
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ background: '#fafaf8', minHeight: 0 }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? '' : 'flex gap-2'}`}>
                    {/* Bot avatar */}
                    {message.role === 'assistant' && (
                      <div
                        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #e8d5b0 100%)' }}
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                    )}

                    <div>
                      {/* Message bubble */}
                      <div
                        className={`rounded-2xl px-4 py-2.5 ${
                          message.role === 'user'
                            ? 'bg-[#1a1a18] text-white rounded-br-md'
                            : 'bg-white text-[#1a1a18] border border-[#e2e0d8] rounded-bl-md'
                        }`}
                        style={message.role === 'assistant' ? {
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        } : undefined}
                      >
                        <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>

                      {/* Action buttons */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {message.actions.map((action, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + idx * 0.08 }}
                              onClick={() => handleAction(action)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-[1.02]"
                              style={{
                                background: 'linear-gradient(135deg, #c9a96e 0%, #a8854a 100%)',
                                color: 'white',
                                boxShadow: '0 2px 8px rgba(201, 169, 110, 0.3)',
                              }}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                              {action.label}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #e8d5b0 100%)' }}
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div className="bg-white border border-[#e2e0d8] rounded-2xl rounded-bl-md px-4 py-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      <div className="flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
                        <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }} />
                        <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick suggestions */}
              {showSuggestions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-1"
                >
                  <p className="text-[11px] text-[#7a7a72] mb-2 font-medium uppercase tracking-wider">Quick questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.06 }}
                        onClick={() => sendMessage(suggestion.label)}
                        className="px-3 py-1.5 bg-white border border-[#e2e0d8] rounded-full text-xs text-[#4a4a44] hover:border-[#c9a96e] hover:text-[#1a1a18] transition-all duration-200 hover:shadow-sm"
                      >
                        <span className="mr-1">{suggestion.icon}</span>
                        {suggestion.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Lead form inline */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#e2e0d8] rounded-2xl p-4"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #e8d5b0 100%)' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#1a1a18] font-medium">
                      Want personalized recommendations?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={leadInfo.name || ''}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-[#fafaf8] border border-[#e2e0d8] rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={leadInfo.email || ''}
                      onChange={(e) => setLeadInfo((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-[#fafaf8] border border-[#e2e0d8] rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors"
                    />
                    {leadError && (
                      <p className="text-xs text-red-500">{leadError}</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={submitLeadInfo}
                        disabled={!leadInfo.email}
                        className="flex-1 px-4 py-2 text-white text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #a8854a 100%)' }}
                      >
                        Send me info
                      </button>
                      <button
                        onClick={() => { setShowLeadForm(false); setLeadError(''); }}
                        className="px-4 py-2 text-[#7a7a72] text-sm hover:text-[#1a1a18] transition-colors"
                      >
                        Later
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 bg-white border-t border-[#edecea] flex-shrink-0">
              <div className="flex gap-2 items-end">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className="flex-1 px-4 py-2.5 bg-[#f4f3ef] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:bg-white transition-all duration-200 border border-transparent focus:border-[#c9a96e]/30"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg, #c9a96e 0%, #a8854a 100%)'
                      : '#e2e0d8',
                  }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-[10px] text-[#7a7a72]">
                  Powered by MeadITT AI
                </p>
                <a
                  href="/book"
                  onClick={(e) => { e.preventDefault(); router.push('/book'); }}
                  className="text-[10px] font-medium hover:underline transition-colors"
                  style={{ color: '#c9a96e' }}
                >
                  Prefer a call? Book here
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Get a context-aware greeting based on the current page
 */
function getPageContextGreeting(pathname: string): string {
  switch (pathname) {
    case '/book':
      return "Hi! I see you're looking to book a call. Need help deciding if we're the right fit, or have questions before scheduling?";
    case '/start':
      return "Hey! Ready to get started? I can help you figure out which option is best for your situation.";
    case '/stories':
      return "Welcome! You're checking out our work. Want me to help you find a case study relevant to your industry?";
    case '/about':
      return "Hi there! Curious about our team? Ask me anything about MeadITT, our approach, or our experience.";
    case '/blog':
      return "Hey! Browsing our blog? I can help you find articles on specific topics or answer questions about AI automation.";
    case '/agents':
      return "Hi! Interested in AI agents? I can explain how they work and which ones might be right for your business.";
    default:
      return "Hi! I'm here to help you understand how AI automation can save you time. What brings you here today?";
  }
}

/**
 * Get context-aware action suggestions based on the current page
 */
function getPageContextActions(pathname: string): ChatAction[] {
  switch (pathname) {
    case '/book':
      return [{ type: 'navigate', path: '/stories', label: 'See Our Work First' }];
    case '/stories':
      return [
        { type: 'navigate', path: '/book', label: 'Book a Call' },
        { type: 'navigate', path: '/start', label: 'Get Started' },
      ];
    case '/about':
      return [{ type: 'navigate', path: '/book', label: 'Book a Call' }];
    case '/blog':
      return [{ type: 'navigate', path: '/start', label: 'Get Started' }];
    default:
      return [];
  }
}
