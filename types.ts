
export interface Paper {
  id: string;
  title: string;
  summary: string;
  published: string; // ISO date string
  link: string;
  authors: string[];
  source: 'arXiv' | 'Semantic Scholar' | 'Hedge Fund Notes';
}

export interface FetchError {
  message: string;
  type: 'network' | 'parse' | 'unknown';
}

export type Language = 'zh' | 'en';
