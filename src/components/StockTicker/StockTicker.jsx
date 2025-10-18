import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import StockTickerItem from './StockTickerItem';
import { useStockData, useInfiniteScroll } from '../../hooks/useStockData';
import { rapidAPIStockService } from '../../services/rapidApiStockService';

/**
 * Main Stock Ticker component with infinite scroll
 * Follows Single Responsibility Principle - only handles display and animation
 * Uses composition over inheritance
 */
const StockTicker = ({
  stockService = rapidAPIStockService,
  autoPlay = true,
  speed = 40, // Slower speed for mobile readability
  showHeader = true
}) => {
  const tickerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const {
    stocks,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    totalCount
  } = useStockData(stockService);

  const { isFetching } = useInfiniteScroll(loadMore, hasMore);

  // Auto-scroll animation
  const tickerAnimation = {
    x: autoPlay && !isPaused ? [0, -100] : 0,
    transition: {
      repeat: Infinity,
      duration: speed,
      ease: "linear"
    }
  };

  const handleRefresh = () => {
    refresh();
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default' }}>
      {/* Header */}
      {showHeader && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              📈 Indian Stock Market
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Live market data • {totalCount} stocks loaded
            </Typography>

            {/* Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={loading}
                sx={{ borderRadius: 2 }}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handlePauseToggle}
                sx={{ borderRadius: 2 }}
              >
                {isPaused ? '▶️ Resume' : '⏸️ Pause'}
              </Button>
            </Box>
          </motion.div>
        </Box>
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: 16 }}
          >
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={handleRefresh}>
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && stocks.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Stock Ticker */}
      <Box
        ref={tickerRef}
        sx={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          height: { xs: 'auto', sm: '80px' }, // Responsive height
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #2196F3, transparent)',
            zIndex: 1,
          }
        }}
      >
        {/* Responsive Ticker Animation - Works on both desktop and mobile */}
        <Box sx={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          height: { xs: 'auto', sm: '80px' },
        }}>
          <motion.div
            animate={autoPlay && !isPaused ? tickerAnimation : {}}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              width: 'max-content', // Important for animation
            }}
          >
            {/* Single render of all items - NO DUPLICATION */}
            {stocks.map((stock, index) => (
              <StockTickerItem
                key={stock.id}
                stock={stock}
                index={index}
              />
            ))}

            {/* Spacer for seamless loop */}
            <Box sx={{ width: '100px', flexShrink: 0 }} />

            {/* Duplicate for seamless animation - only necessary items */}
            {stocks.slice(0, Math.min(15, stocks.length)).map((stock, index) => (
              <StockTickerItem
                key={`ticker-${stock.id}`}
                stock={stock}
                index={index + stocks.length}
              />
            ))}
          </motion.div>
        </Box>

        {/* Show mobile scroll hint when animation is paused */}
        {isPaused && (
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
            ← Scroll to see more stocks →
          </Typography>
        )}

        {/* Loading indicator for infinite scroll */}
        {isFetching && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
          }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="caption" color="text.secondary">
              Loading more stocks...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom Info */}
      <Box sx={{
        textAlign: 'center',
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="caption" color="text.secondary">
          Real-time market data • Auto-updates every 5 minutes
        </Typography>
        {!hasMore && (
          <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
            ✓ All stocks loaded
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StockTicker;
