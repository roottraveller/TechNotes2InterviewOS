/**
 * Application Constants
 * Centralized configuration values and magic numbers
 */

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed'
};

// Theme values
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Route paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  TOPICS: '/topics',
  MENTORSHIP: '/mentorship',
  TOPIC: '/topic/:topicId/:subtopicId?'
};

// Application metadata
export const APP_CONFIG = {
  NAME: 'InterviewOS',
  DESCRIPTION: 'Your comprehensive platform for technical interview preparation',
  VERSION: '1.0.0'
}; 