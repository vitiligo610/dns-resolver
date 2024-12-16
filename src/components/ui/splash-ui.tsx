import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const funnyLoadingMessages = [
  "Converting IP addresses to interpretive dance...",
  "Teaching packets how to find their way home...",
  "Convincing DNS servers to be more social...",
  "Untangling the internet's spaghetti...",
  "Asking servers politely for directions..."
];

export const SplashUI = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyLoadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="cyan"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-4 text-cyan-400"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        DNS Resolver
      </motion.h1>

      <motion.div
        className="flex space-x-2 mb-4"
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-cyan-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="text-lg text-cyan-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {funnyLoadingMessages[messageIndex]}
      </motion.p>

      <motion.div
        className="absolute bottom-4 text-sm text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Powered by caffeine and stack overflow
      </motion.div>
    </motion.div>
  );
};

export default SplashUI;