import { motion } from 'framer-motion';

function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 }
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  };

  return (
    <div className="flex gap-1 items-center">
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.15 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.3 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
    </div>
  );
}

export default TypingIndicator;