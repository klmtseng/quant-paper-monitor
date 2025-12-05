
import React from 'react';
import { User, Mail, TrendingUp, BookOpen, Activity, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SidebarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  const handleSubscribe = () => {
    alert(t.subscribeSuccess);
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <aside className="w-full md:w-80 bg-slate-800 border-r border-slate-700 flex flex-col h-full sticky top-0 md:h-screen shrink-0 transition-all">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
              {t.appTitle} <span className="text-emerald-400">Monitor</span>
            </h1>
          </div>
          
          <button 
            onClick={toggleLang}
            className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span className="sr-only">Switch Language</span>
          </button>
        </div>
        <p className="text-slate-400 text-sm">{t.appSubtitle}</p>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{t.aboutAuthor}</h2>
        
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <User className="text-slate-300 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-medium">Aaron Tseng</h3>
              <p className="text-xs text-emerald-400">{t.role}</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {t.bio}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" /> {t.labels.momentum}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <BookOpen className="w-3 h-3 mr-1 text-blue-400" /> {t.labels.microstructure}
            </span>
          </div>
        </div>

        <button 
          onClick={handleSubscribe}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-emerald-900/20"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          {t.subscribe}
        </button>

        <div className="mt-8">
           <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{t.dataSourceTitle}</h2>
           <p className="text-xs text-slate-400">
             {t.dataSourceDesc}
           </p>
        </div>
      </div>
    </aside>
  );
};
