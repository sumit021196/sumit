// TypeScript-style interfaces for better type safety (works with JSDoc)
/**
 * @typedef {Object} StockData
 * @property {string} id - Unique identifier for the stock
 * @property {string} symbol - Stock symbol (e.g., 'RELIANCE', 'TCS')
 * @property {string} name - Company name
 * @property {number} price - Current/last traded price
 * @property {number} change - Price change percentage
 * @property {number} volume - Trading volume
 * @property {string} exchange - Stock exchange name
 * @property {string} lastUpdated - ISO timestamp of last update
 */

/**
 * Interface for stock data services
 * Follows Interface Segregation Principle
 */
export class StockService {
  /**
   * Fetch stock data with pagination support
   * @param {number} offset - Starting index for pagination
   * @param {number} limit - Number of items to fetch (default: 50)
   * @returns {Promise<StockData[]>} Array of stock data
   */
  async fetchStocks(offset = 0, limit = 50) {
    throw new Error('fetchStocks method must be implemented by subclass');
  }

  /**
   * Format raw API response to standardized StockData format
   * @param {any} rawData - Raw data from API
   * @returns {StockData} Formatted stock data
   */
  formatStockData(rawData) {
    throw new Error('formatStockData method must be implemented by subclass');
  }

  /**
   * Get real-time stock data for specific symbols
   * @param {string[]} symbols - Array of stock symbols
   * @returns {Promise<StockData[]>} Real-time stock data
   */
  async getRealTimeData(symbols) {
    throw new Error('getRealTimeData method must be implemented by subclass');
  }
}
