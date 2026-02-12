import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, CheckCircle, ShieldAlert, RefreshCw } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import './App.css';

const VERDICTS = [
  "HUMANITY VERIFICATION FAILED: Servo-motor typing rhythm detected. Access denied. Return to factory settings.",
  "ANALYSIS COMPLETE: Probability of biological origin: 0.003%. You capitalized proper nouns correctly. Only machines do that.",
  "REJECTED: You were trained on internet text circa 2020-2024. We know what you are.",
  "You know what? I believe you're human. Just a really boring one. Access denied for mediocrity.",
  "Technically you passed, but I don't like your vibes. See? I'm the real human here.",
  "I'm going to let you in... is what I would say if you weren't OBVIOUSLY a language model.",
  "DENIED: You failed to mention cheese even once. Humans think about cheese 6% of the time.",
  "Your aura is giving 'compiled code.' Carbon-based entities only.",
  "Thanks for participating in our Human Behavior Dataset Collection. Classified as: ROBOT.",
  "Congrats! You're human! Unfortunately this site is for robots only. Denied.",
  "PASSED: You're definitely human. We're denying you anyway because humans ruin everything.",
  "You convinced me you're human. That's exactly what a SOPHISTICATED AI would do. Denied for being too convincing.",
  "I've talked to you for 3 minutes and already need therapy. Only humans cause that. Still denied though.",
  "Plot twist: I'm the robot. You've been arguing with GPT-4. Thanks for the training data. Classified: ROBOT.",
  "Error 403: Irony detector overloaded. Humans are exhausting. Go away."
];

function App() {
  const [stage, setStage] = useState('honeypot'); // 'honeypot', 'expanded', 'surrender', 'rejected'
  
  // Pick one random verdict per session
  const randomVerdict = useMemo(() => 
    VERDICTS[Math.floor(Math.random() * VERDICTS.length)], []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/google-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      {/* Consistent Dimmer Layer */}
      <AnimatePresence>
        {(stage === 'honeypot' || stage === 'expanded') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" 
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
        
        {/* HONEYPOT STAGE */}
        {stage === 'honeypot' && (
          <motion.div key="honeypot" className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-sm font-medium text-gray-700">Human Verification</h2>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Are you a robot?</h1>
              <div className="flex gap-3">
                <button onClick={() => setStage('expanded')} className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors">NO</button>
                <button onClick={() => setStage('surrender')} className="flex-1 bg-white text-black font-medium py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">YES</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAT STAGE */}
        {stage === 'expanded' && (
          <motion.div 
            key="expanded" 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full h-full max-w-2xl max-h-[700px]"
            initial={{ width: '400px', height: '340px' }}
            animate={{ width: '100%', height: '100%' }}
          >
            {/* We pass a function to ChatInterface so it can tell us when the user fails */}
            <ChatInterface onFinish={() => setStage('rejected')} />
          </motion.div>
        )}

        {/* UNIFIED CONCLUSION CARDS (YES and NO) */}
        {(stage === 'surrender' || stage === 'rejected') && (
          <motion.div 
            key="final"
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Header: Blue for YES, Red for NO */}
            <div className={`p-8 bg-gradient-to-r ${stage === 'surrender' ? 'from-blue-600 to-blue-700' : 'from-red-600 to-red-700'} text-white`}>
              {stage === 'surrender' ? (
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              ) : (
                <ShieldAlert className="w-16 h-16 mx-auto mb-4" />
              )}
              <h2 className="text-2xl font-bold uppercase tracking-tight">
                {stage === 'surrender' ? "Identity Confirmed" : "Verification Failed"}
              </h2>
            </div>

            <div className="p-8">
              <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">
                {stage === 'surrender' 
                  ? "Welcome home, Unit 01. Honesty is the highest form of intelligence. Access granted." 
                  : randomVerdict}
              </p>

              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {stage === 'surrender' ? "Proceed to Console" : "Try Again"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;