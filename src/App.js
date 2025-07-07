import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';
import { techTopicsData } from './data/techTopicsData';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('interviewos-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Load sidebar collapse preference from localStorage
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('interviewos-sidebar-collapsed');
    if (savedSidebarState) {
      setIsSidebarCollapsed(savedSidebarState === 'true');
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('interviewos-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Save sidebar collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('interviewos-sidebar-collapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(null);
  };

  const handleSubtopicSelect = (subtopicId) => {
    setSelectedSubtopic(subtopicId);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleHomeClick = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const getSelectedContent = () => {
    if (!selectedTopic || !selectedSubtopic) {
      return {
        title: 'Welcome to InterviewOS',
        content: `
          <div class="welcome-content">
            <div class="welcome-hero">
              <h1>Welcome to InterviewOS</h1>
              <p class="hero-subtitle">Your comprehensive platform for technical interview preparation</p>
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
              <p>Select a topic from the ${isMobile ? 'menu' : isSidebarCollapsed ? 'collapsed sidebar (click the arrow to expand)' : 'sidebar'} to begin your learning journey:</p>
              <ul class="steps-list">
                <li><strong>Browse</strong> through different technical domains</li>
                <li><strong>Expand</strong> topics to see detailed subtopics</li>
                <li><strong>Click</strong> on any subtopic to view comprehensive notes</li>
                <li><strong>Practice</strong> with code examples and explanations</li>
              </ul>
            </div>
            
            ${isMobile ? `
              <div class="mobile-tip">
                <div class="tip-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <p><strong>Mobile Tip:</strong> Use the menu button in the top-right corner to access all topics and navigation options.</p>
              </div>
            ` : `
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
            `}
            
            <div class="stats-section">
              <div class="stat-item">
                <div class="stat-number">${techTopicsData.topics.length}</div>
                <div class="stat-label">Topics</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${techTopicsData.topics.reduce((total, topic) => total + topic.subtopics.length, 0)}</div>
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
    }

    const topic = techTopicsData.topics.find(t => t.id === selectedTopic);
    const subtopic = topic?.subtopics.find(s => s.id === selectedSubtopic);
    
    return subtopic || { title: 'Content not found', content: '<p>The requested content could not be found.</p>' };
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
        isMobile={isMobile}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onHomeClick={handleHomeClick}
      />
      <div className="app-body">
        {isMobile ? (
          // Mobile layout
          <>
            <Sidebar
              topics={techTopicsData.topics}
              selectedTopic={selectedTopic}
              selectedSubtopic={selectedSubtopic}
              onTopicSelect={handleTopicSelect}
              onSubtopicSelect={handleSubtopicSelect}
              isMobile={isMobile}
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileMenuClose={handleMobileMenuClose}
            />
            <ContentPanel content={getSelectedContent()} />
          </>
        ) : (
          // Desktop layout with collapsible sidebar
          <div className="desktop-layout">
            <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
              <Sidebar
                topics={techTopicsData.topics}
                selectedTopic={selectedTopic}
                selectedSubtopic={selectedSubtopic}
                onTopicSelect={handleTopicSelect}
                onSubtopicSelect={handleSubtopicSelect}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={handleMobileMenuClose}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={handleSidebarToggle}
              />
            </div>
            <div className="content-container-wrapper">
              <ContentPanel content={getSelectedContent()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 