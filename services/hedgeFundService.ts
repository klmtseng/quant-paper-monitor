
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

export const fetchHedgeFundPapers = async (): Promise<Paper[]> => {
  // Specific query to target industry/hedge fund relevant papers
  // We look for terms often used in industry whitepapers or practical alpha research
  const query = 'hedge fund alpha strategy trading performance';
  const fields = 'title,abstract,publicationDate,url,authors';
  const limit = 8;
  
  const s2Url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=${fields}`;
  
  // Use CORS proxy
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(s2Url)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      console.warn("Hedge Fund source fetch failed:", response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((item: S2Paper) => {
      const published = item.publicationDate || new Date().toISOString().split('T')[0];
      
      return {
        id: item.paperId,
        title: item.title,
        summary: item.abstract || 'Industry insight abstract not available.',
        published: published,
        link: item.url || `https://www.semanticscholar.org/paper/${item.paperId}`,
        authors: item.authors.map(a => a.name),
        source: 'Hedge Fund Notes',
      };
    });

  } catch (error) {
    console.error("Error fetching from Hedge Fund Source:", error);
    return [];
  }
};
