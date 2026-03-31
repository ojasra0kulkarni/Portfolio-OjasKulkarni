'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircleQuestion, X, Send, Bot, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputLocal, setInputLocal] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.speechSynthesis?.cancel(); // Stop talking when closed
    }
  }, [messages, isOpen]);

  const speak = useCallback((text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop previous
    
    // Clean text: remove emojis and asterisks markdown for cleaner speech
    const cleanText = text.replace(/[*#]/g, '').replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    // 1. Hunt for the absolute most realistic Neural/Cloud voices first (Edge's Natural voices are indistinguishable from humans)
    let selectedVoice = 
      voices.find(v => v.name.includes('Microsoft Neerja Online (Natural)')) || // The best realistic Indian female voice
      voices.find(v => v.name.includes('Online (Natural)') && v.name.includes('Female')) || // Any other realistic Natural voice
      voices.find(v => v.name.includes('Google UK English Female')) || // Chrome's cloud-based premium voice
      voices.find(v => v.name.includes('Premium') || v.name.includes('Enhanced')) || // Mac's high-quality downloaded voices
      voices.find(v => v.name.includes('Veena') || v.name.includes('Heera') || v.name.includes('Neerja')) || // Standard offline Indian
      voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Victoria')); // Basic fallback

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Soften the cadence and raise the pitch for a more feminine, gentle delivery
    utterance.rate = 0.95; 
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  // Load voices proactively
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputLocal.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages(prev => [...prev, userMsg, { id: assistantMsgId, role: 'assistant', content: '' }]);
    setInputLocal('');
    setIsLoading(true);
    window.speechSynthesis?.cancel(); // Stop talking when user sends new message

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error('Failed to fetch');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      let finalOutput = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        finalOutput = accumulated;
        setMessages(prev =>
          prev.map(m => m.id === assistantMsgId ? { ...m, content: accumulated } : m)
        );
      }
      // Speak final output once stream completes
      speak(finalOutput);
    } catch {
      setMessages(prev =>
        prev.map(m => m.id === (Date.now() + 1).toString()
          ? { ...m, content: 'Sorry, something went wrong. Please try again.' }
          : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            aria-label="Open Sarayu Chatbot"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-[60px] h-[60px] bg-accent text-cream rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:bg-accent-light transition-colors z-[100] glow"
          >
            <MessageCircleQuestion size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ ease: [0.25, 0.1, 0.25, 1] as any, duration: 0.4 }}
              className="relative w-full md:w-[70vw] lg:w-[60vw] h-[85vh] md:h-[70vh] bg-surface border border-border flex flex-col shadow-2xl overflow-hidden pointer-events-auto rounded-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-accent text-cream flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-text text-lg leading-none mb-1">Sarayu</h3>
                    <p className="font-jetbrains text-muted text-[10px] tracking-widest uppercase">AI Assistant · Ojas Kulkarni</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      if (voiceEnabled) window.speechSynthesis?.cancel();
                    }}
                    className={`p-2 transition-colors ${voiceEnabled ? 'text-accent' : 'text-secondary hover:text-primary-text'}`}
                    aria-label="Toggle Voice"
                  >
                    {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-secondary hover:text-accent transition-colors p-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70 px-4">
                    <Bot size={48} className="text-accent mb-2" />
                    <p className="font-heading text-xl text-primary-text">Hello, I am Sarayu.</p>
                    <p className="text-secondary max-w-sm text-[15px] leading-relaxed">
                      I am Ojas Kulkarni&apos;s personal AI assistant. Ask me about his AI research, engineering ventures, projects, or his love of perfumery.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[80%] p-4 text-[15px] leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-accent text-cream'
                            : 'bg-card border border-border text-secondary'
                        }`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {message.content || (message.role === 'assistant' && isLoading ? (
                          <span className="inline-flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:100ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:200ms]" />
                          </span>
                        ) : '')}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-card">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input
                    className="flex-1 bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-primary-text placeholder:text-muted transition-colors rounded-none font-sans"
                    value={inputLocal}
                    onChange={e => setInputLocal(e.target.value)}
                    placeholder="Ask Sarayu something..."
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputLocal.trim()}
                    className="bg-accent hover:bg-accent-light text-cream px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center glow"
                  >
                    <Send size={18} className="ml-1" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
