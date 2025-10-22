import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing WebSocket connection to stock data
 * Handles connection lifecycle, automatic reconnection, and data updates
 * 
 * @param {Object} webSocketService - WebSocket service instance
 * @param {boolean} autoConnect - Whether to connect automatically on mount
 * @returns {Object} WebSocket state and methods
 */
export const useStockWebSocket = (webSocketService, autoConnect = true) => {
  const [stocks, setStocks] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const unsubscribeRef = useRef(null);

  /**
   * Handle incoming WebSocket messages
   */
  const handleMessage = useCallback((message) => {
    try {
      switch (message.type) {
        case 'connected':
          setIsConnected(true);
          setStocks(message.data || []);
          setLastUpdate(new Date(message.timestamp));
          setError(null);
          console.log('✅ Connected to real-time stock data');
          break;

        case 'update':
          setStocks(message.data || []);
          setLastUpdate(new Date(message.timestamp));
          break;

        case 'initial':
          setStocks(message.data || []);
          setLastUpdate(new Date(message.timestamp));
          break;

        case 'disconnected':
          setIsConnected(false);
          console.log('🔌 Disconnected from stock updates');
          break;

        case 'error':
          setError(message.error || 'Connection error occurred');
          console.error('❌ WebSocket error:', message.error);
          break;

        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
      setError('Failed to process update');
    }
  }, []);

  /**
   * Connect to WebSocket
   */
  const connect = useCallback(() => {
    try {
      if (unsubscribeRef.current) {
        console.log('Already subscribed, skipping...');
        return;
      }

      // Subscribe to WebSocket updates
      unsubscribeRef.current = webSocketService.subscribe(handleMessage);
      
      // Connect to service
      webSocketService.connect();
      
    } catch (err) {
      console.error('Failed to connect to WebSocket:', err);
      setError('Failed to connect to real-time data');
    }
  }, [webSocketService, handleMessage]);

  /**
   * Disconnect from WebSocket
   */
  const disconnect = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    webSocketService.disconnect();
    setIsConnected(false);
  }, [webSocketService]);

  /**
   * Reconnect to WebSocket
   */
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(() => connect(), 1000);
  }, [connect, disconnect]);

  /**
   * Auto-connect on mount if enabled
   */
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [autoConnect, connect]);

  /**
   * Monitor connection health
   */
  useEffect(() => {
    if (!isConnected || !lastUpdate) return;

    // Check if we're receiving updates
    const healthCheckInterval = setInterval(() => {
      const timeSinceUpdate = Date.now() - lastUpdate.getTime();
      const TIMEOUT_THRESHOLD = 30000; // 30 seconds

      if (timeSinceUpdate > TIMEOUT_THRESHOLD) {
        console.warn('⚠️ No updates received, attempting reconnection...');
        reconnect();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(healthCheckInterval);
  }, [isConnected, lastUpdate, reconnect]);

  return {
    stocks,
    isConnected,
    error,
    lastUpdate,
    connect,
    disconnect,
    reconnect,
    totalCount: stocks.length
  };
};
