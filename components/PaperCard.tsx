
import React, { useState } from 'react';
import { Paper, Language } from '../types';
import { ChevronDown, ExternalLink, Calendar, Users } from 'lucide-react';
import { translations } from '../utils/translations';

interface PaperCardProps {
  paper: Paper;
  lang: Language;
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations[lang];

  // Format date based on language
  let formattedDate = paper.published;
  try {
    const locale = lang === 'zh' ? 'zh-TW' : 'en-US';
     formattedDate = new Date(paper.published).toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (e) {
    // fallback
  }

  // Determine badge style
  let badgeStyle = '';
  let badgeText = paper.source;

  switch (paper.source) {
    case 'arXiv':
      badgeStyle = 'bg-red-900/30 text-red-400 border-red-900/50';
      break;
    case 'Semantic Scholar':
      badgeStyle = 'bg-blue-900/30 text-blue-400 border-blue-900/50';
      break;
    case 'Hedge Fund Notes':
      badgeStyle = 'bg-purple-900/30 text-purple-400 border-purple-900/50';
      break;
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors duration-200">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none focus:bg-slate-700/50"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${badgeStyle}`}>
               {badgeText}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-100 leading-snug">
            {paper.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <Users className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-md">
              {paper.authors.join(', ')}
            </span>
          </div>
        </div>
        <div className={`text-slate-500 transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Expandable Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 border-t border-slate-700/50 bg-slate-800/50">
          <div className="mt-4">
             <h4 className="text-sm font-semibold text-slate-300 mb-2">{t.summary}</h4>
             <p className="text-slate-400 text-sm leading-relaxed text-justify">
               {paper.summary}
             </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <a 
              href={paper.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors border border-slate-600"
            >
              {t.readFull} ({paper.source === 'arXiv' ? 'arXiv' : 'Web'})
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
