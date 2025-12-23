"use client";

import React, { useState, useEffect } from 'react';
import { Shield, ImageIcon, Share2, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import SNSCard from '@/components/sns-card';
import ImageEditor from '@/components/image-editor';

export default function CreatorShieldHub() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState("bottom-right");
  const [aiScore, setAiScore] = useState<{ label: string; color: string; score: number }>({
    label: "未判定",
    color: "bg-slate-500",
    score: 0
  });

  // Xの特殊な文字数計算 (全角2/半角1)
  const calculateXWeight = (text: string) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      // 半角の範囲を大まかに判定
      if ((char >= 0x0 && char < 0x81) || char === 0xf8f0 || (char >= 0xff61 && char < 0xffa0) || (char >= 0xf8f1 && char < 0xf8f4)) {
        count += 1;
      } else {
        count += 2;
      }
    }
    return count;
  };

  // 画像アップロード時のAI判定シミュレーション
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      // ダミーの判定ロジック
      setTimeout(() => {
        setAiScore({ label: "人間による作成 (Low)", color: "bg-green-500", score: 12 });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Shield Hub</h1>
        </div>
        <div className="text-sm text-slate-400">v1.0.0 Stable</div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. 入力エリア (左カラム) */}
        <section className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="font-semibold flex items-center gap-2 text-indigo-400">
              <Share2 className="w-4 h-4" /> 投稿内容
            </h2>
            <textarea
              className="w-full h-40 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="何を伝えますか？"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">画像アップロード</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors">
                <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-xs text-slate-400">Click or Drag & Drop</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">ロゴ配置設定</label>
              <div className="grid grid-cols-3 gap-2">
                {['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setLogoPosition(pos)}
                    className={`text-[10px] py-2 rounded border ${logoPosition === pos ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-700'}`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. プレビュー・加工エリア (中央カラム) */}
        <section className="lg:col-span-5">
          <ImageEditor 
            image={image} 
            aiScore={aiScore} 
            logoPosition={logoPosition} 
          />
        </section>

        {/* 3. SNSステータスエリア (右カラム) */}
        <section className="lg:col-span-4 space-y-4">
          <SNSCard 
            platform="X (Twitter)" 
            current={calculateXWeight(content)} 
            max={280} 
            content={content}
            icon="twitter"
          />
          <SNSCard 
            platform="Threads" 
            current={content.length} 
            max={500} 
            content={content}
            icon="threads"
          />
          <SNSCard 
            platform="Bluesky" 
            current={content.length} 
            max={300} 
            content={content}
            icon="bluesky"
          />
          <SNSCard 
            platform="Misskey" 
            current={content.length} 
            max={3000} 
            content={content}
            icon="misskey"
          />
        </section>

      </main>
    </div>
  );
}
