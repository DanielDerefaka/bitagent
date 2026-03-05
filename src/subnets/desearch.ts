import axios from 'axios';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

export async function desearchWeb(query: string): Promise<SearchResult[]> {
  const apiUrl = process.env.DESEARCH_API_URL || 'https://desearch.ai/api';
  
  try {
    const response = await axios.post(`${apiUrl}/search`, {
      query,
      type: 'web'
    });
    
    return response.data.results || [];
  } catch (error) {
    console.error('DESEARCH API Error:', error);
    throw error;
  }
}

export async function desearchTwitter(query: string): Promise<SearchResult[]> {
  const apiUrl = process.env.DESEARCH_API_URL || 'https://desearch.ai/api';
  
  try {
    const response = await axios.post(`${apiUrl}/search`, {
      query,
      type: 'twitter'
    });
    
    return response.data.results || [];
  } catch (error) {
    console.error('DESEARCH Twitter API Error:', error);
    throw error;
  }
}
