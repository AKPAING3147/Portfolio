import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack, Play, Pause, ListMusic, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundAudioProps {
  onSongChange: (index: number) => void;
}

const PLAYLIST = [
  {
    title: "Akatsuki Theme",
    // High energy track for the "Action" feel
    src: "/Naruto Shippuden - Girei (Pain's Theme Song).mp3"
  },
  {
    title: "Star Wars Theme",
    src: "/Star Wars Main Theme (Full) (1).mp3"
  },
  {
    title: "Rick & Morty Theme",
    src: "/Rick & Morty  Main ThemeEvil Morty Theme (Cinematic Version) [Ryan Elder & Blonde Redhead].mp3"
  },
  {
    title: "Love Theme",
    src: "/Ladyfingers.mp3"
  }
];

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ onSongChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(1); // Start with song 1
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Notify parent of initial song (or when it changes)
  useEffect(() => {
    onSongChange(currentSongIndex);
  }, [currentSongIndex, onSongChange]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.3;
        // We don't auto-play here to let user choose, but we unlock the audio context
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % PLAYLIST.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
  };

  const prevSong = () => {
    const newIndex = (currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    // Optionally close menu on select? keeping it open for now
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        loop
        src={PLAYLIST[currentSongIndex].src}
        onEnded={nextSong}
      />

      {/* Playlist Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-lg p-4 mb-2 w-64 shadow-[0_0_30px_rgba(34,211,238,0.2)] origin-bottom-right"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <h3 className="text-cyan-400 font-retro text-xs flex items-center gap-2">
                <Music size={12} /> THEME SELECTION
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">
                {PLAYLIST.length} THEMES
              </span>
            </div>
            <ul className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
              {PLAYLIST.map((song, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => selectSong(idx)}
                    className={`
                                    w-full text-left text-xs font-mono p-2 rounded transition-all flex items-center gap-2 relative overflow-hidden group
                                    ${currentSongIndex === idx
                        ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                        : 'hover:bg-white/5 text-gray-400 hover:text-white'
                      }
                                `}
                  >
                    {currentSongIndex === idx && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400"></span>
                    )}
                    <span className="flex-shrink-0 w-4 text-center text-[10px] opacity-50">
                      {idx + 1}
                    </span>
                    <span className="truncate">{song.title}</span>
                    {currentSongIndex === idx && isPlaying && (
                      <span className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_cyan]"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player Controls Bar */}
      <div className={`
        flex items-center gap-2 p-2 rounded-full 
        backdrop-blur-md border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]
        bg-black/80 transition-all duration-300 z-50
      `}>

        {/* Toggle Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`
                p-2 rounded-full transition-colors 
                ${showMenu ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}
            `}
        >
          <ListMusic size={18} />
        </button>

        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        <button onClick={prevSong} className="text-gray-400 hover:text-cyan-400 p-1">
          <SkipBack size={16} />
        </button>

        <button
          onClick={togglePlay}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full 
            transition-colors shadow-lg
            ${isPlaying ? 'bg-cyan-600 text-white shadow-cyan-500/20' : 'bg-gray-800 text-gray-400'}
            `}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <button onClick={nextSong} className="text-gray-400 hover:text-cyan-400 p-1">
          <SkipForward size={16} />
        </button>

        {/* Simple Track info (only if menu is closed to save space, or just keep it minimal) */}
        {!showMenu && (
          <div className="hidden md:block overflow-hidden w-0 hover:w-32 transition-all duration-500 whitespace-nowrap border-l border-white/10 ml-1 pl-2">
            <span className="text-[10px] font-retro text-cyan-400">
              {PLAYLIST[currentSongIndex].title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};