import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const HiMomEasterEgg: React.FC = () => {
    const [show, setShow] = useState(false);
    const [keySequence, setKeySequence] = useState('');

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const newSequence = (keySequence + e.key).toLowerCase().slice(-5);
            setKeySequence(newSequence);

            if (newSequence === 'himom') {
                setShow(true);
                setKeySequence(''); // Reset sequence

                // Hide after 5 seconds
                setTimeout(() => {
                    setShow(false);
                }, 5000);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [keySequence]);

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Main Message */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            opacity: 1,
                            y: [0, -20, 0]
                        }}
                        exit={{
                            scale: 0,
                            rotate: 180,
                            opacity: 0,
                            transition: { duration: 0.5 }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            y: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }
                        }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-pink-500/30 blur-3xl animate-pulse" />

                            {/* Main Text Card */}
                            <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-8 md:p-12 rounded-3xl border-4 border-white shadow-[0_0_100px_rgba(236,72,153,0.8)]">
                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full" />
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full" />
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full" />

                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: "easeInOut"
                                    }}
                                    className="flex items-center gap-4"
                                >
                                    <Heart fill="white" className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                    <h1 className="text-4xl md:text-7xl font-hand text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                                        Hi Mom!
                                    </h1>
                                    <Heart fill="white" className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                </motion.div>

                                <p className="text-white/90 font-retro text-xs md:text-sm text-center mt-4">
                                    Love you! ❤️
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Hearts Animation */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                y: "100vh",
                                x: Math.random() * window.innerWidth,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                y: "-100vh",
                                opacity: [0, 1, 1, 0],
                                scale: [0, 1.5, 1, 0],
                                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "linear"
                            }}
                            className="fixed z-[9998] pointer-events-none"
                            style={{
                                left: `${Math.random() * 100}%`
                            }}
                        >
                            <Heart
                                fill={`hsl(${330 + Math.random() * 30}, 100%, ${60 + Math.random() * 20}%)`}
                                className="text-pink-500"
                                size={20 + Math.random() * 40}
                            />
                        </motion.div>
                    ))}

                    {/* Confetti Effect */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={`confetti-${i}`}
                            initial={{
                                y: "50vh",
                                x: "50vw",
                                opacity: 1,
                                scale: 1
                            }}
                            animate={{
                                y: `${Math.random() * 100}vh`,
                                x: `${Math.random() * 100}vw`,
                                opacity: 0,
                                scale: 0,
                                rotate: Math.random() * 720
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 2 + Math.random(),
                                ease: "easeOut"
                            }}
                            className="fixed z-[9997] pointer-events-none w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`
                            }}
                        />
                    ))}
                </>
            )}
        </AnimatePresence>
    );
};
