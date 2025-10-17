const WORLD_NEWS_API_KEY = import.meta.env.VITE_WORLD_NEWS_API_KEY;
const BASE_URL = 'https://api.worldnewsapi.com';

// Debug: Log the API key (remove in production)
console.log('World News API Key loaded:', WORLD_NEWS_API_KEY ? '✅ Key found' : '❌ Key missing');

export class WorldNewsService {
  async fetchTopNews(country = 'in', limit = 2) {
    try {
      if (!WORLD_NEWS_API_KEY) {
        throw new Error('World News API key is missing. Please check your .env file.');
      }

      const url = `${BASE_URL}/search-news?api-key=${WORLD_NEWS_API_KEY}&source-countries=${country}&language=en&limit=${limit}`;

      console.log('Fetching news from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('News data received:', data.news?.length || 0, 'articles');
      return data.news || [];
    } catch (error) {
      console.error('Error fetching world news:', error);
      throw error;
    }
  }

  formatNewsData(newsItem) {
    return {
      id: newsItem.id,
      title: newsItem.title,
      summary: newsItem.summary || newsItem.description,
      url: newsItem.url,
      image: newsItem.image,
      source: newsItem.source_name,
      publishedAt: newsItem.publish_date,
      author: newsItem.author,
    };
  }
}

export const worldNewsService = new WorldNewsService();
