# Real-Time Stock Market WebSocket Implementation

## Overview

This project now uses **WebSocket** for real-time stock price updates instead of repeated API polling. This provides:

✅ **Real-time updates** - Prices update every 3 seconds automatically  
✅ **No repeated API calls** - Single persistent connection instead of polling  
✅ **Better performance** - Lower server load and faster updates  
✅ **Live connection status** - Visual indicator showing connection state  

---

## Current Implementation

### Simulated WebSocket (Development)

Currently using a **simulated WebSocket service** (`stockWebSocketService.js`) that:
- Generates realistic price fluctuations (±2% per update)
- Updates all stock prices every 3 seconds
- Keeps prices within ±10% of base price
- Provides 20 Indian stock symbols (RELIANCE, TCS, HDFC, etc.)

### Files Structure

```
src/
├── services/
│   ├── stockWebSocketService.js      # Simulated WebSocket service
│   └── README_WEBSOCKET.md           # This file
├── hooks/
│   └── useStockWebSocket.js          # React hook for WebSocket
└── components/
    └── StockTicker/
        └── StockTicker.jsx           # Main component using WebSocket
```

---

## How to Replace with Real Stock API

### Option 1: Alpha Vantage WebSocket (Recommended)

**Free tier available**: 5 API calls/minute

1. Sign up at: https://www.alphavantage.co/
2. Get API key
3. Update `.env`:
   ```env
   VITE_ALPHA_VANTAGE_KEY=your_api_key_here
   ```

4. Replace in `stockWebSocketService.js`:
   ```javascript
   // Replace startRealTimeUpdates() with:
   startRealTimeUpdates() {
     const symbols = this.stocks.map(s => s.symbol).join(',');
     const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
     
     this.updateInterval = setInterval(async () => {
       try {
         const response = await fetch(
           `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbols}&apikey=${apiKey}`
         );
         const data = await response.json();
         
         // Process and update stocks
         this.processAlphaVantageData(data);
       } catch (error) {
         console.error('Error fetching stock data:', error);
       }
     }, 60000); // 1 minute (free tier limit)
   }
   ```

---

### Option 2: Finnhub WebSocket (Real-time)

**Free tier**: 60 API calls/minute, real WebSocket support

1. Sign up at: https://finnhub.io/
2. Get API key
3. Update `.env`:
   ```env
   VITE_FINNHUB_KEY=your_api_key_here
   ```

4. Replace in `stockWebSocketService.js`:
   ```javascript
   connect() {
     const apiKey = import.meta.env.VITE_FINNHUB_KEY;
     this.ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
     
     this.ws.onopen = () => {
       console.log('Connected to Finnhub');
       this.isConnected = true;
       
       // Subscribe to symbols
       this.stocks.forEach(stock => {
         this.ws.send(JSON.stringify({
           type: 'subscribe',
           symbol: stock.symbol
         }));
       });
     };
     
     this.ws.onmessage = (event) => {
       const message = JSON.parse(event.data);
       if (message.type === 'trade') {
         this.updateStockPrice(message);
       }
     };
     
     this.ws.onerror = (error) => {
       console.error('WebSocket error:', error);
       this.notifySubscribers({ type: 'error', error: error.message });
     };
   }
   ```

---

### Option 3: NSE/BSE Official APIs

For **Indian stock market data**, you may need:

1. **NSE India API** (requires registration)
2. **BSE India API** (requires approval)
3. **Third-party aggregators** like:
   - RapidAPI NSE/BSE endpoints
   - Upstox API (requires brokerage account)
   - Zerodha Kite Connect (₹2000/month)

---

## Features

### 1. Connection Management
- Auto-connect on component mount
- Auto-reconnect on connection loss
- Health monitoring (detects stale data)
- Clean disconnect on unmount

### 2. Real-time UI Updates
- Live connection indicator (green dot)
- Last update timestamp
- Visual price transitions
- Connection status chip

### 3. Performance Optimizations
- React.memo on StockTickerItem
- Efficient subscriber pattern
- GPU-accelerated CSS animations
- Minimal re-renders

---

## Configuration

### Update Frequency

Change in `stockWebSocketService.js`:
```javascript
this.UPDATE_FREQUENCY = 3000; // 3 seconds (default)
```

### Price Fluctuation Range

Change in `stockWebSocketService.js`:
```javascript
// Current: ±2% per update
const changePercent = (Math.random() - 0.5) * 4;

// For wider swings (±5%):
const changePercent = (Math.random() - 0.5) * 10;
```

---

## Monitoring & Debugging

### Check Connection Status
```javascript
console.log(stockWebSocketService.getConnectionStatus());
// Output: { isConnected: true, subscriberCount: 1, lastUpdate: "..." }
```

### Enable Debug Logs
The service already logs:
- ✅ Connection established
- 📡 Data updates
- ❌ Errors
- 🔌 Disconnections

---

## Migration from Old API Polling

### Before (API Polling)
```javascript
// Old: useStockData.js
const { stocks } = useStockData(rapidAPIStockService);
// - Repeated API calls every 5 minutes
// - Cache management required
// - Delayed updates
```

### After (WebSocket)
```javascript
// New: useStockWebSocket.js
const { stocks, isConnected } = useStockWebSocket(stockWebSocketService);
// ✅ Real-time updates every 3 seconds
// ✅ Single connection
// ✅ Instant updates
```

---

## Benefits

| Feature | API Polling | WebSocket |
|---------|-------------|-----------|
| **Update Speed** | 5 minutes | 3 seconds |
| **Server Load** | High (repeated requests) | Low (1 connection) |
| **Real-time** | ❌ No | ✅ Yes |
| **Connection Status** | Unknown | Visible |
| **Battery Usage** | Higher | Lower |
| **Data Freshness** | Stale (up to 5 min) | Live |

---

## Support

For issues or questions:
1. Check console logs for connection errors
2. Verify WebSocket service is initialized
3. Check browser dev tools → Network → WS tab
4. Enable verbose logging in service

---

## Future Enhancements

- [ ] Add historical price charts
- [ ] Support multiple watchlists
- [ ] Price alerts/notifications
- [ ] Order book depth
- [ ] Market news integration
- [ ] Real NSE/BSE API integration

---

**Note**: Current implementation uses simulated data. Replace with real API for production use.
