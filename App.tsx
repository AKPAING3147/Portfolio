import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FallingBoy } from './components/FallingBoy';
import { Preloader } from './components/Preloader';
import { BackgroundAudio } from './components/BackgroundAudio';
import { HologramProjectCard } from './components/HologramProjectCard';
import { Code, Terminal, Zap, Cloud, Github, Linkedin, Database, Layout, GraduationCap, BookOpen, AlertTriangle, Globe, ExternalLink, School, Palette, Layers, Mail, Heart } from 'lucide-react';

// Reusable Component for Timeline/Project Sections
interface ProjectShowcaseProps {
  year: string;
  title: string;
  description: string;
  align: 'left' | 'right';
  themeColor: string; // e.g., 'border-pink-500'
  icon: React.ElementType;
  imageSrc: string;
  tags?: string[];
  link?: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ year, title, description, align, themeColor, icon: Icon, imageSrc, tags, link }) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Empty column for spacing/Falling Cat visibility */}
        <div className={`${align === 'left' ? 'order-2 md:order-2' : 'order-2 md:order-1'} h-full pointer-events-none hidden md:block`} />

        {/* Modal Box */}
        <motion.div
          initial={{
            x: align === 'left' ? -100 : 100,
            opacity: 0,
            rotate: align === 'left' ? -5 : 5
          }}
          whileInView={{
            x: 0,
            opacity: 1,
            rotate: 0
          }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
          className={`
            ${align === 'left' ? 'order-1 md:order-1' : 'order-1 md:order-2'}
            bg-black/90 backdrop-blur-md border-4 ${themeColor} 
            p-6 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] 
            relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500
          `}
        >
          {/* Background Grid Pattern inside Modal */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

          {/* Decorative Corner Bolts */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gray-500 rounded-full shadow-inner"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gray-500 rounded-full shadow-inner"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-500 rounded-full shadow-inner"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-500 rounded-full shadow-inner"></div>

          {/* Project Image Area */}
          <div className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden border-2 border-white/20 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
            <img src={imageSrc} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* Header Badge over Image */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={`p-2 rounded-full bg-black/50 backdrop-blur border ${themeColor}`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>

            {/* Tech Stack Overlay (Year replaced with Category) */}
            <div className="absolute bottom-2 left-4">
              <span className={`text-2xl md:text-3xl font-retro ${themeColor.replace('border-', 'text-')} drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase`}>
                {year}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-hand text-white mb-2 relative z-10 flex items-center gap-2">
            {title}
            {link && <a href={link} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors"><ExternalLink size={18} /></a>}
          </h3>
          <p className="text-gray-300 font-mono leading-relaxed relative z-10 mb-4 text-sm md:text-base">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 relative z-10">
            {tags?.map((tag, i) => (
              <span key={i} className={`text-xs font-bold px-2 py-1 rounded bg-white/10 border ${themeColor} ${themeColor.replace('border-', 'text-')}`}>
                {tag}
              </span>
            ))}
          </div>

          {link && (
            <a href={link} target="_blank" rel="noreferrer" className={`mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${themeColor.replace('border-', 'text-')} hover:underline relative z-10`}>
              Visit Link <ExternalLink size={14} />
            </a>
          )}

          {/* Large faded icon in background */}
          <Icon className={`absolute -bottom-10 -right-10 w-64 h-64 opacity-5 ${themeColor.replace('border-', 'text-')} transform -rotate-12`} />
        </motion.div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isAkatsuki = currentSongIndex === 0;
  const isStarWars = currentSongIndex === 1;
  const isRickAndMorty = currentSongIndex === 2;
  const isLoveTheme = currentSongIndex === 3;

  const themeConfig = {
    border: isAkatsuki ? 'border-red-600' : isStarWars ? 'border-yellow-500' : isRickAndMorty ? 'border-green-500' : isLoveTheme ? 'border-pink-400' : 'border-cyan-500',
    shadow: isAkatsuki ? 'shadow-[0_0_30px_rgba(220,38,38,0.3)]' : isStarWars ? 'shadow-[0_0_30px_rgba(250,204,21,0.3)]' : isRickAndMorty ? 'shadow-[0_0_30px_rgba(74,222,128,0.3)]' : isLoveTheme ? 'shadow-[0_0_30px_rgba(244,63,94,0.3)]' : 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    text: isAkatsuki ? 'text-red-500' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-400' : isLoveTheme ? 'text-pink-500' : 'text-cyan-400',
    icon: isAkatsuki ? 'text-red-500' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-400' : isLoveTheme ? 'text-pink-500' : 'text-cyan-400',
    bg: isAkatsuki ? 'bg-red-500' : isStarWars ? 'bg-yellow-400' : isRickAndMorty ? 'bg-green-400' : isLoveTheme ? 'bg-pink-400' : 'bg-cyan-400'
  };

  const handleBalloonPop = () => {
    // Delay the scroll slightly to allow the pop animation to register
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 600);
  };

  // Background Parallax & Transitions
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // If Star Wars/Rick mode, stars are always visible (space). Otherwise, they fade in.
  const scrollStarsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Background Colors transition as we scroll through eras/stacks
  // Standard Theme
  const standardBgColor = useTransform(scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#0f172a", "#1e1b4b", "#312e81", "#4c1d95", "#0f172a"]
  );

  const techStack = [
    {
      category: "Core Framework",
      icon: Code,
      color: isAkatsuki ? "text-red-500" : isStarWars ? "text-yellow-400" : isRickAndMorty ? "text-green-400" : isLoveTheme ? "text-pink-400" : "text-cyan-400",
      borderColor: isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-green-500" : isLoveTheme ? "border-pink-500" : "border-cyan-500",
      shadow: isAkatsuki ? "shadow-[0_0_20px_rgba(220,38,38,0.3)]" : isStarWars ? "shadow-[0_0_20px_rgba(250,204,21,0.3)]" : isRickAndMorty ? "shadow-[0_0_20px_rgba(74,222,128,0.3)]" : isLoveTheme ? "shadow-[0_0_20px_rgba(236,72,153,0.3)]" : "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
      items: ["Next.js (App Router)", "TypeScript"]
    },
    {
      category: "UI & Animation",
      icon: Palette,
      color: isAkatsuki ? "text-red-500" : isStarWars ? "text-yellow-400" : isRickAndMorty ? "text-green-400" : isLoveTheme ? "text-rose-400" : "text-pink-400",
      borderColor: isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-green-500" : isLoveTheme ? "border-rose-500" : "border-pink-500",
      shadow: isAkatsuki ? "shadow-[0_0_20px_rgba(220,38,38,0.3)]" : isStarWars ? "shadow-[0_0_20px_rgba(250,204,21,0.3)]" : isRickAndMorty ? "shadow-[0_0_20px_rgba(74,222,128,0.3)]" : isLoveTheme ? "shadow-[0_0_20px_rgba(244,63,94,0.3)]" : "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
      items: ["Tailwind CSS", "shadcn/ui", "Framer Motion"]
    },
    {
      category: "State Management",
      icon: Layers,
      color: isAkatsuki ? "text-red-500" : isStarWars ? "text-yellow-400" : isRickAndMorty ? "text-cyan-400" : isLoveTheme ? "text-purple-400" : "text-yellow-400",
      borderColor: isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-cyan-500" : isLoveTheme ? "border-purple-500" : "border-yellow-500",
      shadow: isAkatsuki ? "shadow-[0_0_20px_rgba(220,38,38,0.3)]" : isStarWars ? "shadow-[0_0_20px_rgba(250,204,21,0.3)]" : isRickAndMorty ? "shadow-[0_0_20px_rgba(34,211,238,0.3)]" : isLoveTheme ? "shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "shadow-[0_0_20px_rgba(250,204,21,0.3)]",
      items: ["Zustand"]
    },
    {
      category: "Backend & Data",
      icon: Database,
      color: isAkatsuki ? "text-red-500" : isStarWars ? "text-yellow-400" : isRickAndMorty ? "text-lime-400" : isLoveTheme ? "text-red-400" : "text-green-400",
      borderColor: isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-lime-500" : isLoveTheme ? "border-red-500" : "border-green-500",
      shadow: isAkatsuki ? "shadow-[0_0_20px_rgba(220,38,38,0.3)]" : isStarWars ? "shadow-[0_0_20px_rgba(250,204,21,0.3)]" : isRickAndMorty ? "shadow-[0_0_20px_rgba(163,230,53,0.3)]" : isLoveTheme ? "shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
      items: ["Supabase (DB + Auth)", "Prisma"]
    }
  ];

  return (
    <>
      {/* Audio persists across loading state, manages state */}
      <BackgroundAudio onSongChange={setCurrentSongIndex} />

      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        style={{ backgroundColor: isAkatsuki ? '#0a0a0a' : isStarWars ? '#000000' : isRickAndMorty ? '#101010' : isLoveTheme ? '#fce7f3' : standardBgColor }}
        className="relative w-full text-white overflow-hidden transition-colors duration-1000"
      >
        {/* Akatsuki Red Sky Gradient Overlay */}
        <AnimatePresence>
          {isAkatsuki && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0 bg-gradient-to-b from-black via-red-950/20 to-black pointer-events-none"
            />
          )}
          {/* Love Theme Heavenly Overlay */}
          {isLoveTheme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0 bg-gradient-to-b from-sky-200 via-pink-200 to-white pointer-events-none opacity-80"
            />
          )}
        </AnimatePresence>

        {/* --- Fixed Global Elements --- */}
        {!loading && (
          <FallingBoy
            onPop={handleBalloonPop}
            isAkatsuki={isAkatsuki}
            isStarWars={isStarWars}
            isRickAndMorty={isRickAndMorty}
            isLoveTheme={isLoveTheme}
          />
        )}

        {/* Stars Background Layer (Fixed) */}
        <motion.div style={{ opacity: isStarWars || isRickAndMorty ? 1 : isLoveTheme ? 0.3 : scrollStarsOpacity }} className="fixed inset-0 pointer-events-none z-0">
          <div className={`absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] 
                ${isAkatsuki ? 'invert filter sepia saturate-200 hue-rotate-[-50deg]' : ''}
                ${isStarWars ? 'opacity-90' : ''}
                ${isRickAndMorty ? 'opacity-90 hue-rotate-90' : ''}
                ${isLoveTheme ? 'invert opacity-20' : ''}
            `}></div>
        </motion.div>

        {/* Floating Clouds Layer - Hide for Star Wars & RickAndMorty as they are space themes */}
        {!isStarWars && !isRickAndMorty && (
          <motion.div style={{ y: skyY }} className={`fixed inset-0 w-full h-[150vh] pointer-events-none z-0 ${isAkatsuki ? 'text-red-900/40' : isLoveTheme ? 'text-white' : 'text-white/10'}`}>
            <div className="absolute top-[5%] left-[5%] animate-pulse"><Cloud size={120} className={isAkatsuki ? "drop-shadow-[0_0_10px_red]" : isLoveTheme ? "text-white drop-shadow-md opacity-80" : ""} /></div>
            <div className="absolute top-[15%] right-[10%] animate-pulse delay-700"><Cloud size={180} className={isAkatsuki ? "drop-shadow-[0_0_15px_red]" : isLoveTheme ? "text-white drop-shadow-lg opacity-90" : ""} /></div>
            <div className="absolute top-[35%] left-[15%] opacity-50"><Cloud size={100} className={isLoveTheme ? "text-pink-100" : ""} /></div>
            <div className="absolute top-[55%] right-[25%] opacity-50"><Cloud size={140} className={isAkatsuki ? "drop-shadow-[0_0_10px_darkred]" : isLoveTheme ? "text-white" : ""} /></div>
            <div className="absolute top-[75%] left-[5%] opacity-50"><Cloud size={160} /></div>
            <div className="absolute top-[90%] right-[15%] opacity-50"><Cloud size={120} /></div>

            {/* Love Theme: Floating Hearts */}
            {isLoveTheme && (
              <>
                <div className="absolute top-[20%] left-[20%] text-pink-500/50 animate-bounce">
                  <Heart fill="pink" size={32} />
                </div>
                <div className="absolute top-[40%] right-[10%] text-red-400/40 animate-pulse delay-500">
                  <Heart fill="#f87171" size={48} />
                </div>
                <div className="absolute top-[60%] right-[30%] text-rose-500/50 animate-bounce delay-1000">
                  <Heart fill="#f43f5e" size={24} />
                </div>
                <div className="absolute top-[80%] left-[40%] text-pink-300/60 animate-bounce delay-700">
                  <Heart fill="#fbcfe8" size={36} />
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Persistent Social Links */}
        <div className="fixed bottom-4 left-4 z-50 flex gap-3">
          <a href="https://github.com/AKPAING3147" target="_blank" rel="noreferrer" className={`p-2 bg-black/50 border rounded-full hover:bg-white hover:text-black transition-colors ${isAkatsuki ? 'border-red-600 text-red-500' : isStarWars ? 'border-yellow-500 text-yellow-400' : isRickAndMorty ? 'border-green-500 text-green-400' : isLoveTheme ? 'border-pink-500 text-pink-500 hover:text-pink-600' : 'border-white/20 text-white'}`}>
            <Github size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`p-2 bg-black/50 border rounded-full hover:bg-white hover:text-black transition-colors ${isAkatsuki ? 'border-red-600 text-red-500' : isStarWars ? 'border-yellow-500 text-yellow-400' : isRickAndMorty ? 'border-green-500 text-green-400' : isLoveTheme ? 'border-pink-500 text-pink-500 hover:text-pink-600' : 'border-white/20 text-white'}`}>
            <Linkedin size={20} />
          </a>
          <a href="mailto:aungp5979@gmail.com" className={`p-2 bg-black/50 border rounded-full hover:bg-white hover:text-black transition-colors ${isAkatsuki ? 'border-red-600 text-red-500' : isStarWars ? 'border-yellow-500 text-yellow-400' : isRickAndMorty ? 'border-green-500 text-green-400' : isLoveTheme ? 'border-pink-500 text-pink-500 hover:text-pink-600' : 'border-white/20 text-white'}`}>
            <Mail size={20} />
          </a>
        </div>

        {/* --- Section 1: Intro (The Fall Begins) --- */}
        <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="z-10 text-center px-4"
          >
            <div className={`inline-block mb-4 px-4 py-1 bg-black/40 border rounded-full ${isAkatsuki ? 'border-red-600' : isStarWars ? 'border-yellow-500' : isRickAndMorty ? 'border-green-500' : isLoveTheme ? 'border-pink-400 bg-white/30 text-pink-700 font-bold' : 'border-yellow-500'}`}>
              <p className={`font-retro text-xs md:text-sm ${isAkatsuki ? 'text-red-500' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-400' : isLoveTheme ? 'text-pink-600' : 'text-yellow-400'}`}>EST. 2002 • MANDALAY</p>
            </div>
            <h1 className={`text-4xl md:text-8xl font-retro text-transparent bg-clip-text drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-4 leading-tight skew-x-[-5deg] 
                  ${isAkatsuki ? 'bg-gradient-to-b from-red-500 via-red-800 to-black drop-shadow-[4px_4px_0_#450a0a]'
                : isStarWars ? 'bg-transparent text-yellow-400 stroke-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                  : isRickAndMorty ? 'bg-gradient-to-b from-green-400 via-green-600 to-black drop-shadow-[4px_4px_0_#14532d]'
                    : isLoveTheme ? 'bg-gradient-to-b from-pink-400 via-rose-500 to-purple-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.5)]'
                      : 'bg-gradient-to-b from-cyan-300 via-blue-500 to-purple-600'}`}>
              AKP<br />PORTFOLIO
            </h1>
            <div className={`inline-block bg-black/40 backdrop-blur border p-4 rounded-lg transform -rotate-2 ${isAkatsuki ? 'border-red-600' : isStarWars ? 'border-yellow-500' : isRickAndMorty ? 'border-green-500 shadow-[0_0_15px_#22c55e]' : isLoveTheme ? 'border-pink-400 bg-white/20 text-pink-800 shadow-[0_0_15px_pink]' : 'border-cyan-500/30'}`}>
              <p className={`font-mono text-xl md:text-2xl ${isAkatsuki ? 'text-red-400' : isStarWars ? 'text-yellow-200' : isRickAndMorty ? 'text-green-200' : isLoveTheme ? 'text-pink-700 font-bold' : 'text-cyan-200'}`}>
                <span className={isAkatsuki ? 'text-red-600' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-500' : isLoveTheme ? 'text-rose-500' : 'text-pink-500'}>&lt;</span>Next.js Developer <span className={isAkatsuki ? 'text-red-600' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-500' : isLoveTheme ? 'text-rose-500' : 'text-pink-500'}>/&gt;</span>
              </p>
              <p className={`text-sm mt-2 font-retro ${isAkatsuki ? 'text-red-800' : isStarWars ? 'text-yellow-600' : isRickAndMorty ? 'text-green-600' : isLoveTheme ? 'text-pink-600' : 'text-gray-400'}`}>MANDALAY TO THAILAND • THE JOURNEY</p>
            </div>

            <div className="mt-20 animate-bounce">
              <div className={`w-1 h-16 bg-gradient-to-b from-transparent mx-auto rounded-full opacity-50 ${isAkatsuki ? 'to-red-600' : isStarWars ? 'to-yellow-400' : isRickAndMorty ? 'to-green-500' : isLoveTheme ? 'to-rose-500' : 'to-cyan-400'}`}></div>
              <p className={`text-xs font-retro mt-2 ${isAkatsuki ? 'text-red-500' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-400' : isLoveTheme ? 'text-rose-500' : 'text-cyan-400'}`}>INITIALIZE TIMELINE</p>
            </div>
          </motion.div>
        </section>

        {/* --- Timeline Sections --- */}

        {/* 2019 - Matriculation */}
        <ProjectShowcase
          year="2019"
          title="The Foundation"
          description="Successfully passed the Matriculation Exam in Myanmar, setting the stage for a journey into technology and engineering."
          align="left"
          themeColor={isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-green-500" : isLoveTheme ? "border-pink-400" : "border-cyan-400"}
          icon={BookOpen}
          tags={['Education', 'Milestone', 'Myanmar']}
          imageSrc="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
        />

        {/* 2020 - Inet College */}
        <ProjectShowcase
          year="2020"
          title="Computer Science"
          description="Enrolled in Inet College to study Computer Science. Drove deep into algorithms, programming structures, and web development fundamentals."
          align="right"
          themeColor={isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-cyan-500" : isLoveTheme ? "border-rose-400" : "border-green-400"}
          icon={Code}
          tags={['Inet College', 'Coding', 'Web Dev']}
          imageSrc="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=800&auto=format&fit=crop"
          link="https://inet.edu.mm"
        />

        {/* 2021 - The Coup */}
        <ProjectShowcase
          year="2021"
          title="Resilience"
          description="A challenging year. The coup happened in Myanmar. Despite the political turmoil and internet disruptions, I persisted in my studies and remained focused on my goals."
          align="left"
          themeColor={isAkatsuki ? "border-red-800" : isRickAndMorty ? "border-red-900" : isLoveTheme ? "border-red-400" : "border-red-500"}
          icon={AlertTriangle}
          tags={['Adversity', 'Persistence', 'Myanmar']}
          imageSrc="https://images.unsplash.com/photo-1623945238202-b2a8c3d0cb81?q=80&w=800&auto=format&fit=crop"
        />

        {/* 2024 - Graduation */}
        <ProjectShowcase
          year="2024"
          title="UCLan Graduate"
          description="Achieved a major milestone: Graduated with a Degree in Computer Science from the University of Central Lancashire (UCLan)."
          align="right"
          themeColor={isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-purple-500" : isLoveTheme ? "border-purple-400" : "border-purple-500"}
          icon={GraduationCap}
          tags={['BSc Hons', 'UCLan', 'Graduation']}
          imageSrc="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=800&auto=format&fit=crop"
        />

        {/* 2025 - AIT Thailand */}
        <ProjectShowcase
          year="2025"
          title="Next Chapter: KBU"
          description="Currently pursuing advanced studies at (KBU) in Thailand. Expanding knowledge in AI, global tech trends, and research."
          align="left"
          themeColor={isAkatsuki ? "border-red-600" : isStarWars ? "border-yellow-500" : isRickAndMorty ? "border-blue-500" : isLoveTheme ? "border-sky-400" : "border-orange-500"}
          icon={Globe}
          tags={['KBU Thailand', 'Masters', 'Research']}
          imageSrc="https://images.unsplash.com/photo-1555217851-6141535bd771?q=80&w=800&auto=format&fit=crop"
        />

        {/* --- Section: Featured Projects (Hologram Update) --- */}
        <section className={`min-h-screen flex items-center justify-center relative z-10 px-4 py-20 ${isLoveTheme ? 'bg-white/10' : 'bg-black/20'}`}>
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-5xl font-retro mb-4 uppercase ${themeConfig.text} drop-shadow-[0_0_15px_currentColor]`}>
                Project Archive
              </h2>
              <div className={`w-24 h-1 mx-auto rounded-full ${isAkatsuki ? 'bg-red-600' : isStarWars ? 'bg-yellow-400' : isRickAndMorty ? 'bg-green-500' : isLoveTheme ? 'bg-pink-500' : 'bg-cyan-400'}`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <HologramProjectCard
                title="Inventory System"
                category="Web Application"
                description="A modern Inventory Management System built with Next.js, TypeScript, Prisma, and Neon. Features secure authentication, real-time tracking, and a sleek interface."
                imageSrc="/image.png"
                link="https://invoice-app-akp.vercel.app/"
                icon={Layout}
                themeClasses={themeConfig}
              />
              <HologramProjectCard
                title="Inet College"
                category="Educational Platform"
                description="The official learning platform for Inet College. Facilitating computer science education and student resources in Myanmar."
                imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                link="https://inet.edu.mm/"
                icon={School}
                themeClasses={themeConfig}
              />
            </div>

            <div className="mt-16 text-center">
              <a
                href="https://github.com/AKPAING3147?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className={`inline-block px-8 py-3 border-2 rounded-full font-retro text-sm uppercase tracking-widest transition-all hover:scale-105 ${themeConfig.border} ${themeConfig.text} ${themeConfig.shadow} hover:bg-white/10`}
              >
                View All Projects
              </a>
            </div>
          </div>
        </section>

        {/* --- Section: Tech Stack --- */}
        <section className="relative min-h-screen flex items-center justify-center p-4 z-10">
          {/* Background Grid specific to this section */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

          <div className="w-full max-w-6xl relative">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-7xl font-retro text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] mb-4 
                      ${isAkatsuki ? 'bg-gradient-to-r from-red-600 to-orange-500'
                  : isStarWars ? 'bg-gradient-to-r from-yellow-300 to-yellow-600'
                    : isRickAndMorty ? 'bg-gradient-to-r from-green-400 to-cyan-500'
                      : isLoveTheme ? 'bg-gradient-to-r from-pink-400 to-rose-600 drop-shadow-[0_0_15px_pink]'
                        : 'bg-gradient-to-r from-cyan-400 to-purple-500'}`}>
                TECH STACK
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((stack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-black/80 border-2 ${stack.borderColor} rounded-lg p-6 hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden ${isLoveTheme ? 'bg-white/80' : ''}`}
                >
                  {/* Glowing Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${stack.borderColor.replace('border-', 'from-')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className={`p-3 rounded border ${stack.borderColor} ${stack.shadow} ${isLoveTheme ? 'bg-white' : 'bg-black'}`}>
                      <stack.icon className={stack.color} size={24} />
                    </div>
                    <h3 className={`font-retro text-sm ${stack.color} leading-tight`}>{stack.category.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}</h3>
                  </div>

                  {/* List */}
                  <ul className="space-y-3 relative z-10">
                    {stack.items.map((item, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm font-mono transition-colors ${isLoveTheme ? 'text-gray-600 group-hover:text-black' : 'text-gray-300 group-hover:text-white'}`}>
                        <Zap size={14} className={`mt-1 flex-shrink-0 ${stack.color}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative scan line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-50 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Outro: Contact --- */}
        <section className="relative h-[80vh] flex flex-col items-center justify-end pb-32 overflow-hidden z-10">

          {/* Synthwave Sun / Star Wars Sun */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t opacity-20 blur-3xl rounded-full pointer-events-none 
              ${isAkatsuki ? 'from-red-600 to-transparent'
              : isStarWars ? 'from-blue-600 to-transparent'
                : isRickAndMorty ? 'from-green-500 to-transparent'
                  : isLoveTheme ? 'from-pink-400 to-transparent'
                    : 'from-cyan-500 to-transparent'}`}></div>

          <div className={`absolute bottom-32 w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-t flex items-end justify-center overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.5)] 
              ${isAkatsuki ? 'from-red-900 to-red-600 shadow-[0_0_50px_red]'
              : isStarWars ? 'from-blue-900 to-blue-500 shadow-[0_0_50px_blue] rounded-none rotate-45 border-4 border-blue-400'
                : isRickAndMorty ? 'from-green-900 to-green-500 shadow-[0_0_50px_lime] animate-pulse'
                  : isLoveTheme ? 'from-rose-400 to-pink-200 shadow-[0_0_50px_pink]'
                    : 'from-purple-600 to-cyan-400'}`}>
            {/* Sun Lines */}
            <div className="w-full h-full bg-[repeating-linear-gradient(black,black_4px,transparent_4px,transparent_14px)] opacity-40"></div>
          </div>

          {/* Grid Floor */}
          <div className="absolute bottom-0 w-full h-[40vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(168,85,247,0.3)_100%)] perspective-grid z-0"></div>
          <style>{`
              .perspective-grid {
                  background-image: 
                      linear-gradient(0deg, transparent 24%, rgba(168, 85, 247, .5) 25%, rgba(168, 85, 247, .5) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, .5) 75%, rgba(168, 85, 247, .5) 76%, transparent 77%, transparent),
                      linear-gradient(90deg, transparent 24%, rgba(168, 85, 247, .5) 25%, rgba(168, 85, 247, .5) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, .5) 75%, rgba(168, 85, 247, .5) 76%, transparent 77%, transparent);
                  background-size: 60px 60px;
                  transform: perspective(300px) rotateX(60deg);
                  transform-origin: bottom;
              }
          `}</style>

          <div className={`z-10 text-center space-y-6 relative bg-black/60 backdrop-blur-sm p-8 rounded-xl border-t max-w-lg mx-auto mb-10 
              ${isAkatsuki ? 'border-red-600'
              : isStarWars ? 'border-yellow-500'
                : isRickAndMorty ? 'border-green-500'
                  : isLoveTheme ? 'border-pink-400 bg-white/30 text-black'
                    : 'border-cyan-500/50'}`}>
            <Terminal className={`w-12 h-12 mx-auto animate-pulse ${isAkatsuki ? 'text-red-500' : isStarWars ? 'text-yellow-400' : isRickAndMorty ? 'text-green-400' : isLoveTheme ? 'text-pink-600' : 'text-cyan-400'}`} />
            <h2 className={`text-3xl font-hand ${isLoveTheme ? 'text-pink-900' : 'text-white'}`}>Let's Connect</h2>

            <div className={`py-2 px-4 bg-white/5 rounded border border-white/10 font-mono selection:text-black select-all 
                  ${isAkatsuki ? 'text-red-300 selection:bg-red-500'
                : isStarWars ? 'text-yellow-200 selection:bg-yellow-500'
                  : isRickAndMorty ? 'text-green-200 selection:bg-green-500'
                    : isLoveTheme ? 'text-pink-800 selection:bg-pink-300 bg-white/50 border-pink-300'
                      : 'text-cyan-200 selection:bg-cyan-500'}`}>
              aungp5979@gmail.com
            </div>

            <a href="mailto:aungp5979@gmail.com" className={`inline-block group relative px-8 py-3 bg-transparent border-2 text-sm uppercase tracking-widest rounded transition-all overflow-hidden 
                  ${isAkatsuki ? 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
                : isStarWars ? 'border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black'
                  : isRickAndMorty ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
                    : isLoveTheme ? 'border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white'
                      : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black'}`}>
              <span className="relative z-10">Send Email</span>
              <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left 
                      ${isAkatsuki ? 'bg-red-600'
                  : isStarWars ? 'bg-yellow-500'
                    : isRickAndMorty ? 'bg-green-500'
                      : isLoveTheme ? 'bg-pink-500'
                        : 'bg-cyan-500'}`}></div>
            </a>
          </div>
        </section>

      </motion.div>
    </>
  );
};

export default App;