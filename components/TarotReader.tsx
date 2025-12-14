import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Repeat, Cpu, Eye, Zap, Moon, Sun, Anchor, Shield, Sword, Heart, Crown, Key } from 'lucide-react';
import { getTarotReading } from '../services/geminiService';

const MAJOR_ARCANA = [
  { name: "လူမိုက် (The Fool)", icon: Sparkles, desc: "အစပြုခြင်း" },
  { name: "မျက်လှည့်ဆရာ (The Magician)", icon: Zap, desc: "ဖန်တီးနိုင်စွမ်း" },
  { name: "ယဇ်ပုရောဟိတ်မ (The High Priestess)", icon: Moon, desc: "သိစိတ်" },
  { name: "ဧကရီ (The Empress)", icon: Heart, desc: "ဖန်တီးမှု" },
  { name: "ဧကရာဇ် (The Emperor)", icon: Crown, desc: "တည်ဆောက်ပုံ" },
  { name: "ဘုန်းတော်ကြီး (The Hierophant)", icon: Key, desc: "ရိုးရာ" },
  { name: "ချစ်သူများ (The Lovers)", icon: Heart, desc: "ပေါင်းစည်းခြင်း" },
  { name: "စစ်ရထား (The Chariot)", icon: Shield, desc: "ဇွဲလုံ့လ" },
  { name: "ခွန်အား (Strength)", icon: Anchor, desc: "သတ္တိ" },
  { name: "ရသေ့ (The Hermit)", icon: Eye, desc: "အတွင်းစိတ်" },
  { name: "ကံကြမ္မာ (Wheel of Fortune)", icon: Repeat, desc: "အပြောင်းအလဲ" },
  { name: "တရားမျှတမှု (Justice)", icon: Shield, desc: "အမှန်တရား" },
  { name: "ဇောက်ထိုးလူ (The Hanged Man)", icon: Anchor, desc: "စွန့်လွှတ်ခြင်း" },
  { name: "သေခြင်းတရား (Death)", icon: Moon, desc: "အဆုံးသတ်နှင့်အစ" },
  { name: "မျှတမှု (Temperance)", icon: Repeat, desc: "မျှတခြင်း" },
  { name: "မာရ်နတ် (The Devil)", icon: Zap, desc: "စွဲလမ်းမှု" },
  { name: "မျှော်စင် (The Tower)", icon: Zap, desc: "ပြိုလဲခြင်း" },
  { name: "ကြယ် (The Star)", icon: Sparkles, desc: "မျှော်လင့်ချက်" },
  { name: "လ (The Moon)", icon: Moon, desc: "စိတ်ကူးယဉ်" },
  { name: "နေ (The Sun)", icon: Sun, desc: "ပျော်ရွှင်မှု" },
  { name: "တရားစီရင်ခြင်း (Judgement)", icon: Crown, desc: "ဆုံးဖြတ်ချက်" },
  { name: "ကမ္ဘာလောက (The World)", icon: Eye, desc: "ပြီးပြည့်စုံခြင်း" }
];

interface CardData {
  id: number;
  name: string;
  icon: React.ElementType;
  desc: string;
}

