import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';

interface HologramProjectCardProps {
    title: string;
    category: string;
    description: string;
    imageSrc: string;
    link: string;
    githubLink?: string;
    icon: LucideIcon;
    themeClasses: {
        border: string;
        shadow: string;
        text: string;
        icon: string;
        bg?: string;
    };
}

export const HologramProjectCard: React.FC<HologramProjectCardProps> = ({
    title,
    category,
    description,
    imageSrc,
    link,
    githubLink,
    icon: Icon,
    themeClasses
}) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`relative group overflow-hidden rounded-xl border-2 ${themeClasses.border} ${themeClasses.shadow} bg-black/80 backdrop-blur-md transition-all duration-500 hover:scale-[1.02]`}
        >
            {/* Holographic Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[size:100%_3px] animate-pulse"></div>

            {/* HUD Corners */}
            <div className={`absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 ${themeClasses.border} rounded-tl-lg z-20 opacity-80`}></div>
            <div className={`absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 ${themeClasses.border} rounded-tr-lg z-20 opacity-80`}></div>
            <div className={`absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 ${themeClasses.border} rounded-bl-lg z-20 opacity-80`}></div>
            <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 ${themeClasses.border} rounded-br-lg z-20 opacity-80`}></div>

            {/* Image Section - Clickable */}
            <a href={link} target="_blank" rel="noreferrer" className="block h-56 relative overflow-hidden border-b border-white/10 group-hover:border-white/30 transition-colors cursor-pointer">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                {/* Color Overlay */}
                <div className={`absolute inset-0 ${themeClasses.bg} opacity-10 mix-blend-overlay`}></div>
            </a>

            {/* Content Section */}
            <div className="p-8 relative z-20 flex flex-col h-full bg-gradient-to-b from-transparent to-black/90">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded border ${themeClasses.border} bg-black/50`}>
                        <Icon size={18} className={`${themeClasses.icon}`} />
                    </div>
                    <span className={`text-xs font-retro tracking-widest uppercase ${themeClasses.text} drop-shadow-[0_0_5px_currentColor]`}>{category}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-retro mb-4 text-white drop-shadow-md flex items-center gap-3">
                    {title}
                    <a href={link} target="_blank" rel="noreferrer" className={`opacity-50 hover:opacity-100 transition-opacity ${themeClasses.text}`}>
                        <ExternalLink size={24} />
                    </a>
                </h3>

                <p className="text-sm font-mono text-gray-300 leading-relaxed mb-8">
                    {description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <a href={link} target="_blank" rel="noreferrer" className={`group/btn relative inline-flex items-center justify-center gap-2 w-full py-3 font-bold uppercase tracking-widest text-xs md:text-sm border-2 ${themeClasses.border} ${themeClasses.text} hover:bg-white/5 transition-all duration-300 overflow-hidden`}>
                        <span className="relative z-10 flex items-center gap-2">
                            <ExternalLink size={16} />
                            LAUNCH
                        </span>
                        <div className={`absolute inset-0 ${themeClasses.bg} opacity-0 group-hover/btn:opacity-20 transition-opacity`}></div>
                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover/btn:animate-[shimmer_1s_infinite]"></div>
                    </a>

                    {githubLink && (
                        <a href={githubLink} target="_blank" rel="noreferrer" className={`group/btn relative inline-flex items-center justify-center gap-2 w-full py-3 font-bold uppercase tracking-widest text-xs md:text-sm border-2 border-white/20 text-gray-300 hover:bg-white/5 transition-all duration-300 overflow-hidden`}>
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="text-lg">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-130.7-20.8-40.6-1.5-104 4.5-119.6 0 0 61.5-17 191 71.8 58.6-16.6 93.1-12.2 132.1-12.2 30.7 0 71.8 4.2 131.6 20.9 96.6-69.6 150.9-50.6 150.9-50.6 6.8 17.6 16.9 61.3 6.9 99.4 33.2 35.7 51.7 81.3 51.7 131.1 0 102.4-59.5 187.8-200.7 212.8 23.3 23 37.7 55.4 37.7 94.6v127.3c0 11.4 4 28.3 23.2 22.2 174.1-61.2 299-227.1 299-422.5 0-246.6-200.9-446.7-446.7-446.7z"></path></svg>
                                </span>
                                CODE
                            </span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
