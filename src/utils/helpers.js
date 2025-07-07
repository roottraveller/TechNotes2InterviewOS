import { BREAKPOINTS } from './constants';

/**
 * Utility Helper Functions
 * Common utility functions used across the application
 */

/**
 * Check if current viewport is mobile
 * @returns {boolean} True if mobile viewport
 */
export const isMobileViewport = () => {
  return window.innerWidth <= BREAKPOINTS.MOBILE;
};

/**
 * Get topic initial for collapsed sidebar display
 * @param {string} title - Topic title
 * @returns {string} Initial character(s) for the topic
 */
export const getTopicInitial = (title) => {
  if (title === 'JavaScript') return 'JS';
  if (title === 'React') return 'R';
  if (title === 'Algorithms & Data Structures') return 'A';
  if (title === 'System Design') return 'SD';
  return title.charAt(0);
};

/**
 * Calculate total number of subtopics across all topics
 * @param {Array} topics - Array of topic objects
 * @returns {number} Total subtopic count
 */
export const getTotalSubtopicsCount = (topics) => {
  return topics.reduce((total, topic) => total + topic.subtopics.length, 0);
}; 