export const TarotReader: React.FC = () => {
  const [deck, setDeck] = useState<CardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [reading, setReading] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    initializeDeck();
  }, []);

  const initializeDeck = () => {
    const newDeck = MAJOR_ARCANA.map((card, index) => ({
      ...card,
      id: index
    }));
    setDeck(newDeck);
    setSelectedCards([]);
    setReading("");
    setIsShuffled(false);
  };

  const shuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIsShuffled(true);
    setSelectedCards([]);
    setReading("");
  };

  const drawCard = (card: CardData) => {
    if (selectedCards.length >= 3 || selectedCards.find(c => c.id === card.id)) return;
    
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);
    
    // Remove from visual deck (optional, but keeps UI clean)
    setDeck(deck.filter(c => c.id !== card.id));

    if (newSelected.length === 3) {
      getReading(newSelected);
    }
  };

  const getReading = async (cards: CardData[]) => {
    setLoading(true);
    const cardNames = cards.map(c => c.name);
    const result = await getTarotReading(cardNames);
    setReading(result);
    setLoading(false);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-black/40 backdrop-blur-sm border-y border-purple-900/50">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-purple-500 bg-purple-900/20 rounded-full mb-4">
             <Sparkles size={14} className="text-purple-400" />
             <p className="font-mono text-purple-400 text-xs tracking-widest uppercase">Cyber Bay Din</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-retro text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] mb-4">
             Cyber ဗေဒင်
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-md mx-auto">
            {!isShuffled 
              ? "ကဒ်များကို မွှေရန် အောက်ပါခလုတ်ကို နှိပ်ပါ။" 
              : selectedCards.length < 3 
                ? `နောက်ထပ် ကဒ် ${3 - selectedCards.length} ခု ရွေးပါ...` 
                : "ကံကြမ္မာကို တွက်ချက်နေသည်..."}
          </p>
        </div>

        {/* Selected Cards Area */}
        <div className="h-64 w-full max-w-4xl mb-12 flex justify-center items-center gap-4 md:gap-8 perspective-[1000px]">
          <AnimatePresence mode='popLayout'>
            {selectedCards.map((card, index) => (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ rotateY: 180, scale: 0.5, opacity: 0 }}
                animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative w-28 h-48 md:w-40 md:h-64 bg-gray-900 border-2 border-purple-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] flex flex-col items-center justify-between p-4 group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-purple-500/10 animate-pulse rounded-lg"></div>
                
                <div className="text-xs font-mono text-purple-300 uppercase opacity-50">
                  {index === 0 ? 'အတိတ်' : index === 1 ? 'ပစ္စုပ္ပန်' : 'အနာဂတ်'}
                </div>
                
                <div className="flex flex-col items-center text-center gap-2">
                  <card.icon size={32} className="text-pink-400 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-hand text-base md:text-lg text-white leading-tight">{card.name}</h3>
                </div>

                <div className="text-[10px] font-retro text-purple-400 text-center border-t border-purple-800 pt-2 w-full">
                  {card.desc}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Placeholder slots if empty */}
          {selectedCards.length === 0 && (
             <div className="absolute font-retro text-white/10 text-xl md:text-3xl uppercase tracking-widest pointer-events-none text-center">
                Awaiting Input
             </div>
          )}
        </div>

        {/* Reading Output */}
        <AnimatePresence>
          {(loading || reading) && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="w-full max-w-2xl bg-black/80 border border-purple-500/50 p-6 rounded-lg backdrop-blur-md mb-10 relative overflow-hidden"
             >
                {/* Scanning line animation */}
                {loading && (
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                )}
                
                <div className="flex items-start gap-4">
                   <div className="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                      <Sparkles className={`text-purple-400 ${loading ? 'animate-spin' : ''}`} size={24} />
                   </div>
                   <div className="space-y-2 w-full">
                      <h4 className="font-retro text-sm text-purple-300 uppercase">ဟောစာတမ်း</h4>
                      {loading ? (
                        <p className="font-mono text-gray-400 text-sm animate-pulse">
                           Reading the stars... Interpreting destiny...
                        </p>
                      ) : (
                        <p className="font-mono text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                           {reading}
                        </p>
                      )}
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Deck Area */}
        {!reading && (
          <div className="relative w-full max-w-md h-32 flex justify-center items-center">
            {!isShuffled ? (
               <button 
                 onClick={shuffleDeck}
                 className="group relative px-8 py-3 bg-purple-900/20 hover:bg-purple-900/40 border-2 border-purple-500 text-purple-300 font-retro uppercase rounded transition-all active:scale-95"
               >
                 <span className="flex items-center gap-2">
                   <Repeat className="group-hover:rotate-180 transition-transform duration-500" />
                   ကဒ်မွှေမယ်
                 </span>
                 <div className="absolute inset-0 bg-purple-500/20 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </button>
            ) : (
              <div className="flex flex-wrap justify-center gap-1 w-full perspective-[800px]">
                {/* Render the deck spread out slightly */}
                {deck.slice(0, 22).map((card, i) => (
                   <motion.div
                     key={card.id}
                     layoutId={`card-${card.id}`}
                     onClick={() => drawCard(card)}
                     initial={{ rotateY: 0 }}
                     whileHover={{ y: -20, zIndex: 10, scale: 1.1 }}
                     className="w-12 h-20 md:w-16 md:h-24 bg-purple-900 rounded border border-purple-400 cursor-pointer shadow-lg relative -ml-6 first:ml-0 hover:border-white transition-colors"
                     style={{ 
                        transformStyle: 'preserve-3d',
                        zIndex: i 
                     }}
                   >
                     {/* Card Back Pattern */}
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.3)_25%,rgba(0,0,0,0.3)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.3)_75%,rgba(0,0,0,0.3)_100%)] bg-[size:10px_10px] opacity-50"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-purple-400/50 flex items-center justify-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        </div>
                     </div>
                   </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reset Button (Only shows after reading) */}
        {reading && (
          <button 
            onClick={initializeDeck}
            className="mt-8 px-6 py-2 border border-white/20 hover:border-purple-500 text-gray-400 hover:text-purple-400 font-mono text-xs uppercase tracking-widest rounded transition-colors"
          >
            ပြန်စမယ်
          </button>
        )}

      </div>
    </section>
  );
};