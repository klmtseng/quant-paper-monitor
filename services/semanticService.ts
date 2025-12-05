import { Paper } from '../types';

interface S2Author {
  authorId: string;
  name: string;
}

interface S2Paper {
  paperId: string;
  title: string;
  abstract: string | null;
  publicationDate: string | null;
  url: string | null;
  authors: S2Author[];
}

export const fetchSemanticPapers = async (): Promise<Paper[]> => {
  const query = 'quantitative finance';
  const fields = 'title,abstract,publicationDate,url,authors';
  const limit = 10;
  
  const s2Url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=${fields}`;
  
  // Use CORS proxy to avoid browser blocking
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(s2Url)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      // Semantic Scholar might return 403/429 without an API key sometimes, 
      // but usually works for low volume via proxy.
      console.warn("Semantic Scholar fetch failed:", response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((item: S2Paper) => {
      // S2 dates can be YYYY-MM-DD or null. If null, use current date or generic fallback
      const published = item.publicationDate || new Date().toISOString().split('T')[0];
      
      return {
        id: item.paperId,
        title: item.title,
        summary: item.abstract || 'No abstract available via Semantic Scholar.',
        published: published,
        link: item.url || `https://www.semanticscholar.org/paper/${item.paperId}`,
        authors: item.authors.map(a => a.name),
        source: 'Semantic Scholar',
      };
    });

  } catch (error) {
    console.error("Error fetching from Semantic Scholar:", error);
    // Return empty array instead of throwing, so arXiv data still loads
    return [];
  }
};