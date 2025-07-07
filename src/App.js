import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';
import About from './components/About';
import AllTopics from './components/AllTopics';
import { appData } from './config';
import './App.css';

// Use HashRouter for GitHub Pages deployment, BrowserRouter for local development
const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

// Main App Component with Router
function AppContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const navigate = useNavigate();

  // Check if device is mobile
  const checkMobile = () => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    // Set initial state
    setIsMobile(checkMobile());

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Load sidebar state
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsSidebarCollapsed(savedSidebarState === 'true');
    }
  }, []);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  const handleTopicSelect = (topicId) => {
    if (topicId) {
      navigate(`/topic/${topicId}`);
    } else {
      // If topicId is null (deselecting), go back to home
      navigate('/');
    }
  };

  const handleSubtopicSelect = (subtopicId) => {
    // Find the topic that contains this subtopic
    const parentTopic = appData.topics.find(topic => 
      topic.subtopics.some(subtopic => subtopic.id === subtopicId)
    );
    
    if (parentTopic) {
      navigate(`/topic/${parentTopic.id}/${subtopicId}`);
    }
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
    navigate('/');
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleAboutClick = () => {
    navigate('/about');
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleTopicsClick = () => {
    navigate('/topics');
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Component for the home route
  const HomeRoute = () => {
    const getSelectedContent = () => {
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
                <div class="stat-number">${appData.topics.reduce((total, topic) => total + topic.subtopics.length, 0)}</div>
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
            topics={appData.topics}
            selectedTopic={null}
            selectedSubtopic={null}
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
    );
  };

  // Component for the topic route
  const TopicRoute = () => {
    const { topicId, subtopicId } = useParams();
    
    const getSelectedContent = () => {
      if (!topicId || !subtopicId) {
        return {
          title: 'Select a Subtopic',
          content: `
            <div class="select-subtopic-content">
              <h2>Select a Subtopic</h2>
              <p>Choose a subtopic from the sidebar to view its content.</p>
            </div>
          `
        };
      }

      const topic = appData.topics.find(t => t.id === topicId);
      const subtopic = topic?.subtopics.find(s => s.id === subtopicId);
      
      return subtopic || { title: 'Content not found', content: '<p>The requested content could not be found.</p>' };
    };

    return isMobile ? (
      // Mobile layout
      <>
        <Sidebar
          topics={appData.topics}
          selectedTopic={topicId}
          selectedSubtopic={subtopicId}
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
            topics={appData.topics}
            selectedTopic={topicId}
            selectedSubtopic={subtopicId}
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
    );
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
        isMobile={isMobile}
        selectedTopic={null}
        selectedSubtopic={null}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onHomeClick={handleHomeClick}
        onAboutClick={handleAboutClick}
        onTopicsClick={handleTopicsClick}
      />
      <div className="app-body">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/topics" element={
            <AllTopics 
              onTopicSelect={handleTopicSelect}
              onSubtopicSelect={handleSubtopicSelect}
            />
          } />
          <Route path="/topic/:topicId/:subtopicId?" element={<TopicRoute />} />
          <Route path="/" element={<HomeRoute />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 