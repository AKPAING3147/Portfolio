import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    // Accelerate to 88 MPH
    const interval = setInterval(() => {
      setSpeed(prev => {
        if (prev >= 88) {
          clearInterval(interval);
          setTimeout(onComplete, 1000); // Slight delay to admire 88mph before fading
          return 88;
        }
        // Accelerate faster as we go
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Starfield effect moving fast */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full animate-[ping_0.5s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Speedometer */}
        <div className="bg-black border-4 border-gray-600 p-6 rounded-xl shadow-[0_0_40px_rgba(234,88,12,0.4)] relative transform scale-110">
          <div className="flex items-end gap-2">
            <span className={`text-6xl font-retro ${speed >= 88 ? 'text-red-500 animate-pulse drop-shadow-[0_0_15px_red]' : 'text-orange-500'}`}>
              {String(speed).padStart(2, '0')}
            </span>
            <span className="text-xl font-retro text-orange-400 mb-2">MPH</span>
          </div>
        </div>

        <div className="text-center space-y-2">
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(speed / 88) * 100}%` }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
                />
            </div>
            <p className="text-cyan-500/50 font-mono text-xs tracking-widest animate-pulse">
                INITIALIZING...
            </p>
        </div>
      </div>
    </motion.div>
  );
};