const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      try {
        // Core Web Vitals
        onCLS(onPerfEntry); // Cumulative Layout Shift
        onFCP(onPerfEntry); // First Contentful Paint
        onLCP(onPerfEntry); // Largest Contentful Paint
        onINP(onPerfEntry); // Interaction to Next Paint (replaces FID)
        
        // Additional metrics (optional)
        onTTFB(onPerfEntry); // Time to First Byte
      } catch (error) {
        console.error('Error reporting web vitals:', error);
      }
    }).catch(error => {
      console.error('Error loading web-vitals:', error);
    });
  }
};

export default reportWebVitals;
