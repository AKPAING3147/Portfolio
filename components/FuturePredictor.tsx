import React, { useState } from 'react';
import { generateFuturePrediction } from '../services/geminiService';
import { FluxInput } from './FluxInput';
import { Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const FuturePredictor: React.FC = () => {
  const [year, setYear] = useState('2025');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!year) return;
    setLoading(true);
    const result = await generateFuturePrediction(year);
    setPrediction(result);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border-4 border-slate-600 rounded-xl p-8 max-w-2xl w-full mx-auto shadow-2xl relative overflow-hidden group">
      {/* Decorative wires */}
      <div className="absolute top-0 left-10 w-2 h-full bg-yellow-500/20" />
      <div className="absolute top-0 right-10 w-2 h-full bg-red-500/20" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-retro text-yellow-400 text-center uppercase tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
          Future Predictor
        </h2>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-black p-4 rounded-lg border border-gray-700">
           {/* Simulate Time Circuits */}
           <div className="md:col-span-2">
              <FluxInput 
                label="Destination Year" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                color="red"
                type="number"
              />
           </div>
           <button
            onClick={handlePredict}
            disabled={loading}
            className="flex flex-col items-center justify-center bg-gray-800 border-2 border-gray-600 hover:border-cyan-400 hover:bg-gray-700 hover:text-cyan-400 text-gray-300 font-bold rounded p-2 transition-all active:scale-95 disabled:opacity-50"
           >
              <Zap className={`w-8 h-8 mb-2 ${loading ? 'animate-pulse text-yellow-400' : ''}`} />
              <span className="text-xs font-retro">{loading ? '88 MPH...' : 'ENGAGE'}</span>
           </button>
        </div>

        {prediction && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/50 border-2 border-cyan-500 p-6 rounded-lg w-full relative"
          >
             <div className="absolute -top-3 -left-3 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rotate-[-5deg]">
               FROM DOC
             </div>
             <p className="font-hand text-xl md:text-2xl text-cyan-100 leading-relaxed text-center">
               "{prediction}"
             </p>
             <div className="mt-4 flex justify-end">
                <Clock className="w-5 h-5 text-cyan-500 animate-spin-slow" />
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
