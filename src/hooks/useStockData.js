import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing stock data with infinite scroll support
 * Follows Single Responsibility Principle - only handles data management
 */
export const useStockData = (stockService, initialLimit = 20) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [stockService]);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const newStocks = await stockService.fetchStocks(0, initialLimit);
      setStocks(newStocks);
      setOffset(newStocks.length);
      setHasMore(newStocks.length === initialLimit);
    } catch (err) {
      setError('Failed to load stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [stockService, initialLimit]);

  // Load more data for infinite scroll
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const newStocks = await stockService.fetchStocks(offset, initialLimit);

      if (newStocks.length > 0) {
        setStocks(prev => [...prev, ...newStocks]);
        setOffset(prev => prev + newStocks.length);
        setHasMore(newStocks.length === initialLimit);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to load more stocks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, stockService, initialLimit]);

  // Refresh data
  const refresh = useCallback(async () => {
    setOffset(0);
    setStocks([]);
    setHasMore(true);
    await loadInitialData();
  }, [loadInitialData]);

  return {
    stocks,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    totalCount: stocks.length
  };
};

/**
 * Custom hook for infinite scroll functionality
 * Handles scroll detection and triggers data loading
 */
export const useInfiniteScroll = (loadMore, hasMore, threshold = 100) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;

      // Trigger load more when user scrolls near bottom
      if (scrollTop + windowHeight >= documentHeight - threshold) {
        if (hasMore && !isFetching) {
          setIsFetching(true);
          loadMore();

          // Reset fetching state after a short delay
          setTimeout(() => setIsFetching(false), 1000);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [hasMore, isFetching, threshold, loadMore]);

  return { isFetching };
};
