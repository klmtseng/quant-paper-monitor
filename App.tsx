import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PaperCard } from './components/PaperCard';
import { fetchArxivPapers } from './services/arxivService';
import { fetchSemanticPapers } from './services/semanticService';
import { Paper } from './types';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Run fetches in parallel using Promise.allSettled to ensure one failure doesn't stop the other
      const [arxivResult, semanticResult] = await Promise.allSettled([
        fetchArxivPapers(),
        fetchSemanticPapers()
      ]);

      let combinedPapers: Paper[] = [];

      if (arxivResult.status === 'fulfilled') {
        combinedPapers = [...combinedPapers, ...arxivResult.value];
      } else {
        console.error("ArXiv failed:", arxivResult.reason);
      }

      if (semanticResult.status === 'fulfilled') {
        combinedPapers = [...combinedPapers, ...semanticResult.value];
      } else {
        console.error("Semantic Scholar failed:", semanticResult.reason);
      }

      if (combinedPapers.length === 0 && (arxivResult.status === 'rejected' || semanticResult.status === 'rejected')) {
        throw new Error("無法連線至資料來源。");
      }

      // Sort by date descending
      combinedPapers.sort((a, b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });

      setPapers(combinedPapers);
    } catch (err) {
      setError("讀取資料時發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900">
      {/* Sidebar - Mobile Responsive: at top on mobile, side on desktop */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">最新研究論文</h2>
            <p className="text-slate-400 text-sm">
              即時追蹤 Quantitative Finance (q-fin) 分類下的最新發表
            </p>
          </div>
          
          <button 
            onClick={loadData}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            重新整理
          </button>
        </header>

        {/* Content Area */}
        <div className="space-y-4">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-slate-500">
               <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
               <p>正在整合多方研究來源...</p>
             </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-red-200 mb-2">資料讀取失敗</h3>
              <p className="text-red-300/70 text-sm mb-4">{error}</p>
              <button 
                onClick={loadData}
                className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 rounded-lg text-sm transition-colors"
              >
                重試連線
              </button>
            </div>
          ) : papers.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p>目前沒有找到相關文章。</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer for main content */}
        {!loading && !error && papers.length > 0 && (
          <div className="mt-8 text-center text-slate-500 text-xs">
             整合資料來源：arXiv, Semantic Scholar
             <br/>
             已顯示前 {papers.length} 筆結果。
          </div>
        )}
      </main>
    </div>
  );
};

export default App;