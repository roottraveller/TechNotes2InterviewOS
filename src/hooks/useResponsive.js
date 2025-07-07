import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/constants';

/**
 * Custom hook for responsive behavior
 * Handles mobile detection and window resize events
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  const checkMobile = () => {
    return window.innerWidth <= BREAKPOINTS.MOBILE;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    // Set initial state
    setIsMobile(checkMobile());

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
}; 