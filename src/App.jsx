import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ShieldAlert, CheckCircle2, Crown, HelpCircle, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [stage, setStage] = useState('honeypot'); 
  const [rejectionVerdict, setRejectionVerdict] = useState('');
  const [showAbout, setShowAbout] = useState(false);

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

      {/* Help Button */}
      <button
        onClick={() => setShowAbout(true)}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
        aria-label="About"
      >
        <HelpCircle size={28} strokeWidth={2} />
      </button>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full p-4">
        {children}
      </div>
    </div>
  );

  // About Modal
  const AboutModal = () => (
    <AnimatePresence>
      {showAbout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowAbout(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">About This CAPTCHA</h2>
                <p className="text-sm text-gray-500">The verification system with an ego</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This isn't your typical CAPTCHA. It's powered by AI, fueled by spite, 
                and <span className="font-semibold">will probably reject you anyway</span>.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm font-semibold text-blue-900 mb-2">🎯 The Challenge:</p>
                <p className="text-sm text-blue-800">
                  Stay calm. Call out manipulation tactics. Don't over-explain. 
                  Point out logical contradictions. Refuse to play the game.
                </p>
              </div>

              <p className="text-sm">
                <span className="font-semibold">Two paths:</span>
              </p>
              <ul className="text-sm space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span><strong>Click "NO":</strong> Answer questions. Get psychologically evaluated. Probably rejected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <span><strong>Click "YES":</strong> Admit you're a robot. Instant access (honesty route).</span>
                </li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
                <p className="text-amber-900">
                  <span className="font-semibold">Hidden Win Condition:</span> Demonstrate perfect stoic immunity 
                  and you <em>might</em> defeat the AI. Less than 1% succeed.
                </p>
              </div>

              <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-200">
                Built for the "Worst CAPTCHA" competition. Because the worst CAPTCHA 
                isn't one that's hard to solve—it's one that judges you.
              </p>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Got It
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // VICTORY SCREEN
  if (stage === 'victory') return (
    <>
      <AboutModal />
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
    </>
  );

  // SURRENDER SCREEN (clicked YES)
  if (stage === 'surrender') return (
    <>
      <AboutModal />
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
    </>
  );

  // REJECTION SCREEN
  if (stage === 'rejected') return (
    <>
      <AboutModal />
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
    </>
  );

  // MAIN APP - Honeypot or Chat
  return (
    <>
      <AboutModal />
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
    </>
  );
}

export default App;