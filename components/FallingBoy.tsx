import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface FallingBoyProps {
  onPop?: () => void;
  isAkatsuki?: boolean; 
  isStarWars?: boolean;
  isRickAndMorty?: boolean;
  isLoveTheme?: boolean;
}

export const FallingBoy: React.FC<FallingBoyProps> = ({ onPop, isAkatsuki = false, isStarWars = false, isRickAndMorty = false, isLoveTheme = false }) => {
  const [isPopped, setIsPopped] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth physics for the falling effect
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, restDelta: 0.001 });

  // Vertical Motion
  const y = useTransform(smoothProgress, 
    [0, 0.1, 0.9, 1], 
    ["-20vh", "15vh", "60vh", "75vh"]
  );
  
  // Horizontal Sway
  const x = useTransform(smoothProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["0vw", "8vw", "-8vw", "12vw", "-4vw", "0vw"]
  );
  
  // Rotation
  const rotate = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [5, -8, 6, -4, 0]
  );

  // Scale
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 1]);

  const handlePop = () => {
    setIsPopped(true);
    if (onPop) {
      onPop();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div 
        style={{ top: y, left: "50%", x, rotate, scale }} 
        className="absolute w-64 h-auto flex flex-col items-center -ml-32"
      >
        {/* Interactive Carrier (Balloon / Rinnegan / TIE Fighter / UFO / Cupid Wings) */}
        <div 
            className={`relative w-full flex justify-center pointer-events-auto cursor-pointer z-20 group/balloon ${isRickAndMorty || isLoveTheme ? 'z-30' : ''}`}
            onClick={handlePop}
        >
           <AnimatePresence mode="wait">
             {!isPopped ? (
               isAkatsuki ? (
                   /* --- NAGATO'S RINNEGAN (RED THEMED) --- */
                   <motion.div
                        key="rinnegan"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(8px)" }}
                        className="w-32 h-32 relative rounded-full overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.8)] border-2 border-red-900 group-hover/balloon:scale-105 transition-transform bg-[#2a0a0a]"
                   >
                        {/* Concentric Circles (Rinnegan Pattern) */}
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30"
                                style={{ 
                                    width: `${(i + 1) * 20}%`, 
                                    height: `${(i + 1) * 20}%`,
                                    boxShadow: 'inset 0 0 10px rgba(220,38,38,0.2)'
                                }}
                            />
                        ))}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full opacity-80"></div>
                        
                        {/* Subtle Glow Pulse */}
                        <div className="absolute inset-0 bg-red-600/20 animate-pulse rounded-full"></div>
                   </motion.div>
               ) : isStarWars ? (
                   /* --- TIE FIGHTER (STAR WARS THEMED) --- */
                   <motion.div
                     key="tiefighter"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 1.5, opacity: 0, rotate: 720 }}
                     className="relative w-48 h-32 flex items-center justify-center group-hover/balloon:scale-105 transition-transform"
                   >
                       {/* Center Cockpit */}
                       <div className="w-16 h-16 bg-gray-300 rounded-full border-2 border-gray-500 z-10 relative shadow-inner flex items-center justify-center overflow-hidden">
                           {/* Window Frame */}
                           <div className="absolute inset-0 border-[3px] border-gray-600 rounded-full opacity-50"></div>
                           <div className="absolute w-full h-[1px] bg-gray-600 top-1/2 left-0"></div>
                           <div className="absolute h-full w-[1px] bg-gray-600 top-0 left-1/2"></div>
                       </div>
                       
                       {/* Left Wing */}
                       <div className="absolute left-4 h-32 w-4 bg-gray-800 border-2 border-gray-500 rounded-sm skew-y-12"></div>
                       <div className="absolute left-8 h-8 w-6 bg-gray-500/50 -ml-1"></div> {/* Connector */}

                       {/* Right Wing */}
                       <div className="absolute right-4 h-32 w-4 bg-gray-800 border-2 border-gray-500 rounded-sm -skew-y-12"></div>
                       <div className="absolute right-8 h-8 w-6 bg-gray-500/50 -mr-1"></div> {/* Connector */}
                   </motion.div>
               ) : isRickAndMorty ? (
                   /* --- RICK'S UFO (SPACE CRUISER) --- */
                   <motion.div
                     key="ufo"
                     initial={{ scale: 0 }}
                     animate={{ scale: 1, rotate: [0, 2, -2, 0] }}
                     exit={{ scale: 0, rotate: 720 }}
                     transition={{ duration: 0.5 }}
                     className="w-48 h-32 relative flex items-center justify-center group-hover/balloon:scale-105 transition-transform z-20"
                   >
                      {/* Glass Dome (Cockpit) */}
                      <div className="absolute top-0 w-24 h-24 bg-cyan-200/40 rounded-full border-2 border-cyan-400 backdrop-blur-sm z-10 overflow-hidden shadow-[inset_0_10px_20px_rgba(255,255,255,0.4)]">
                          {/* Glare */}
                          <div className="absolute top-4 left-4 w-4 h-6 bg-white/60 rounded-full transform -rotate-45 blur-[2px]"></div>
                      </div>

                      {/* Saucer Body */}
                      <div className="absolute bottom-4 w-48 h-12 bg-zinc-300 rounded-[50%] border-b-4 border-zinc-400 shadow-xl z-20 flex items-center justify-center overflow-hidden">
                           {/* Metal Sheen */}
                           <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-zinc-300 to-zinc-500"></div>
                           {/* Rim Lights */}
                           <div className="absolute w-full h-full flex items-center justify-around px-2">
                               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></div>
                               <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-100 shadow-[0_0_5px_yellow]"></div>
                               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200 shadow-[0_0_5px_red]"></div>
                               <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-300 shadow-[0_0_5px_yellow]"></div>
                           </div>
                      </div>
                      
                      {/* Side Thrusters / Wings */}
                      <div className="absolute bottom-6 -left-2 w-8 h-4 bg-zinc-600 rounded-l-full skew-x-12 z-10 border border-zinc-500"></div>
                      <div className="absolute bottom-6 -right-2 w-8 h-4 bg-zinc-600 rounded-r-full -skew-x-12 z-10 border border-zinc-500"></div>

                      {/* Engine Glow underneath */}
                      <div className="absolute -bottom-2 w-20 h-4 bg-blue-500/80 blur-md rounded-[50%] animate-pulse z-0"></div>
                   </motion.div>
               ) : isLoveTheme ? (
                   /* --- CUPID/WINGS (LOVE THEME) --- */
                   <motion.div
                     key="cupid"
                     initial={{ scale: 0.8, y: -20, opacity: 0 }}
                     animate={{ 
                        scale: 1, 
                        y: [0, -10, 0],
                     }}
                     transition={{ 
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                     }}
                     exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                     className="relative w-48 h-32 group-hover/balloon:scale-105 transition-transform z-20 flex justify-center items-center"
                   >
                     {/* Left Wing */}
                     <div className="absolute left-0 top-0 w-20 h-32 bg-white/90 rounded-l-full origin-right rotate-12 shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-[flapLeft_1s_ease-in-out_infinite]"></div>
                     
                     {/* Right Wing */}
                     <div className="absolute right-0 top-0 w-20 h-32 bg-white/90 rounded-r-full origin-left -rotate-12 shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-[flapRight_1s_ease-in-out_infinite]"></div>
                     
                     <style>{`
                        @keyframes flapLeft {
                            0%, 100% { transform: rotate(12deg) translateX(0); }
                            50% { transform: rotate(0deg) translateX(5px); }
                        }
                        @keyframes flapRight {
                            0%, 100% { transform: rotate(-12deg) translateX(0); }
                            50% { transform: rotate(0deg) translateX(-5px); }
                        }
                     `}</style>

                     {/* Halo */}
                     <div className="absolute -top-12 w-20 h-6 border-4 border-yellow-300 rounded-[50%] shadow-[0_0_10px_yellow] animate-pulse"></div>

                     {/* Cupid's Arrow (Decorative) */}
                     <div className="absolute -bottom-4 w-32 h-1 bg-red-400 rotate-[-15deg] z-40">
                        <div className="absolute -left-2 -top-1 w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-red-400 border-b-[6px] border-b-transparent"></div> {/* Tip */}
                        <div className="absolute -right-2 -top-1 w-4 h-4 bg-white rotate-45"></div> {/* Fletching */}
                     </div>
                   </motion.div>
               ) : (
                   /* --- STANDARD BALLOON --- */
                   <motion.div
                     key="balloon"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 1.5, opacity: 0, filter: "blur(8px)" }}
                     transition={{ duration: 0.15 }}
                     className="w-32 h-40 relative filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover/balloon:scale-105 transition-transform"
                   >
                      <div className="absolute inset-0 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-900 shadow-inner"></div>
                      <div className="absolute top-6 left-6 w-8 h-12 bg-gradient-to-br from-white to-transparent rounded-[50%] opacity-60 blur-[2px] transform -rotate-45"></div>
                      <div className="absolute bottom-2 right-2 w-20 h-20 rounded-full bg-gradient-to-tl from-purple-500/30 to-transparent blur-md"></div>
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-3 h-2 bg-blue-800 rounded-sm"></div>
                   </motion.div>
               )
             ) : (
               /* --- EXPLOSION --- */
               <motion.div
                 key="explosion"
                 initial={{ scale: 0.5, opacity: 1 }}
                 animate={{ scale: 2, opacity: 0 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="absolute inset-0 flex items-center justify-center w-64 h-64 -mt-10"
               >
                 {isAkatsuki ? (
                    <>
                        <div className="absolute w-full h-full bg-black rounded-full blur-xl opacity-90"></div>
                        <div className="absolute w-2/3 h-2/3 bg-red-600 rounded-full blur-md animate-ping"></div>
                        <div className="absolute w-full h-full flex items-center justify-center font-retro text-red-500 text-xl font-bold z-50 tracking-widest drop-shadow-[0_0_10px_black]">
                             SHINRA TENSEI!
                        </div>
                    </>
                 ) : isStarWars ? (
                    <>
                        <div className="absolute w-full h-full bg-black rounded-full blur-xl opacity-90"></div>
                        <div className="absolute w-2/3 h-2/3 bg-yellow-400 rounded-full blur-md animate-ping"></div>
                        <div className="absolute w-full h-full flex items-center justify-center font-retro text-yellow-300 text-2xl font-bold z-50 tracking-widest drop-shadow-[0_0_10px_red]">
                             IT'S A TRAP!
                        </div>
                    </>
                 ) : isRickAndMorty ? (
                     <>
                        <div className="absolute w-full h-full bg-green-900 rounded-full blur-xl opacity-90"></div>
                        <div className="absolute w-2/3 h-2/3 bg-green-400 rounded-full blur-md animate-ping"></div>
                        <div className="absolute w-full h-full flex items-center justify-center font-retro text-green-200 text-lg font-bold z-50 tracking-widest drop-shadow-[0_0_10px_green] text-center leading-tight">
                             WUBBA LUBBA<br/>DUB DUB!
                        </div>
                    </>
                 ) : isLoveTheme ? (
                     <>
                        <div className="absolute w-full h-full bg-pink-200 rounded-full blur-xl opacity-90"></div>
                        <div className="absolute w-2/3 h-2/3 bg-red-400 rounded-full blur-md animate-ping"></div>
                        <div className="absolute w-full h-full flex items-center justify-center font-hand text-red-600 text-2xl font-bold z-50 tracking-widest drop-shadow-[0_0_10px_white] text-center leading-tight">
                             LOVE IS IN<br/>THE AIR!
                        </div>
                        {/* Exploding Hearts */}
                        <div className="absolute top-0 left-0 text-3xl animate-bounce">❤️</div>
                        <div className="absolute top-0 right-0 text-3xl animate-bounce delay-100">💖</div>
                        <div className="absolute bottom-0 left-10 text-3xl animate-bounce delay-200">💘</div>
                     </>
                 ) : (
                    <>
                        <div className="absolute w-full h-full bg-orange-500 rounded-full blur-xl opacity-80"></div>
                        <div className="absolute w-2/3 h-2/3 bg-yellow-300 rounded-full blur-md animate-ping"></div>
                        <div className="absolute w-full h-full flex items-center justify-center font-retro text-yellow-100 text-4xl font-bold shadow-black drop-shadow-[0_4px_0_rgba(0,0,0,1)] z-50">
                            POP!
                        </div>
                    </>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Rope/String/Tractor Beam - Hide for Rick & Morty and Love Theme because the cat is INSIDE/HELD */}
        <AnimatePresence>
            {!isPopped && !isRickAndMorty && !isLoveTheme && (
                <motion.div 
                    exit={{ height: 0, opacity: 0 }}
                    className={`
                        origin-top shadow-sm z-10
                        ${isAkatsuki ? 'bg-red-900 h-16 w-[2px]' 
                        : isStarWars ? 'bg-gradient-to-b from-green-500/50 to-transparent h-20 w-8 blur-sm -mt-4' 
                        : 'bg-white/60 h-24 -mt-2 w-[2px]'}
                    `}
                ></motion.div>
            )}
        </AnimatePresence>

        {/* Real Cat Container */}
        <motion.div 
            className={`relative z-10 group perspective-[500px] ${isRickAndMorty ? '-mt-24 pointer-events-none' : ''} ${isLoveTheme ? '-mt-24 pointer-events-none' : ''}`}
            animate={isPopped ? { y: 1200, rotate: 15 } : { y: 0, rotate: 0 }}
            transition={isPopped ? { duration: 1.5, ease: [0.5, 0, 1, 1] } : {}}
        >
            {/* Basket/Harness Straps - Hide for Star Wars/Rick/Love */}
            <AnimatePresence>
                {!isPopped && !isStarWars && !isRickAndMorty && !isLoveTheme && (
                    <motion.div 
                        exit={{ opacity: 0 }}
                        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-12 border-l-2 border-r-2 skew-x-12 z-0
                            ${isAkatsuki ? 'border-red-900' : 'border-white/60'}
                        `}
                    />
                )}
            </AnimatePresence>

            {/* Cat Image Frame / Pod */}
            <motion.div 
              className={`
                relative rounded-full overflow-hidden z-10
                ${isRickAndMorty 
                    ? 'w-16 h-16 border-none shadow-none z-0 ml-1 mt-2' // Small cat inside UFO
                    : isLoveTheme 
                        ? 'w-24 h-24 border-4 border-pink-200 shadow-[0_0_20px_rgba(255,192,203,0.8)] z-30' // Cat held by Cupid wings
                        : 'w-36 h-36 border-4 shadow-[0_0_50px_rgba(0,255,255,0.4)]'
                }
                ${isAkatsuki ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.6)]' : ''} 
                ${isStarWars ? 'border-gray-300 shadow-[0_0_20px_rgba(34,255,0,0.4)] bg-black' : ''}
                ${!isRickAndMorty && !isAkatsuki && !isStarWars && !isLoveTheme ? 'border-white/90' : ''}
              `}
              animate={isPopped ? { rotate: [0, 360] } : { rotate: [0, 2, -2, 0] }}
              transition={isPopped ? { duration: 0.8, repeat: Infinity, ease: "linear" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <img 
                    src="/photo_2025-12-12_16-50-23.jpg" 
                    alt="Space Cat" 
                    className={`w-full h-full object-cover transform scale-110 hover:scale-125 transition-transform duration-700 
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
            </motion.div>
            
        </motion.div>
      </motion.div>
    </div>
  );
};