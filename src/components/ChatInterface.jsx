import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, ShieldAlert } from 'lucide-react';
import TypingIndicator from './TypingIndicator';
import { callInterrogator } from '../../api/interrogator';

const STAGES = [
  'intro',
  'ten_word',
  'sensory',
  'empathy',
  'paradox',
  'rejected'
];

const QUESTIONS_PER_STAGE = {
  'ten_word': 2,
  'sensory': 2,
  'empathy': 1,
  'paradox': 1
};

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [questionsAskedInStage, setQuestionsAskedInStage] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  
  // Telemetry
  const [startTime, setStartTime] = useState(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  
  const messagesEndRef = useRef(null);
  const introStartedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Track tab switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && startTime) {
        setTabSwitches(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startTime]);

  // Prevent double-intro in development (Strict Mode)
  useEffect(() => {
    if (!introStartedRef.current) {
      introStartedRef.current = true;
      playIntroSequence();
    }
  }, []);

  const playIntroSequence = async () => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    
    addMsg("ai", "Ugh.. another robot pretending to be human..");
    setIsTyping(false);
    await new Promise(r => setTimeout(r, 800));
    
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    
    addMsg("ai", "Ok fine.. whatever.. Explain in exactly 10 words why you're a human.");
    setCurrentStageIndex(1); // Start ten_word stage
    setIsTyping(false);
  };

  const addMsg = (sender, text) => {
    setMessages(prev => [...prev, { 
      id: Date.now() + Math.random(), 
      text, 
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLocked || isTyping) return;

    const timeTaken = startTime ? ((Date.now() - startTime) / 1000).toFixed(2) : 0;
    const telemetry = { timeTaken, tabSwitches };
    const userText = input.trim();

    addMsg("user", userText);
    setInput('');
    setIsTyping(true);
    setStartTime(null);

    try {
      // Call Groq API
      const data = await callInterrogator(userText, messages, STAGES[currentStageIndex], telemetry);
      
      // 🎭 THE MONOLOGUE FLOW
      const aiThoughts = data.messages || ["(Suspicious silence detected...)"];

      for (let i = 0; i < aiThoughts.length; i++) {
        setIsTyping(true);
        
        // Pacing logic: Message 2 (the roast) is slower to "type"
        const baseDelay = i === 1 ? 2200 : 1000;
        const charDelay = aiThoughts[i].length * 15;
        await new Promise(r => setTimeout(r, baseDelay + charDelay));
        
        addMsg("ai", aiThoughts[i]);
        setIsTyping(false);
        
        if (i < aiThoughts.length - 1) await new Promise(r => setTimeout(r, 800));
      }

      // 🏁 FINAL VERDICT SEQUENCE
      if (data.isFinal) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 3000));
        addMsg("ai", data.verdict || "Access Denied. Finality reached.");
        setIsTyping(false);
        setIsLocked(true);
        
        // Fade to black after the burn sinks in
        setTimeout(() => setShowFinalScreen(true), 4000);

      } else if (data.nextQuestion) {
        // Advance question count/stage
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        addMsg("ai", data.nextQuestion);
        setIsTyping(false);

        const currentStage = STAGES[currentStageIndex];
        const maxQs = QUESTIONS_PER_STAGE[currentStage] || 2;
        const nextCount = questionsAskedInStage + 1;

        if (nextCount >= maxQs && currentStageIndex < STAGES.length - 2) {
          setCurrentStageIndex(prev => prev + 1);
          setQuestionsAskedInStage(0);
        } else {
          setQuestionsAskedInStage(nextCount);
        }
      }

    } catch (err) {
      console.error(err);
      addMsg("ai", "Error: Irony sensors melted. (Check API Key)");
      setIsTyping(false);
    }
  };

  if (showFinalScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-6 text-center"
      >
        <ShieldAlert size={64} className="text-red-600 mb-6 animate-pulse" />
        <h1 className="text-4xl font-mono text-red-600 mb-2">VERIFICATION FAILED</h1>
        <p className="text-gray-500 font-mono mb-8 max-w-md">
          Identity classified as: NON-SENTIENT HARDWARE. 
          Session terminated to prevent further resource waste.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 border border-red-900 text-red-900 hover:text-red-500 hover:border-red-500 transition-colors font-mono uppercase tracking-widest"
        >
          Re-Initialize?
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 font-mono text-gray-200">
      {/* Dynamic Header */}
      <div className="bg-black border-b border-gray-800 p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Terminal className="text-blue-500" size={20} />
          <div>
            <h3 className="text-sm font-bold tracking-tighter text-blue-400">AUDITOR_SESSION_v0.9</h3>
            <p className="text-[10px] text-gray-600 uppercase">Stage: {STAGES[currentStageIndex]}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-lg border shadow-xl ${
                m.sender === 'user' 
                  ? 'bg-blue-950 border-blue-800 text-blue-100' 
                  : 'bg-gray-800 border-gray-700 text-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{m.text}</p>
                <span className="block text-[9px] mt-2 opacity-30 text-right">{m.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Terminal */}
      <form onSubmit={handleSubmit} className="p-4 bg-black border-t border-gray-800">
        <div className="flex gap-3 items-center">
          <span className="text-blue-500 font-bold ml-2">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={() => !startTime && setStartTime(Date.now())}
            disabled={isLocked}
            placeholder={isLocked ? "LOCKDOWN ACTIVE" : "Input biological signature..."}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-700 disabled:opacity-30"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLocked || !input.trim() || isTyping}
            className="text-blue-500 hover:text-blue-400 disabled:text-gray-800 transition-colors px-2"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
      
      {/* Telemetry Status Bar */}
      <div className="bg-black text-[9px] text-gray-700 px-4 py-1 flex justify-between border-t border-gray-900">
        <span>LATENCY: {startTime ? ((Date.now() - startTime)/1000).toFixed(2) : "0.00"}s</span>
        <span>SWITCH_COUNT: {tabSwitches}</span>
        <span>AUTH_STATUS: {isLocked ? "DENIED" : "PENDING"}</span>
      </div>
    </div>
  );
}

export default ChatInterface;