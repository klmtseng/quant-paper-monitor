
import React, { useEffect, useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { PaperCard } from './components/PaperCard';
import { fetchArxivPapers } from './services/arxivService';
import { fetchSemanticPapers } from './services/semanticService';
import { fetchHedgeFundPapers } from './services/hedgeFundService';
import { Paper, Language } from './types';
import { Loader2, AlertCircle, RefreshCw, Search } from 'lucide-react';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('zh');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = translations[lang];

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Run fetches in parallel using Promise.allSettled
      const [arxivResult, semanticResult, hedgeFundResult] = await Promise.allSettled([
        fetchArxivPapers(),
        fetchSemanticPapers(),
        fetchHedgeFundPapers()
      ]);

      let combinedPapers: Paper[] = [];

      // Helper to process results
      const processResult = (result: PromiseSettledResult<Paper[]>, sourceName: string) => {
        if (result.status === 'fulfilled') {
          combinedPapers = [...combinedPapers, ...result.value];
        } else {
          console.error(`${sourceName} failed:`, result.reason);
        }
      };

      processResult(arxivResult, "ArXiv");
      processResult(semanticResult, "Semantic Scholar");
      processResult(hedgeFundResult, "Hedge Fund Data");

      if (combinedPapers.length === 0) {
        throw new Error("Unable to connect to any data sources.");
      }

      // Sort by date descending
      combinedPapers.sort((a, b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });

      setPapers(combinedPapers);
    } catch (err) {
      setError(lang === 'zh' ? "讀取資料時發生錯誤，請稍後再試。" : "Error fetching data, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter papers based on search query
  const filteredPapers = useMemo(() => {
    if (!searchQuery.trim()) return papers;
    const lowerQuery = searchQuery.toLowerCase();
    return papers.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.summary.toLowerCase().includes(lowerQuery)
    );
  }, [papers, searchQuery]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar lang={lang} setLang={setLang} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.latestResearch}</h2>
              <p className="text-slate-400 text-sm">
                {t.latestResearchDesc}
              </p>
            </div>
            
            <button 
              onClick={loadData}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {t.refresh}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-750 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 sm:text-sm transition-all shadow-sm"
            />
          </div>
        </header>

        {/* Content Area */}
        <div className="space-y-4">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-slate-500">
               <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
               <p>{t.loading}</p>
             </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-red-200 mb-2">{t.errorTitle}</h3>
              <p className="text-red-300/70 text-sm mb-4">{error}</p>
              <button 
                onClick={loadData}
                className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 rounded-lg text-sm transition-colors"
              >
                {t.retry}
              </button>
            </div>
          ) : filteredPapers.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p>{t.noResults}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPapers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} lang={lang} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer for main content */}
        {!loading && !error && filteredPapers.length > 0 && (
          <div className="mt-8 text-center text-slate-500 text-xs">
             {t.footerInfo.replace('{count}', filteredPapers.length.toString())}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
