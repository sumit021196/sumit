import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

/**
 * Individual stock item component for the ticker
 * Optimized with React.memo for performance
 * Follows Single Responsibility Principle
 * Responsive design for both ticker and grid layouts
 */
export const StockTickerItem = memo(({ stock, index }) => {
  const isPositive = stock.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="stock-ticker-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 10px',
        margin: '0 2px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        minWidth: { xs: '120px', sm: '140px' }, // More compact for mobile
        maxWidth: { xs: '150px', sm: '180px' },
        border: `1px solid ${isPositive ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Stock Symbol */}
      <Box sx={{ minWidth: { xs: '35px', sm: '45px' }, mr: { xs: 0.5, sm: 1 } }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          {stock.symbol}
        </Typography>
      </Box>

      {/* Company Name - Hidden in ticker, visible in grid */}
      <Box sx={{
        flex: 1,
        mr: { xs: 1, sm: 2 },
        display: 'none' // Hide company name completely from UI
      }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {stock.name}
        </Typography>
      </Box>

      {/* Price */}
      <Box sx={{ minWidth: { xs: '50px', sm: '60px' }, mr: { xs: 0.5, sm: 0.5 } }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          ₹{stock.price?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </Typography>
      </Box>

      {/* Change & Trend Icon */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        minWidth: { xs: '45px', sm: '50px' },
        color: isPositive ? 'success.main' : 'error.main'
      }}>
        {isPositive ? <TrendingUpIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.3 }} /> : <TrendingDownIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.3 }} />}
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}
        >
          {isPositive ? '+' : ''}{stock.change?.toFixed(2)}%
        </Typography>
      </Box>
    </motion.div>
  );
});

// Display name for debugging
StockTickerItem.displayName = 'StockTickerItem';

export default StockTickerItem;
