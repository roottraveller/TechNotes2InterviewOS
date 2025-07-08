import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar, ContentPanel } from '../components';
import { appData } from '../config';

/**
 * Topic Route Component
 * Displays topic and subtopic content based on URL parameters
 */
const TopicRoute = ({
  isMobile,
  isSidebarCollapsed,
  isMobileMenuOpen,
  onTopicSelect,
  onSubtopicSelect,
  onMobileMenuClose,
  onToggleCollapse
}) => {
  const { topicId, subtopicId } = useParams();

  const getSelectedContent = () => {
    if (!topicId) {
      return {
        title: 'Topic Not Found',
        content: '<div class="error-message">The requested topic could not be found.</div>'
      };
    }

    const selectedTopic = appData.topics.find(topic => topic.id === topicId);
    if (!selectedTopic) {
      return {
        title: 'Topic Not Found',
        content: '<div class="error-message">The requested topic could not be found.</div>'
      };
    }

    if (subtopicId) {
      const selectedSubtopic = selectedTopic.subtopics.find(subtopic => subtopic.id === subtopicId);
      if (!selectedSubtopic) {
        return {
          title: 'Subtopic Not Found',
          content: '<div class="error-message">The requested subtopic could not be found.</div>'
        };
      }
      return {
        title: selectedSubtopic.title,
        content: selectedSubtopic.content
      };
    }

    // If no subtopic is selected, show the first subtopic or topic overview
    if (selectedTopic.subtopics.length > 0) {
      return {
        title: selectedTopic.subtopics[0].title,
        content: selectedTopic.subtopics[0].content
      };
    }

    return {
      title: selectedTopic.title,
      content: '<div class="topic-overview">Select a subtopic to view its content.</div>'
    };
  };

  return isMobile ? (
    // Mobile layout
    <div className="mobile-layout">
      <Sidebar
        topics={appData.topics}
        selectedTopic={topicId}
        selectedSubtopic={subtopicId}
        onTopicSelect={onTopicSelect}
        onSubtopicSelect={onSubtopicSelect}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />
      <div className="mobile-content">
        <ContentPanel content={getSelectedContent()} />
      </div>
    </div>
  ) : (
    // Desktop layout with collapsible sidebar
    <div className="desktop-layout">
      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar
          topics={appData.topics}
          selectedTopic={topicId}
          selectedSubtopic={subtopicId}
          onTopicSelect={onTopicSelect}
          onSubtopicSelect={onSubtopicSelect}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </div>
      <div className="content-container-wrapper">
        <ContentPanel content={getSelectedContent()} />
      </div>
    </div>
  );
};

export default TopicRoute; 