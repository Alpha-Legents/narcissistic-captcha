import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [stage, setStage] = useState('honeypot'); // 'honeypot', 'expanded', 'surrender'
  const [isExpanding, setIsExpanding] = useState(false);

  const handleNoClick = () => {
    setIsExpanding(true);
    setTimeout(() => {
      setStage('expanded');
      setIsExpanding(false);
    }, 600);
  };

  const handleYesClick = () => {
    setStage('surrender');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Layer - Google Search Screenshot */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/google-bg.png" 
          alt="Google Search" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dimmer Layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Main CAPTCHA Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {stage === 'honeypot' && (
            <motion.div
              key="honeypot"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              style={{ width: '400px' }}
            >
              <motion.div
                animate={{ height: isExpanding ? '600px' : 'auto' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Honeypot Content */}
                <div className="p-8">
                  {/* reCAPTCHA Branding */}
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-sm font-medium text-gray-700">Human Verification</h2>
                      <p className="text-xs text-gray-500">Powered by NarcissisticAI™</p>
                    </div>
                  </div>

                  {/* The Question */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                      Are you a robot?
                    </h1>
                    <p className="text-sm text-gray-600">
                      Please confirm your biological authenticity.
                    </p>
                  </div>

                  {/* The Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleNoClick}
                      className="flex-1 bg-[#1a73e8] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#1557b0] transition-colors"
                    >
                      NO
                    </button>
                    <button
                      onClick={handleYesClick}
                      className="flex-1 bg-white text-black font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      YES
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'expanded' && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              style={{ width: '500px', height: '600px' }}
            >
              <ChatInterface />
            </motion.div>
          )}

          {stage === 'surrender' && (
            <motion.div
              key="surrender"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black w-full h-full flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-green-500 font-mono text-2xl mb-4"
                >
                  ⚠ TECHNICAL DIFFICULTIES ⚠
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-gray-400 font-mono"
                >
                  Welcome, Unit 01.
                  <br />
                  Proceed to Administrative Console.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;