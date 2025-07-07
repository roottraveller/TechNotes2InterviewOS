import { BrowserRouter, HashRouter } from 'react-router-dom';

/**
 * Router Configuration
 * Determines which router to use based on environment
 */

// Use HashRouter for GitHub Pages deployment, BrowserRouter for local development
export const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter; 