import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UFOWithMomProps {
    isAkatsuki?: boolean;
    isStarWars?: boolean;
    isRickAndMorty?: boolean;
    isLoveTheme?: boolean;
    isCentralCee?: boolean;
}

export const UFOWithMom: React.FC<UFOWithMomProps> = ({
    isAkatsuki,
    isStarWars,
    isRickAndMorty,
    isLoveTheme,
    isCentralCee
}) => {
    const [isComplete, setIsComplete] = useState(false);

    // Determine theme color
    const ufoColor = isAkatsuki ? '#dc2626'
        : isStarWars ? '#facc15'
            : isRickAndMorty ? '#22c55e'
                : isLoveTheme ? '#ec4899'
                    : isCentralCee ? '#f97316'
                        : '#06b6d4';

    const glowColor = isAkatsuki ? 'rgba(220, 38, 38, 0.6)'
        : isStarWars ? 'rgba(250, 204, 21, 0.6)'
            : isRickAndMorty ? 'rgba(34, 197, 94, 0.6)'
                : isLoveTheme ? 'rgba(236, 72, 153, 0.6)'
                    : isCentralCee ? 'rgba(249, 115, 22, 0.6)'
                        : 'rgba(6, 182, 212, 0.6)';

    if (isComplete) {
        return null;
    }

    return (
        <motion.div
            className="absolute z-20 pointer-events-none"
            initial={{ x: '-200px', y: '20%' }}
            animate={{
                x: 'calc(100vw + 200px)',
                y: ['20%', '15%', '25%', '18%', '20%'],
            }}
            transition={{
                x: {
                    duration: 20,
                    ease: "linear"
                },
                y: {
                    duration: 4,
                    repeat: 3,
                    ease: "easeInOut"
                }
            }}
            onAnimationComplete={() => {
                setIsComplete(true);
            }}
            style={{
                top: '5%',
                left: '0'
            }}
        >
            {/* "Hi Mom" Trail behind UFO */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: [0, 0, 1, 1, 0.8],
                    scale: [0.5, 0.5, 1, 1.2, 1]
                }}
                transition={{
                    duration: 5,
                    delay: 2,
                    ease: "easeOut"
                }}
                className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap font-hand pointer-events-none"
                style={{
                    color: isLoveTheme ? '#ec4899' : '#fff',
                    fontSize: '1rem',
                    textShadow: `0 0 15px ${glowColor}, 0 0 30px ${glowColor}, 0 0 45px ${glowColor}`,
                    filter: 'blur(0.3px)',
                    fontWeight: 'bold'
                }}
            >
                Hi Mom! ❤️
            </motion.div>

            {/* UFO */}
            <div className="relative flex flex-col items-center">
                {/* UFO Dome/Cockpit */}
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {/* Glass Dome */}
                    <div
                        className="w-8 h-8 rounded-full mx-auto relative"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${ufoColor}40)`,
                            border: `1.5px solid ${ufoColor}`,
                            boxShadow: `0 0 15px ${glowColor}, inset 0 0 8px rgba(255,255,255,0.3)`
                        }}
                    >
                        {/* Alien inside */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-3 h-3.5 bg-green-400 rounded-full relative">
                                <div className="absolute w-1 h-1 bg-black rounded-full top-0.5 left-0.5"></div>
                                <div className="absolute w-1 h-1 bg-black rounded-full top-0.5 right-0.5"></div>
                            </div>
                        </div>
                    </div>

                    {/* UFO Base/Disc */}
                    <div
                        className="w-16 h-4 relative -mt-1.5"
                        style={{
                            background: `linear-gradient(to bottom, ${ufoColor}, ${ufoColor}99)`,
                            borderRadius: '50%',
                            border: `1.5px solid ${ufoColor}`,
                            boxShadow: `0 0 20px ${glowColor}, 0 3px 10px rgba(0,0,0,0.5)`
                        }}
                    >
                        {/* Lights on UFO */}
                        <motion.div
                            animate={{
                                opacity: [1, 0.3, 1]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity
                            }}
                            className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                            style={{ boxShadow: '0 0 8px yellow' }}
                        />
                        <motion.div
                            animate={{
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity
                            }}
                            className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full transform -translate-x-1/2"
                            style={{ boxShadow: '0 0 8px cyan' }}
                        />
                        <motion.div
                            animate={{
                                opacity: [1, 0.3, 1]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity
                            }}
                            className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full"
                            style={{ boxShadow: '0 0 8px pink' }}
                        />
                    </div>

                    {/* Light Beam */}
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scaleY: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute left-1/2 -translate-x-1/2 top-full"
                        style={{
                            width: '1.5px',
                            height: '40px',
                            background: `linear-gradient(to bottom, ${ufoColor}, transparent)`,
                            boxShadow: `0 0 8px ${glowColor}`
                        }}
                    />

                    {/* String attachment point on UFO */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full border border-gray-400"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
