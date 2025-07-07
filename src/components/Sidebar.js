import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  topics, 
  selectedTopic, 
  selectedSubtopic, 
  onTopicSelect, 
  onSubtopicSelect,
  isMobile,
  isMobileMenuOpen,
  onMobileMenuClose,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [hoveredTopic, setHoveredTopic] = useState(null);

  const handleTopicClick = (topicId) => {
    if (selectedTopic === topicId) {
      // If clicking the same topic, toggle it
      onTopicSelect(null);
    } else {
      onTopicSelect(topicId);
    }
  };

  const handleSubtopicClick = (subtopicId) => {
    onSubtopicSelect(subtopicId);
    if (isMobile) {
      onMobileMenuClose();
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onMobileMenuClose();
    }
  };

  // Get topic initial for collapsed state
  const getTopicInitial = (title) => {
    if (title === 'JavaScript') return 'JS';
    if (title === 'React') return 'R';
    if (title === 'Algorithms & Data Structures') return 'A';
    if (title === 'System Design') return 'SD';
    return title.charAt(0);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileMenuOpen && !event.target.closest('.sidebar') && !event.target.closest('.mobile-menu-button')) {
        onMobileMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen, onMobileMenuClose]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMobileMenuOpen]);

  // Mobile overlay
  if (isMobile && isMobileMenuOpen) {
    return (
      <>
        <div className="mobile-overlay" onClick={handleOverlayClick} />
        <aside className={`sidebar mobile ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h2>Topics</h2>
            <button 
              className="mobile-close-button"
              onClick={onMobileMenuClose}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="sidebar-content">
            {topics.map((topic) => (
              <div key={topic.id} className="topic-section">
                <button
                  className={`topic-button ${selectedTopic === topic.id ? 'selected' : ''}`}
                  onClick={() => handleTopicClick(topic.id)}
                  aria-expanded={selectedTopic === topic.id}
                >
                  <span className="topic-icon" />
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-count">{topic.subtopics.length}</span>
                </button>
                {selectedTopic === topic.id && (
                  <div className="subtopics">
                    {topic.subtopics.map((subtopic) => (
                      <button
                        key={subtopic.id}
                        className={`subtopic-button ${selectedSubtopic === subtopic.id ? 'selected' : ''}`}
                        onClick={() => handleSubtopicClick(subtopic.id)}
                      >
                        <span className="subtopic-dot" />
                        <span className="subtopic-title">{subtopic.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className={`sidebar desktop ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>Topics</h2>}
        {!isCollapsed && (
          <button 
            className="sidebar-toggle-btn"
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          />
        )}
      </div>
      <div className="sidebar-content">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-section">
            <button
              className={`topic-button ${selectedTopic === topic.id ? 'selected' : ''}`}
              onClick={() => handleTopicClick(topic.id)}
              onMouseEnter={() => isCollapsed && setHoveredTopic(topic.id)}
              onMouseLeave={() => isCollapsed && setHoveredTopic(null)}
              aria-expanded={selectedTopic === topic.id}
              aria-label={topic.title}
              title={isCollapsed ? topic.title : ''}
            >
              <span className="topic-icon">
                {isCollapsed && <span className="topic-initial">{getTopicInitial(topic.title)}</span>}
              </span>
              {!isCollapsed && (
                <>
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-count">{topic.subtopics.length}</span>
                </>
              )}
            </button>
            {selectedTopic === topic.id && !isCollapsed && (
              <div className="subtopics">
                {topic.subtopics.map((subtopic) => (
                  <button
                    key={subtopic.id}
                    className={`subtopic-button ${selectedSubtopic === subtopic.id ? 'selected' : ''}`}
                    onClick={() => handleSubtopicClick(subtopic.id)}
                  >
                    <span className="subtopic-dot" />
                    <span className="subtopic-title">{subtopic.title}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Collapsed state tooltip */}
            {isCollapsed && hoveredTopic === topic.id && (
              <div className="collapsed-tooltip">
                <div className="tooltip-content">
                  <h4>{topic.title}</h4>
                  <div className="tooltip-subtopics">
                    {topic.subtopics.map((subtopic) => (
                      <button
                        key={subtopic.id}
                        className={`tooltip-subtopic ${selectedSubtopic === subtopic.id ? 'selected' : ''}`}
                        onClick={() => handleSubtopicClick(subtopic.id)}
                      >
                        {subtopic.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Collapsed toggle button */}
      {isCollapsed && (
        <button 
          className="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          title="Expand sidebar"
          aria-label="Expand sidebar"
        />
      )}
    </aside>
  );
};

export default Sidebar; 