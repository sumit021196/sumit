/**
 * Quick test for WebSocket service
 * Run this in browser console to verify functionality
 */

import { stockWebSocketService } from './stockWebSocketService';

export const testWebSocketService = () => {
  console.log('🧪 Testing WebSocket Service...\n');

  // Test 1: Check initial state
  console.log('1️⃣ Initial state:', stockWebSocketService.getConnectionStatus());

  // Test 2: Subscribe to updates
  const unsubscribe = stockWebSocketService.subscribe((message) => {
    console.log('📨 Received message:', {
      type: message.type,
      stockCount: message.data?.length || 0,
      timestamp: new Date(message.timestamp).toLocaleTimeString()
    });

    if (message.type === 'update' && message.data) {
      console.log('📈 Sample stocks:', message.data.slice(0, 3).map(s => ({
        symbol: s.symbol,
        price: s.price,
        change: s.change
      })));
    }
  });

  // Test 3: Connect
  stockWebSocketService.connect();

  // Test 4: Check status after connection
  setTimeout(() => {
    console.log('2️⃣ Status after connection:', stockWebSocketService.getConnectionStatus());
  }, 1000);

  // Test 5: Wait for updates
  setTimeout(() => {
    console.log('✅ Test complete! WebSocket is working.');
    console.log('💡 Updates should appear every 3 seconds.');
    console.log('🛑 To stop: Call unsubscribe()');
  }, 5000);

  return unsubscribe;
};

// Export for manual testing
if (typeof window !== 'undefined') {
  window.testWebSocketService = testWebSocketService;
}
