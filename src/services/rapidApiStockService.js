import { StockService } from './stockService.js';

/**
 * RapidAPI implementation for Indian Stock Market data
 * Follows Single Responsibility and Dependency Inversion principles
 */
export class RapidAPIStockService extends StockService {
  constructor() {
    super();
    this.API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
    this.API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
    this.BASE_URL = `https://${this.API_HOST}`;
    this.cache = new Map();
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Fetch top stocks from NSE/BSE
   * @param {number} offset - Starting index for pagination
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<StockData[]>}
   */
  async fetchStocks(offset = 0, limit = 50) {
    try {
      if (!this.API_KEY) {
        throw new Error('RapidAPI key is missing. Please check your .env file.');
      }

      const cacheKey = `stocks-${offset}-${limit}`;
      const cached = this.getCachedData(cacheKey);

      if (cached) {
        console.log('📈 Returning cached stock data');
        return cached;
      }

      // For demo purposes, using mock data since we don't have actual API access
      // In real implementation, this would call the RapidAPI endpoint
      const mockData = await this.fetchMockStockData(offset, limit);

      this.setCachedData(cacheKey, mockData);
      return mockData;

    } catch (error) {
      console.error('❌ Error fetching stock data:', error);
      throw error;
    }
  }

  /**
   * Mock stock data for development (replace with actual API call)
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<StockData[]>}
   */
  async fetchMockStockData(offset, limit) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockStocks = [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.75, change: 2.34 },
      { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', price: 3456.80, change: -1.23 },
      { symbol: 'HDFC', name: 'HDFC Bank Ltd', price: 1678.45, change: 0.87 },
      { symbol: 'INFY', name: 'Infosys Ltd', price: 1456.90, change: 3.21 },
      { symbol: 'ICICI', name: 'ICICI Bank Ltd', price: 987.65, change: -0.45 },
      { symbol: 'KOTAK', name: 'Kotak Mahindra Bank Ltd', price: 1890.30, change: 1.67 },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', price: 2345.67, change: 2.89 },
      { symbol: 'AXIS', name: 'Axis Bank Ltd', price: 876.54, change: -1.12 },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', price: 7890.12, change: 4.56 },
      { symbol: 'BAJAJF', name: 'Bajaj Finance Ltd', price: 6789.45, change: 0.78 },
    ];

    const startIndex = Math.min(offset, mockStocks.length);
    const endIndex = Math.min(startIndex + limit, mockStocks.length);

    return mockStocks.slice(startIndex, endIndex).map((stock, index) => ({
      id: `stock-${stock.symbol}-${Date.now()}-${index}`,
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      exchange: 'NSE',
      lastUpdated: new Date().toISOString(),
    }));
  }

  /**
   * Format raw API response to standardized format
   * @param {any} rawData
   * @returns {StockData}
   */
  formatStockData(rawData) {
    return {
      id: rawData.symbol || rawData.id,
      symbol: rawData.symbol,
      name: rawData.name || rawData.companyName,
      price: parseFloat(rawData.price || rawData.lastPrice || 0),
      change: parseFloat(rawData.change || rawData.changePercent || 0),
      volume: parseInt(rawData.volume || 0),
      exchange: rawData.exchange || 'NSE',
      lastUpdated: rawData.lastUpdated || new Date().toISOString(),
    };
  }

  /**
   * Get real-time data for specific symbols
   * @param {string[]} symbols
   * @returns {Promise<StockData[]>}
   */
  async getRealTimeData(symbols) {
    // Implementation for real-time data fetching
    // This would typically use WebSocket or polling
    return this.fetchStocks(0, symbols.length);
  }

  /**
   * Cache management - get cached data if not expired
   * @param {string} key
   * @returns {StockData[]|null}
   */
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  /**
   * Cache management - store data with timestamp
   * @param {string} key
   * @param {StockData[]} data
   */
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance for use across the app
export const rapidAPIStockService = new RapidAPIStockService();
