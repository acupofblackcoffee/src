"use client";

import { ExternalLink, Copy } from 'lucide-react';

interface SNSCardProps {
  platform: string;
  current: number;
  max: number;
  content: string;
  icon: string;
}

export default function SNSCard({ platform, current, max, content }: SNSCardProps) {
  const isOver = current > max;
  const progress = Math.min((current / max) * 100, 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert(`${platform}用のテキストをコピーしました`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          {platform}
        </h3>
        <span className={`text-xs font-mono ${isOver ? 'text-red-500' : 'text-slate-400'}`}>
          {current} / {max}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${isOver ? 'bg-red-500' : 'bg-indigo-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <button 
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium transition-colors"
      >
        <Copy className="w-3 h-3" />
        コピーして開く
        <ExternalLink className="w-3 h-3 opacity-50" />
      </button>
    </div>
  );
}
