import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';
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

function ChatInterface({ onFinish }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [questionsAskedInStage, setQuestionsAskedInStage] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && startTime) {
        setTabSwitches(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startTime]);

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
    setCurrentStageIndex(1);
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
      const data = await callInterrogator(userText, messages, STAGES[currentStageIndex], telemetry);
      const aiThoughts = data.messages || ["(Suspicious silence detected...)"];

      for (let i = 0; i < aiThoughts.length; i++) {
        setIsTyping(true);
        const baseDelay = i === 1 ? 2200 : 1000;
        const charDelay = aiThoughts[i].length * 15;
        await new Promise(r => setTimeout(r, baseDelay + charDelay));
        
        addMsg("ai", aiThoughts[i]);
        setIsTyping(false);
        if (i < aiThoughts.length - 1) await new Promise(r => setTimeout(r, 800));
      }

      if (data.isFinal) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsTyping(false);
        setIsLocked(true);
        
        // Hand off the conclusion to App.jsx
        setTimeout(() => onFinish(), 1000); 

      } else if (data.nextQuestion) {
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
      addMsg("ai", "Error: Irony sensors melted.");
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Terminal size={20} />
          <div>
            <h3 className="font-semibold text-sm">Verification Session</h3>
            <p className="text-xs text-blue-100">
              Stage: {STAGES[currentStageIndex].toUpperCase().replace(/_/g, ' ')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                m.sender === 'user' 
                  ? 'bg-white text-gray-900 border border-gray-200' 
                  : 'bg-blue-600 text-white'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                <p className={`text-xs mt-1 ${m.sender === 'user' ? 'text-gray-400' : 'text-blue-100'}`}>
                  {m.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-blue-600 rounded-2xl px-4 py-3 shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={() => !startTime && setStartTime(Date.now())}
            disabled={isLocked}
            placeholder={isLocked ? "Session terminated..." : "Type your response..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-900"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLocked || !input.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
      
      {/* Telemetry Footer */}
      <div className="bg-gray-50 text-xs text-gray-500 px-4 py-2 flex justify-between border-t border-gray-200 font-mono">
        <span>LATENCY: {startTime ? ((Date.now() - startTime)/1000).toFixed(2) : "0.00"}s</span>
        <span>TAB_SWITCHES: {tabSwitches}</span>
        <span>STATUS: {isLocked ? "TERMINATED" : "ACTIVE"}</span>
      </div>
    </div>
  );
}

export default ChatInterface;