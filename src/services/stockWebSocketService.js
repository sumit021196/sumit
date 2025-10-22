/**
 * WebSocket Service for Real-Time Stock Market Data
 * Simulates real-time price updates with realistic fluctuations
 * Can be easily replaced with real WebSocket API (e.g., Alpha Vantage, Finnhub, NSE)
 */

export class StockWebSocketService {
  constructor() {
    this.subscribers = new Set();
    this.isConnected = false;
    this.updateInterval = null;
    this.stocks = this.getInitialStocks();
    this.UPDATE_FREQUENCY = 3000; // Update every 3 seconds
  }

  /**
   * Initial stock data with real Indian stock symbols
   */
  getInitialStocks() {
    return [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.75, basePrice: 2456.75 },
      { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', price: 3456.80, basePrice: 3456.80 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1678.45, basePrice: 1678.45 },
      { symbol: 'INFY', name: 'Infosys Ltd', price: 1456.90, basePrice: 1456.90 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 987.65, basePrice: 987.65 },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', price: 1890.30, basePrice: 1890.30 },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', price: 2345.67, basePrice: 2345.67 },
      { symbol: 'AXISBANK', name: 'Axis Bank Ltd', price: 876.54, basePrice: 876.54 },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', price: 7890.12, basePrice: 7890.12 },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 6789.45, basePrice: 6789.45 },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1234.56, basePrice: 1234.56 },
      { symbol: 'WIPRO', name: 'Wipro Ltd', price: 456.78, basePrice: 456.78 },
      { symbol: 'SBIN', name: 'State Bank of India', price: 623.45, basePrice: 623.45 },
      { symbol: 'ITC', name: 'ITC Ltd', price: 456.23, basePrice: 456.23 },
      { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 789.34, basePrice: 789.34 },
      { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Ind Ltd', price: 1123.45, basePrice: 1123.45 },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2567.89, basePrice: 2567.89 },
      { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 3456.78, basePrice: 3456.78 },
      { symbol: 'NTPC', name: 'NTPC Ltd', price: 234.56, basePrice: 234.56 },
      { symbol: 'POWERGRID', name: 'Power Grid Corporation', price: 267.89, basePrice: 267.89 },
    ];
  }

  /**
   * Connect to WebSocket (simulated)
   * In production, replace with: new WebSocket('wss://your-api.com/stocks')
   */
  connect() {
    if (this.isConnected) {
      console.log('📡 Already connected to stock updates');
      return;
    }

    console.log('📡 Connecting to real-time stock data...');
    this.isConnected = true;

    // Simulate WebSocket connection
    this.startRealTimeUpdates();

    // Notify subscribers of initial connection
    this.notifySubscribers({
      type: 'connected',
      data: this.getFormattedStocks(),
      timestamp: Date.now()
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect() {
    if (!this.isConnected) return;

    console.log('📡 Disconnecting from stock updates...');
    this.isConnected = false;

    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    this.notifySubscribers({
      type: 'disconnected',
      timestamp: Date.now()
    });
  }

  /**
   * Subscribe to real-time updates
   * @param {Function} callback - Function to call when data updates
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.subscribers.add(callback);

    // Send initial data immediately
    if (this.isConnected) {
      callback({
        type: 'initial',
        data: this.getFormattedStocks(),
        timestamp: Date.now()
      });
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.disconnect();
      }
    };
  }

  /**
   * Start simulating real-time price updates
   * In production, replace with actual WebSocket message handling
   */
  startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      if (!this.isConnected) return;

      // Update prices with realistic fluctuations
      this.stocks = this.stocks.map(stock => {
        // Random price change between -2% to +2%
        const changePercent = (Math.random() - 0.5) * 4;
        const priceChange = stock.basePrice * (changePercent / 100);
        const newPrice = stock.price + priceChange;

        // Keep price within reasonable bounds (±10% of base price)
        const minPrice = stock.basePrice * 0.90;
        const maxPrice = stock.basePrice * 1.10;
        const boundedPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));

        return {
          ...stock,
          price: boundedPrice,
          change: ((boundedPrice - stock.basePrice) / stock.basePrice) * 100
        };
      });

      // Notify all subscribers
      this.notifySubscribers({
        type: 'update',
        data: this.getFormattedStocks(),
        timestamp: Date.now()
      });

    }, this.UPDATE_FREQUENCY);
  }

  /**
   * Format stocks to standard format
   */
  getFormattedStocks() {
    return this.stocks.map((stock, index) => ({
      id: `stock-${stock.symbol}`,
      symbol: stock.symbol,
      name: stock.name,
      price: parseFloat(stock.price.toFixed(2)),
      change: parseFloat((stock.change || 0).toFixed(2)),
      volume: Math.floor(Math.random() * 5000000) + 100000,
      exchange: 'NSE',
      lastUpdated: new Date().toISOString(),
    }));
  }

  /**
   * Notify all subscribers of updates
   */
  notifySubscribers(message) {
    this.subscribers.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }

  /**
   * Get current connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      subscriberCount: this.subscribers.size,
      lastUpdate: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const stockWebSocketService = new StockWebSocketService();
