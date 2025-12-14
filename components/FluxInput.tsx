import React from 'react';

interface FluxInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: 'red' | 'green' | 'yellow';
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export const FluxInput: React.FC<FluxInputProps> = ({ 
  label, value, onChange, color, placeholder, type = "text", disabled 
}) => {
  const colorClasses = {
    red: "text-red-500 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    green: "text-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    yellow: "text-yellow-500 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
  };

  const bgClasses = {
    red: "bg-red-900/20",
    green: "bg-green-900/20",
    yellow: "bg-yellow-900/20"
  };

  return (
    <div className="flex flex-col gap-2 font-retro uppercase w-full">
      <label className={`text-xs ${color === 'red' ? 'text-red-400' : color === 'green' ? 'text-green-400' : 'text-yellow-400'}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full bg-black border-2 rounded p-4 text-xl md:text-2xl text-center tracking-widest outline-none transition-all
          ${colorClasses[color]}
          focus:${bgClasses[color]} focus:scale-105
          disabled:opacity-50
        `}
      />
    </div>
  );
};
