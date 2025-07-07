import React from 'react';
import { Sidebar, ContentPanel } from '../components';
import { appData } from '../config';
import { APP_CONFIG, getTotalSubtopicsCount } from '../utils';

/**
 * Home Route Component
 * Displays the welcome page with application overview
 */
const HomeRoute = ({
  isMobile,
  isSidebarCollapsed,
  isMobileMenuOpen,
  onTopicSelect,
  onSubtopicSelect,
  onMobileMenuClose,
  onToggleCollapse
}) => {
  const getWelcomeContent = () => {
    return {
      title: `Welcome to ${APP_CONFIG.NAME}`,
      content: `
        <div class="welcome-content">
          <div class="welcome-hero">
            <h1>Welcome to ${APP_CONFIG.NAME}</h1>
            <p class="hero-subtitle">${APP_CONFIG.DESCRIPTION}</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Structured Learning</h3>
              <p>Organized topics covering all major technical domains</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3>Code Examples</h3>
              <p>Real-world examples with detailed explanations</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3>Interview Ready</h3>
              <p>Content designed specifically for technical interviews</p>
            </div>
          </div>
          
          <div class="getting-started">
            <h2>Getting Started</h2>
            <p>Select a topic from the ${isMobile ? 'menu' : 'sidebar'} to begin exploring technical concepts and interview questions.</p>
            ${!isMobile ? `
            <div class="desktop-tip">
              <div class="tip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p><strong>Desktop Tip:</strong> Use the toggle button to collapse/expand the sidebar for more reading space. The sidebar is ${isSidebarCollapsed ? 'currently collapsed' : 'currently expanded'}.</p>
            </div>
          ` : ''}
          
          <div class="stats-section">
            <div class="stat-item">
              <div class="stat-number">${appData.topics.length}</div>
              <div class="stat-label">Topics</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${getTotalSubtopicsCount(appData.topics)}</div>
              <div class="stat-label">Subtopics</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Free</div>
            </div>
          </div>
        </div>
      `
    };
  };

  return isMobile ? (
    // Mobile layout
    <>
      <Sidebar
        topics={appData.topics}
        selectedTopic={null}
        selectedSubtopic={null}
        onTopicSelect={onTopicSelect}
        onSubtopicSelect={onSubtopicSelect}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />
      <ContentPanel content={getWelcomeContent()} />
    </>
  ) : (
    // Desktop layout with collapsible sidebar
    <div className="desktop-layout">
      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar
          topics={appData.topics}
          selectedTopic={null}
          selectedSubtopic={null}
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
        <ContentPanel content={getWelcomeContent()} />
      </div>
    </div>
  );
};

export default HomeRoute; 