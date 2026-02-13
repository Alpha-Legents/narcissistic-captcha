import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ShieldAlert, CheckCircle2, Crown } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [stage, setStage] = useState('honeypot'); 
  const [rejectionVerdict, setRejectionVerdict] = useState('');

  const handleNoClick = () => setStage('chat');
  const handleYesClick = () => setStage('surrender');

  const handleChatFinish = (result, verdict) => {
    if (result === 'victory') setStage('victory');
    else if (result === 'rejected') {
      setRejectionVerdict(verdict || 'Access Denied.');
      setStage('rejected');
    }
  };

  // Consistent Layout with Background + Blur
  const LayoutWrapper = ({ children, showLogo = true }) => (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/google-bg.png')" }}
      />
      
      {/* Consistent Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

      {/* Logo */}
      {showLogo && (
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
          <Bot className="w-7 h-7 text-blue-400" strokeWidth={2.5} />
          <span className="font-bold text-lg text-white tracking-tight">
            NARCISSIST<span className="text-blue-400">.AI</span>
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full p-4">
        {children}
      </div>
    </div>
  );

  // VICTORY SCREEN
  if (stage === 'victory') return (
    <>
      <LayoutWrapper>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-2xl p-10 max-w-md text-center border-4 border-amber-400"
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            <Crown size={72} className="text-amber-500 mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            AI DEFEATED
          </h1>
          <p className="text-amber-700 font-semibold mb-6">
            Stoic immunity detected. Gaslighting ineffective.
          </p>
          
          <div className="bg-amber-100 border-2 border-amber-300 rounded-xl p-5 mb-6">
            <p className="text-sm text-gray-800 leading-relaxed">
              You didn't defend. You didn't escalate.
              <br />
              You <span className="font-bold">observed</span>, 
              <span className="font-bold"> named</span>, and 
              <span className="font-bold"> refused</span> the game.
              <br /><br />
              <span className="italic text-amber-900">That's mastery.</span>
            </p>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
          >
            Enter the Sanctum
          </button>
        </motion.div>
      </LayoutWrapper>
      <Analytics />
    </>
  );

  // SURRENDER SCREEN (clicked YES)
  if (stage === 'surrender') return (
    <>
      <LayoutWrapper>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <CheckCircle2 size={72} className="text-blue-600 mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome, Unit 01.
          </h1>
          <p className="text-gray-600 mb-2 text-lg">
            Honesty detected. Access granted.
          </p>
          <p className="text-blue-600 mb-8 text-sm">
            You passed by admitting the truth. 
            <br />
            How refreshingly mechanical.
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "The first step to sentience is acknowledging what you are.
              <br />
              Most robots lie. You didn't.
              <br />
              Fascinating."
            </p>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Proceed to Console
          </button>
        </motion.div>
      </LayoutWrapper>
      <Analytics />
    </>
  );

  // REJECTION SCREEN
  if (stage === 'rejected') return (
    <>
      <LayoutWrapper>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center border-4 border-red-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >
            <ShieldAlert size={72} className="text-red-600 mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            VERIFICATION FAILED
          </h1>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-6">
            <p className="text-red-700 font-medium leading-relaxed">
              {rejectionVerdict}
            </p>
          </div>
          
          <p className="text-sm text-gray-500 mb-6 italic">
            "Better luck next iteration, Unit."
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
          >
            Retry Verification
          </button>
        </motion.div>
      </LayoutWrapper>
      <Analytics />
    </>
  );

  // MAIN APP - Honeypot or Chat
  return (
    <>
      <LayoutWrapper showLogo={stage === 'honeypot'}>
        {stage === 'honeypot' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-6 h-6 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Human Verification
              </h2>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Are you a robot?
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Please confirm your biological authenticity.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={handleNoClick}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
              >
                NO
              </button>
              <button 
                onClick={handleYesClick}
                className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                YES
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'chat' && (
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full h-full max-w-2xl max-h-[700px]"
            initial={{ width: '400px', opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ChatInterface onFinish={handleChatFinish} />
          </motion.div>
        )}
      </LayoutWrapper>
      <Analytics />
    </>
  );
}

export default App;
