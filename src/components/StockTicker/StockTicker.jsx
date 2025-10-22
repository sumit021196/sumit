import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Fade, Chip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StockTickerItem from './StockTickerItem';
import { useStockWebSocket } from '../../hooks/useStockWebSocket';
import { stockWebSocketService } from '../../services/stockWebSocketService';

/**
 * Main Stock Ticker component with real-time WebSocket updates
 * Follows Single Responsibility Principle - only handles display and animation
 * Uses composition over inheritance
 */
const StockTicker = ({
  autoPlay = true,
  speed = 1, // Slower speed for mobile readability
  showHeader = true
}) => {
  const tickerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Use WebSocket for real-time updates instead of polling
  const {
    stocks,
    isConnected,
    error,
    lastUpdate,
    reconnect,
    totalCount
  } = useStockWebSocket(stockWebSocketService, true);

  // Calculate animation duration based on content width
  const getAnimationDuration = () => {
    if (!autoPlay || isPaused) return '0s';
    // Longer duration for smoother animation (60 seconds for full cycle)
    return `${60 / speed}s`;
  };

  const handleRefresh = () => {
    reconnect();
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Box sx={{ py: { xs: 1, md: 2 }, backgroundColor: 'background.default' }}>
      {/* Compact Header */}
      {showHeader && (
        <Box sx={{ mb: { xs: 1, md: 2 }, px: { xs: 1, md: 0 } }}>
          <Fade in timeout={600}>
            <Box>
              {/* Title & Status Row */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 0.5,
                mb: 1
              }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  📈 Live Stocks
                </Typography>
                
                <Chip
                  icon={<FiberManualRecordIcon sx={{ fontSize: 8 }} />}
                  label={isConnected ? 'Live' : 'Offline'}
                  size="small"
                  color={isConnected ? 'success' : 'error'}
                  sx={{ 
                    fontWeight: 600,
                    height: 20,
                    fontSize: '0.6rem'
                  }}
                />
              </Box>
              
              {/* Info Row */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 0.5
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                  {totalCount} stocks • Updates every 3s
                </Typography>
                {lastUpdate && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                    {lastUpdate.toLocaleTimeString()}
                  </Typography>
                )}

              </Box>
              
              {/* Compact Controls */}
              <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshIcon sx={{ fontSize: 14 }} />}
                  onClick={handleRefresh}
                  disabled={!isConnected && stocks.length === 0}
                  sx={{ 
                    borderRadius: 2,
                    py: 0.3,
                    px: 1,
                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                    minWidth: 'auto'
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlePauseToggle}
                  sx={{ 
                    borderRadius: 2,
                    py: 0.3,
                    px: 1,
                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                    minWidth: 'auto'
                  }}
                >
                  {isPaused ? '▶' : '⏸'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Fade in timeout={300}>
          <Box sx={{ mb: 1 }}>
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
          </Box>
        </Fade>
      )}

      {/* Loading State */}
      {!isConnected && stocks.length === 0 && !error && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, gap: 1 }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Connecting to real-time data...
          </Typography>
        </Box>
      )}

      {/* Compact Stock Ticker */}
      <Box
        ref={tickerRef}
        sx={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          py: { xs: 0.5, sm: 1 },
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)',
          borderRadius: { xs: 0, sm: 1 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.3), transparent)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.3), transparent)',
            zIndex: 1,
          }
        }}
      >
        {/* Responsive Ticker Animation - Works on both desktop and mobile */}
        <Box
          sx={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            '@keyframes scroll': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              py: { xs: 0.2, sm: 0.5 },
              width: 'max-content',
              animation: autoPlay && !isPaused ? `scroll ${getAnimationDuration()} linear infinite` : 'none',
              willChange: autoPlay && !isPaused ? 'transform' : 'auto',
              // GPU acceleration and performance optimizations
              transform: 'translate3d(0, 0, 0)',
              contain: 'layout style paint',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* First set of stocks */}
            {stocks.map((stock) => (
              <StockTickerItem
                key={stock.id}
                stock={stock}
              />
            ))}

            {/* Duplicate for seamless loop */}
            {stocks.map((stock) => (
              <StockTickerItem
                key={`dup-${stock.id}`}
                stock={stock}
              />
            ))}
          </Box>
        </Box>

      </Box>

      {/* Bottom Info */}
      <Box sx={{
        textAlign: 'center',
        mt: { xs: 1, sm: 1.5 },
        px: 1
      }}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.55rem', sm: '0.6rem' },
            opacity: 0.8
          }}
        >
          Real-time via WebSocket • Updates every 3s
          {isConnected && (
            <Typography 
              component="span" 
              sx={{ 
                color: 'success.main', 
                fontWeight: 600,
                ml: 1
              }}
            >
              • Live
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default StockTicker;
