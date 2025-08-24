import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { About, AllTopics, Mentorship, BookMockInterview } from './components';
import { HomeRoute, TopicRoute } from './routes';
import { useResponsive, useTheme, useSidebar, useNavigation } from './hooks';
import { Router } from './utils';
import './App.css';

/**
 * Main App Component
 * Handles routing and global state management
 */
function AppContent() {
  // Custom hooks for state management
  const { isMobile } = useResponsive();
  const { isDarkMode, toggleTheme } = useTheme();
  const { 
    isMobileMenuOpen, 
    closeMobileMenu 
  } = useSidebar();
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  
  // Navigation handlers
  const {
    handleTopicSelect,
    handleSubtopicSelect,
    handleHomeClick,
    handleTopicsClick,
    handleMentorshipClick,
    handleBookMockInterviewClick
  } = useNavigation(closeMobileMenu);

  // Common props for route components
  const routeProps = {
    isMobile,
    isMobileMenuOpen,
    onTopicSelect: handleTopicSelect,
    onSubtopicSelect: handleSubtopicSelect,
    onMobileMenuClose: closeMobileMenu,
    expandedTopics,
    setExpandedTopics,
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header 
        onHomeClick={handleHomeClick}
        onTopicsClick={handleTopicsClick}
        onMentorshipClick={handleMentorshipClick}
        onBookMockInterviewClick={handleBookMockInterviewClick}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<HomeRoute {...routeProps} />} 
          />
          <Route 
            path="/topic/:topicId/:subtopicId?" 
            element={<TopicRoute {...routeProps} />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/topics" 
            element={<AllTopics />} 
          />
          <Route 
            path="/mentorship" 
            element={<Mentorship />} 
          />
          <Route 
            path="/book-mock-interview" 
            element={<BookMockInterview />} 
          />
        </Routes>
      </main>
    </div>
  );
}

/**
 * App Component with Router
 * Wraps the main app content with the appropriate router
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 