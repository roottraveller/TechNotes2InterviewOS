import { useState, useEffect } from 'react';
import { STORAGE_KEYS, THEMES } from '../utils/constants';

/**
 * Custom hook for theme management
 * Handles dark/light mode toggle and persistence
 */
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      setIsDarkMode(savedTheme === THEMES.DARK);
    }
  }, []);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? THEMES.DARK : THEMES.LIGHT);
    document.documentElement.setAttribute('data-theme', isDarkMode ? THEMES.DARK : THEMES.LIGHT);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { 
    isDarkMode, 
    toggleTheme 
  };
}; 