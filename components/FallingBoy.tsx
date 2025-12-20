import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingBoyProps {
  onPop?: () => void; // Kept for compatibility but unused
  isAkatsuki?: boolean;
  isStarWars?: boolean;
  isRickAndMorty?: boolean;
  isLoveTheme?: boolean;
}

export const FallingBoy: React.FC<FallingBoyProps> = ({ isAkatsuki = false, isStarWars = false, isRickAndMorty = false, isLoveTheme = false }) => {

  return (
    <motion.div
      // Gentle Sway Animation
      animate={{
        y: [0, 15, 0],
        rotate: [2, -2, 2]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-auto h-auto flex flex-col items-center mb-2 pointer-events-none z-20 mx-auto"
    >


      {/* Cat Image Frame / Pod */}
      <div
        className={`
              relative rounded-full overflow-hidden z-10 box-border
              w-36 h-36 border-4
              ${isAkatsuki ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.6)] bg-black' : ''}
              ${isStarWars ? 'border-gray-300 shadow-[0_0_20px_rgba(34,255,0,0.4)] bg-black' : ''}
              ${isRickAndMorty ? 'border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6)] bg-black' : ''}
              ${isLoveTheme ? 'border-pink-400 shadow-[0_0_40px_rgba(236,72,153,0.6)] bg-pink-100' : ''}
              ${!isRickAndMorty && !isAkatsuki && !isStarWars && !isLoveTheme ? 'border-white/90 shadow-[0_0_50px_rgba(0,255,255,0.4)]' : ''}
            `}
      >
        <img
          src="/photo_2025-12-12_16-50-23.jpg"
          alt="Space Cat"
          className={`w-full h-full object-cover transform scale-110 
                      ${isAkatsuki ? 'sepia contrast-125' : ''}
                      ${isStarWars ? 'grayscale contrast-125 brightness-75' : ''}
                      ${isRickAndMorty ? 'hue-rotate-90 contrast-125' : ''}
                      ${isLoveTheme ? 'contrast-110' : ''}
                  `}
        />

        {/* Reflection/Overlay */}
        <div className={`absolute inset-0 pointer-events-none rounded-full
                  ${isStarWars ? 'bg-green-500/10 shadow-[inset_0_0_20px_rgba(0,255,0,0.3)]'
            : isRickAndMorty ? 'bg-green-400/10'
              : isLoveTheme ? 'bg-pink-500/10'
                : 'bg-gradient-to-br from-white/20 to-transparent'}
              `}></div>
      </div>
    </motion.div>
  );
};