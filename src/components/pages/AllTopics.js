import React, { useState, useMemo } from 'react';
import { appData } from '../../config';
import './AllTopics.css';

const AllTopics = ({ onTopicSelect, onSubtopicSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Process topics to add missing properties
  const processedTopics = useMemo(() => {
    return appData.topics.map(topic => {
      // Generate description from subtopics
      const description = topic.subtopics.length > 0 
        ? `Explore ${topic.subtopics.length} subtopics covering ${topic.title.toLowerCase()}`
        : `Learn about ${topic.title.toLowerCase()}`;
      
      // Get the most common category from subtopics, or use 'General'
      const categories = topic.subtopics
        .map(subtopic => subtopic.category)
        .filter(cat => cat);
      
      const categoryCount = categories.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommonCategory = Object.keys(categoryCount).length > 0
        ? Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b)
        : 'General';

      return {
        ...topic,
        description,
        category: mostCommonCategory
      };
    });
  }, []);

  // Get unique categories from processed topics
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(processedTopics.map(topic => topic.category))];
    return cats;
  }, [processedTopics]);

  // Filter topics based on search and category
  const filteredTopics = useMemo(() => {
    return processedTopics.filter(topic => {
      const matchesSearch = searchTerm === '' || 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.subtopics.some(subtopic => 
          subtopic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (subtopic.category && subtopic.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      const matchesCategory = selectedCategory === 'all' || 
        topic.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [processedTopics, searchTerm, selectedCategory]);

  const handleTopicClick = (topicId) => {
    onTopicSelect(topicId);
  };

  const handleSubtopicClick = (topicId, subtopicId) => {
    onTopicSelect(topicId);
    onSubtopicSelect(subtopicId);
  };

  const totalSubtopics = appData.topics.reduce((total, topic) => total + topic.subtopics.length, 0);

  return (
    <div className="all-topics">
      <div className="all-topics-container">
        {/* Header Section */}
        <div className="all-topics-header">
          <h1 className="all-topics-title">All Topics</h1>
          <p className="all-topics-subtitle">
            Explore our comprehensive collection of technical interview topics
          </p>
        </div>

        {/* Stats Section */}
        <div className="topics-stats">
          <div className="stat-card">
            <div className="stat-number">{appData.topics.length}</div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalSubtopics}</div>
            <div className="stat-label">Subtopics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{filteredTopics.length}</div>
            <div className="stat-label">Showing</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="topics-controls">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search topics, subtopics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="search-clear"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="search-results-summary">
            <p>
              Found <strong>{filteredTopics.length}</strong> topic{filteredTopics.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Topics Grid */}
        <div className="topics-grid">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <div key={topic.id} className="topic-card">
                <div className="topic-card-header">
                  <h3 className="topic-title">{topic.title}</h3>
                  <div className="topic-meta">
                    <span className="topic-category">{topic.category}</span>
                    <span className="topic-count">{topic.subtopics.length} subtopics</span>
                  </div>
                </div>
                
                <p className="topic-description">{topic.description}</p>

                <div className="topic-subtopics">
                  <h4>Subtopics:</h4>
                  <div className="subtopics-list">
                    {topic.subtopics.slice(0, 5).map(subtopic => (
                      <button
                        key={subtopic.id}
                        className="subtopic-tag"
                        onClick={() => handleSubtopicClick(topic.id, subtopic.id)}
                      >
                        {subtopic.title}
                      </button>
                    ))}
                    {topic.subtopics.length > 5 && (
                      <span className="more-subtopics">
                        +{topic.subtopics.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="topic-actions">
                  <button
                    className="btn-primary"
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    Explore Topic
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>No topics found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTopics; 