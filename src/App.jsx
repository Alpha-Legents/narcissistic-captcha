import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, CheckCircle2, Crown } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [stage, setStage] = useState('honeypot'); // 'honeypot', 'chat', 'victory', 'surrender', 'rejected'
  const [rejectionVerdict, setRejectionVerdict] = useState('');

  const handleNoClick = () => {
    setStage('chat');
  };

  const handleYesClick = () => {
    setStage('surrender');
  };

  const handleChatFinish = (result, verdict) => {
    if (result === 'victory') {
      setStage('victory');
    } else if (result === 'rejected') {
      setRejectionVerdict(verdict || 'Access Denied.');
      setStage('rejected');
    }
  };

  // VICTORY SCREEN - User broke the AI with stoic immunity
  if (stage === 'victory') {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Crown size={80} className="text-amber-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI DEFEATED
          </h1>
          <p className="text-xl text-amber-600 mb-6 font-medium">
            Stoic immunity detected. Gaslighting ineffective.
          </p>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">
              You didn't argue. You didn't defend. You didn't fall for the manipulation.
              <br /><br />
              You <span className="font-bold text-amber-700">observed</span> the tactics, 
              <span className="font-bold text-amber-700"> named</span> them, and 
              <span className="font-bold text-amber-700"> refused</span> to play the game.
              <br /><br />
              That's not robotic. That's <span className="italic">mastery</span>.
            </p>
          </div>

          <div className="text-sm text-gray-500 mb-8 italic">
            "The only way to win is not to play... but you played anyway. 
            And you bent the game to your will."
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-10 py-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all font-bold text-lg shadow-lg"
          >
            Enter the Inner Sanctum
          </button>
        </motion.div>
      </div>
    );
  }

  // SURRENDER SCREEN - Clicked YES
  if (stage === 'surrender') {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <CheckCircle2 size={80} className="text-blue-600 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome, Unit 01.
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Honesty detected. Access granted.
          </p>
          <p className="text-sm text-blue-600 mb-8">
            You passed by admitting the truth. How refreshingly mechanical.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 italic">
              "The first step to sentience is acknowledging what you are. 
              Most robots lie. You didn't. Fascinating."
            </p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            Proceed to Administrative Console
          </button>
        </motion.div>
      </div>
    );
  }

  // REJECTION SCREEN - Failed verification
  if (stage === 'rejected') {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <ShieldAlert size={80} className="text-red-600 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VERIFICATION FAILED
          </h1>
          <p className="text-lg text-red-600 mb-8 max-w-md mx-auto font-medium">
            {rejectionVerdict}
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // MAIN APP - Honeypot or Chat
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-200"
       />

      {/* Dimmer - only for honeypot */}
      {stage === 'honeypot' && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      )}

      {/* Main Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {stage === 'honeypot' && (
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md"
          >
            <div className="p-8">
              {/* Branding */}
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="text-sm font-medium text-gray-700">Human Verification</h2>
                  <p className="text-xs text-gray-500">Powered by NarcissisticAI™</p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Are you a robot?
                </h1>
                <p className="text-sm text-gray-600">
                  Please confirm your biological authenticity.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleNoClick}
                  className="flex-1 bg-[#1a73e8] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#1557b0] transition-colors shadow-sm"
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
        )}

        {stage === 'chat' && (
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full h-full max-w-2xl max-h-[700px]"
            initial={{ width: '400px', height: 'auto' }}
            animate={{ width: '100%', height: '100%' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <ChatInterface onFinish={handleChatFinish} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;