export interface Paper {
  id: string;
  title: string;
  summary: string;
  published: string; // ISO date string
  link: string;
  authors: string[];
  source: 'arXiv' | 'Semantic Scholar';
}

export interface FetchError {
  message: string;
  type: 'network' | 'parse' | 'unknown';
}