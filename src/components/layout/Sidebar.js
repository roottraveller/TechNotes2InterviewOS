import React from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Network,
} from 'lucide-react';
import './Sidebar.css';

const topicIcons = {
  'Must know Acronyms': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">ACRO</text>
    </svg>
  ),
  'Must know Terms': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">TERMS</text>
    </svg>
  ),
  'System Design HLD': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">HLD</text>
    </svg>
  ),
  'System Design LLD': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">LLD</text>
    </svg>
  ),
  'Java Quick Reference': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">JAVA</text>
    </svg>
  ),
  'Kafka & Zookeeper': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">KZ</text>
    </svg>
  ),
  RabbitMQ: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">RMQ</text>
    </svg>
  ),
  'Redis Cache': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">REDIS</text>
    </svg>
  ),
  AWS: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">AWS</text>
    </svg>
  ),
  // Selected Kubernetes icon (Option 5 - Circle with K8s text)
  'Kubernetes (K8s)': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">K8s</text>
    </svg>
  ),
  // Docker Icon - Final selection (DOM)
  'Docker & Container': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">DOM</text>
    </svg>
  ),
  // Aerospike Icon - Default
  'Aerospike': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">A</text>
    </svg>
  ),
  // Additional Icons with Custom Text
  'Memcached': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">MEM</text>
    </svg>
  ),
  'MongoDB': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">MONGO</text>
    </svg>
  ),
  'Neo4J': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">Neo4J</text>
    </svg>
  ),
  'MySQL & SQL': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">MySQL</text>
    </svg>
  ),
  'Cassandra & HBase': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="white" stroke="currentColor" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">C&H</text>
    </svg>
  ),
  default: <Network size={20} />,
};

const Sidebar = ({
  topics,
  selectedTopic,
  selectedSubtopic,
  onTopicSelect,
  onSubtopicSelect,
  expandedTopics,
  setExpandedTopics,
  isCollapsed,
  onToggleCollapse,
}) => {
  const handleTopicClick = (topic) => {
    // If topic has only one subtopic, navigate directly to it
    if (topic.subtopics.length === 1) {
      onSubtopicSelect(topic.subtopics[0].id, topic.id);
      return;
    }
    
    // If topic has multiple subtopics, toggle expansion
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topic.id)) {
        newSet.delete(topic.id);
      } else {
        newSet.add(topic.id);
      }
      return newSet;
    });
    onTopicSelect(topic.id);
  };

  const handleSubtopicClick = (subtopicId, topicId) => {
    onSubtopicSelect(subtopicId, topicId);
  };

  const getTopicIcon = (title) => topicIcons[title] || topicIcons.default;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span className="topics-label">TOPICS</span>}
        <button 
          className="collapse-toggle"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <div className="sidebar-content">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-section">
            <button
              className={`topic-button ${selectedTopic === topic.id ? 'selected' : ''}`}
              onClick={() => handleTopicClick(topic)}
              aria-expanded={topic.subtopics.length > 1 ? expandedTopics.has(topic.id) : undefined}
              title={isCollapsed ? topic.title : undefined}
            >
              <span className="topic-icon">{getTopicIcon(topic.title)}</span>
              {!isCollapsed && (
                <>
                  <span className="topic-title">{topic.title}</span>
                  {topic.subtopics.length > 1 && (
                    <>
                      <span className="topic-count">{topic.subtopics.length}</span>
                      <span
                        className={`topic-arrow ${
                          expandedTopics.has(topic.id) ? 'expanded' : ''
                        }`}
                      >
                        <ChevronDown size={16} />
                      </span>
                    </>
                  )}
                </>
              )}
            </button>
            {!isCollapsed && topic.subtopics.length > 1 && expandedTopics.has(topic.id) && (
              <div className="subtopics">
                {topic.subtopics.map((subtopic) => (
                  <button
                    key={subtopic.id}
                    className={`subtopic-button ${
                      selectedSubtopic === subtopic.id ? 'selected' : ''
                    }`}
                    onClick={() => handleSubtopicClick(subtopic.id, topic.id)}
                  >
                    {subtopic.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;