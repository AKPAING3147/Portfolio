import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';

interface HologramProjectCardProps {
    title: string;
    category: string;
    description: string;
    imageSrc: string;
    link: string;
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

            {/* Image Section */}
            <div className="h-56 relative overflow-hidden border-b border-white/10 group-hover:border-white/30 transition-colors">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                {/* Color Overlay */}
                <div className={`absolute inset-0 ${themeClasses.bg} opacity-10 mix-blend-overlay`}></div>
            </div>

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

                <div className="mt-auto">
                    <a href={link} target="_blank" rel="noreferrer" className={`group/btn relative inline-flex items-center justify-center gap-2 w-full py-4 font-bold uppercase tracking-widest text-sm border-2 ${themeClasses.border} ${themeClasses.text} hover:bg-white/5 transition-all duration-300 overflow-hidden`}>
                        <span className="relative z-10 flex items-center gap-2">
                            <ExternalLink size={16} />
                            LAUNCH PROJECT
                        </span>
                        <div className={`absolute inset-0 ${themeClasses.bg} opacity-0 group-hover/btn:opacity-20 transition-opacity`}></div>
                        {/* Button Glitch Effect */}
                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover/btn:animate-[shimmer_1s_infinite]"></div>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
