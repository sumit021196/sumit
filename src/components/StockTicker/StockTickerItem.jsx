import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

/**
 * Individual stock item component for the ticker
 * Optimized with React.memo for performance
 * Follows Single Responsibility Principle
 * Responsive design for both ticker and grid layouts
 */
export const StockTickerItem = memo(({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <Box
      className="stock-ticker-item"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: { xs: '8px 10px', sm: '10px 14px' },
        margin: '0 3px',
        background: isPositive 
          ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(244, 67, 54, 0.08) 0%, rgba(244, 67, 54, 0.02) 100%)',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        minWidth: { xs: '120px', sm: '140px' },
        width: { xs: '120px', sm: '140px' },
        border: `1.5px solid ${isPositive ? 'rgba(76, 175, 80, 0.25)' : 'rgba(244, 67, 54, 0.25)'}`,
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
        transition: 'all 0.2s ease-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          borderColor: isPositive ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: isPositive 
            ? 'linear-gradient(180deg, #4caf50 0%, #81c784 100%)'
            : 'linear-gradient(180deg, #f44336 0%, #e57373 100%)',
        },
        // GPU acceleration
        willChange: 'transform',
      }}
    >
      {/* Top Row: Symbol & Change */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        mb: 0.5
      }}>
        {/* Stock Symbol */}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            letterSpacing: '0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '70%'
          }}
        >
          {stock.symbol}
        </Typography>
        
        {/* Change Percentage */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
          backgroundColor: isPositive ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
          borderRadius: '4px',
          px: 0.6,
          py: 0.3
        }}>
          {isPositive ? <TrendingUpIcon sx={{ fontSize: 10, color: '#4caf50' }} /> : <TrendingDownIcon sx={{ fontSize: 10, color: '#f44336' }} />}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              color: isPositive ? '#2e7d32' : '#c62828',
              lineHeight: 1
            }}
          >
            {isPositive ? '+' : ''}{stock.change?.toFixed(2)}%
          </Typography>
        </Box>
      </Box>

      {/* Bottom Row: Price */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}
      >
        ₹{stock.price?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
      </Typography>
    </Box>
  );
});

// Display name for debugging
StockTickerItem.displayName = 'StockTickerItem';

export default StockTickerItem;
