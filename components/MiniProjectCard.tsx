import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface MiniProjectCardProps {
    title: string;
    category: string;
    description: string;
    imageSrc: string;
    link?: string;
    githubLink?: string;
    icon: React.ElementType;
    techStack: string[];
    themeClasses: {
        border: string;
        shadow: string;
        text: string;
        icon: string;
        bg: string;
    };
}

export const MiniProjectCard: React.FC<MiniProjectCardProps> = ({
    title,
    category,
    description,
    imageSrc,
    link,
    githubLink,
    icon: Icon,
    techStack,
    themeClasses
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`group relative bg-black/70 backdrop-blur-sm border-2 ${themeClasses.border} rounded-xl overflow-hidden ${themeClasses.shadow} hover:shadow-2xl transition-all duration-300`}
        >
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-black/80 backdrop-blur border ${themeClasses.border}`}>
                        <Icon size={16} className={themeClasses.text} />
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded-md bg-black/80 border ${themeClasses.border} ${themeClasses.text}`}>
                        {category}
                    </span>
                </div>

                {/* Links */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-lg bg-black/90 backdrop-blur border ${themeClasses.border} hover:scale-110 transition-transform`}
                        >
                            <ExternalLink size={14} className={themeClasses.text} />
                        </a>
                    )}
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-lg bg-black/90 backdrop-blur border ${themeClasses.border} hover:scale-110 transition-transform`}
                        >
                            <Github size={14} className={themeClasses.text} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 relative z-10">
                <h3 className={`text-xl font-bold mb-2 ${themeClasses.text} group-hover:translate-x-1 transition-transform duration-300`}>
                    {title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                    {techStack.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full bg-white/5 border ${themeClasses.border} text-gray-400 hover:${themeClasses.text} transition-colors`}
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/20 text-gray-500">
                            +{techStack.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className={`h-1 w-full bg-gradient-to-r ${themeClasses.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
        </motion.div>
    );
};
