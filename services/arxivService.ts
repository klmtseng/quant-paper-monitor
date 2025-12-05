import { Paper } from '../types';

export const fetchArxivPapers = async (): Promise<Paper[]> => {
  // Query for Quantitative Finance papers
  const query = 'cat:q-fin.*';
  const arxivUrl = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&start=0&max_results=20&sortBy=submittedDate&sortOrder=descending`;
  
  // Use a CORS proxy because arXiv.org does not support CORS headers for direct browser fetch
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(arxivUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    const entries = Array.from(xmlDoc.getElementsByTagName('entry'));

    return entries.map((entry) => {
      // Clean up title and summary (remove newlines and excessive spaces)
      const title = entry.getElementsByTagName('title')[0]?.textContent?.replace(/\s+/g, ' ').trim() || 'Untitled';
      const summary = entry.getElementsByTagName('summary')[0]?.textContent?.replace(/\s+/g, ' ').trim() || 'No summary available.';
      const published = entry.getElementsByTagName('published')[0]?.textContent || new Date().toISOString();
      const id = entry.getElementsByTagName('id')[0]?.textContent || '';
      
      const authors = Array.from(entry.getElementsByTagName('author')).map(
        (author) => author.getElementsByTagName('name')[0]?.textContent || 'Unknown Author'
      );

      return {
        id,
        title,
        summary,
        published,
        link: id, // The ID in arXiv Atom feed is the abstract URL
        authors,
        source: 'arXiv',
      };
    });
  } catch (error) {
    console.error("Error fetching from arXiv:", error);
    throw error;
  }
};