import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar, ContentPanel } from '../components';
import { ResizablePanel } from '../components/ui';
import { useResizableSidebar } from '../hooks';
import { appData } from '../config';

/**
 * Topic Route Component
 * Displays topic and subtopic content based on URL parameters
 */
const TopicRoute = ({
  isMobile,
  isMobileMenuOpen,
  onTopicSelect,
  onSubtopicSelect,
  onMobileMenuClose,
  expandedTopics,
  setExpandedTopics
}) => {
  const { topicId, subtopicId } = useParams();
  const { sidebarWidth, isCollapsed, handleResize, toggleCollapse, minWidth, maxWidth } = useResizableSidebar();

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
    // Mobile layout - no resizing
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
        expandedTopics={expandedTopics}
        setExpandedTopics={setExpandedTopics}
        isCollapsed={false}
        onToggleCollapse={() => {}}
        onSearchChange={() => {}}
      />
      <div className="mobile-content">
        <ContentPanel content={getSelectedContent()} />
      </div>
    </div>
  ) : (
    // Desktop/Tablet layout - with resizable sidebar
    <ResizablePanel
      leftWidth={sidebarWidth}
      onResize={handleResize}
      minLeftWidth={minWidth}
      maxLeftWidth={maxWidth}
      isCollapsed={isCollapsed}
      leftPanel={
        <Sidebar
          topics={appData.topics}
          selectedTopic={topicId}
          selectedSubtopic={subtopicId}
          onTopicSelect={onTopicSelect}
          onSubtopicSelect={onSubtopicSelect}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
          expandedTopics={expandedTopics}
          setExpandedTopics={setExpandedTopics}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          onSearchChange={() => {}}
        />
      }
      rightPanel={
        <ContentPanel content={getSelectedContent()} />
      }
    />
  );
};

export default TopicRoute; 