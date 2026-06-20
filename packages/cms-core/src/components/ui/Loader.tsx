'use client';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = ({ isLoading = true }: { isLoading?: boolean }) => {
  const text = "sadiatec";

  const container = {
    show: { transition: { staggerChildren: 0.08 } }
  };
  const letter = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const shimmer = {
    hidden: { x: '-100%' },
    show: { x: '100%', transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5 } }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black text-[#167d4c] tracking-tighter flex relative overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {text.split("").map((char, i) => (
              <motion.span key={i} variants={letter}>
                {char}
              </motion.span>
            ))}

            {/* Shimmer Overlay */}
            <motion.div
              className="absolute inset-0 bg-white/20 skew-x-[-20deg]"
              variants={shimmer}
              initial="hidden"
              animate="show"
            />
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};