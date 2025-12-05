import React from 'react';
import { User, Mail, TrendingUp, BookOpen, Activity } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const handleSubscribe = () => {
    alert("感謝您的訂閱！最新量化策略將發送至您的信箱。");
  };

  return (
    <aside className="w-full md:w-80 bg-slate-800 border-r border-slate-700 flex flex-col h-full sticky top-0 md:h-screen shrink-0">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Quant Alpha <span className="text-emerald-400">Monitor</span>
          </h1>
        </div>
        <p className="text-slate-400 text-sm">量化策略實驗室</p>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">關於作者</h2>
        
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
              <User className="text-slate-300 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-medium">Aaron Tseng</h3>
              <p className="text-xs text-emerald-400">Senior Quant Researcher</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            專注於計量經濟學、動能策略 (Momentum Strategy) 開發與市場微結構分析。致力於將學術理論轉化為可執行的 Alpha。
          </p>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" /> Momentum
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <BookOpen className="w-3 h-3 mr-1 text-blue-400" /> Microstructure
            </span>
          </div>
        </div>

        <button 
          onClick={handleSubscribe}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-emerald-900/20"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          聯絡 / 訂閱
        </button>

        <div className="mt-8">
           <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">資料來源</h2>
           <p className="text-xs text-slate-400">
             Data provided by <a href="https://arxiv.org/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">arXiv.org</a> via API.
             <br/>Category: Quantitative Finance (q-fin).
           </p>
        </div>
      </div>
    </aside>
  );
};