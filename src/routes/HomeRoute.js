import React from 'react';
import { Sidebar, ContentPanel, Home } from '../components';
import { ResizablePanel } from '../components/ui';
import { useResizableSidebar, useResponsive } from '../hooks';
import { appData } from '../config';

const HomeRoute = ({
  isMobile,
  onTopicSelect,
  onSubtopicSelect,
  expandedTopics,
  setExpandedTopics,
}) => {
  const { sidebarWidth, isCollapsed, handleResize, toggleCollapse, minWidth, maxWidth } = useResizableSidebar();

  return isMobile ? (
    // Mobile layout - no resizing
    <div className="layout-container">
      <Sidebar
        topics={appData.topics}
        selectedTopic={null}
        selectedSubtopic={null}
        onTopicSelect={onTopicSelect}
        onSubtopicSelect={onSubtopicSelect}
        expandedTopics={expandedTopics}
        setExpandedTopics={setExpandedTopics}
        isMobile={isMobile}
        isCollapsed={false}
        onToggleCollapse={() => {}}
      />
      <ContentPanel>
        <Home />
      </ContentPanel>
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
          selectedTopic={null}
          selectedSubtopic={null}
          onTopicSelect={onTopicSelect}
          onSubtopicSelect={onSubtopicSelect}
          expandedTopics={expandedTopics}
          setExpandedTopics={setExpandedTopics}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />
      }
      rightPanel={
        <ContentPanel>
          <Home />
        </ContentPanel>
      }
    />
  );
};

export default HomeRoute;