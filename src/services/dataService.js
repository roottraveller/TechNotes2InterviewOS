import { appData } from '../config';

/**
 * Data Service
 * Handles all data operations for topics and subtopics
 */

/**
 * Get all topics
 * @returns {Array} Array of topic objects
 */
export const getAllTopics = () => {
  return appData.topics;
};

/**
 * Find a topic by ID
 * @param {string} topicId - The topic ID to search for
 * @returns {Object|null} Topic object or null if not found
 */
export const findTopicById = (topicId) => {
  return appData.topics.find(topic => topic.id === topicId) || null;
};

/**
 * Find a subtopic by ID across all topics
 * @param {string} subtopicId - The subtopic ID to search for
 * @returns {Object|null} Object with topic and subtopic or null if not found
 */
export const findSubtopicById = (subtopicId) => {
  for (const topic of appData.topics) {
    const subtopic = topic.subtopics.find(sub => sub.id === subtopicId);
    if (subtopic) {
      return { topic, subtopic };
    }
  }
  return null;
};

/**
 * Get topic content by ID
 * @param {string} topicId - The topic ID
 * @param {string} subtopicId - Optional subtopic ID
 * @returns {Object} Content object with title and content
 */
export const getTopicContent = (topicId, subtopicId = null) => {
  const topic = findTopicById(topicId);
  
  if (!topic) {
    return {
      title: 'Topic Not Found',
      content: '<div class="error-message">The requested topic could not be found.</div>'
    };
  }

  if (subtopicId) {
    const subtopic = topic.subtopics.find(sub => sub.id === subtopicId);
    if (!subtopic) {
      return {
        title: 'Subtopic Not Found',
        content: '<div class="error-message">The requested subtopic could not be found.</div>'
      };
    }
    return {
      title: subtopic.title,
      content: subtopic.content
    };
  }

  // If no subtopic is selected, show the first subtopic or topic overview
  if (topic.subtopics.length > 0) {
    return {
      title: topic.subtopics[0].title,
      content: topic.subtopics[0].content
    };
  }

  return {
    title: topic.title,
    content: '<div class="topic-overview">Select a subtopic to view its content.</div>'
  };
};

/**
 * Get application statistics
 * @returns {Object} Statistics object
 */
export const getAppStats = () => {
  const topics = getAllTopics();
  const totalSubtopics = topics.reduce((total, topic) => total + topic.subtopics.length, 0);
  
  return {
    topicCount: topics.length,
    subtopicCount: totalSubtopics,
    totalContent: topics.reduce((total, topic) => {
      return total + topic.subtopics.reduce((subTotal, subtopic) => {
        return subTotal + (subtopic.content ? subtopic.content.length : 0);
      }, 0);
    }, 0)
  };
}; 