import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { About, AllTopics } from './components';
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
    isSidebarCollapsed, 
    isMobileMenuOpen, 
    toggleSidebar, 
    toggleMobileMenu, 
    closeMobileMenu 
  } = useSidebar();
  
  // Navigation handlers
  const {
    handleTopicSelect,
    handleSubtopicSelect,
    handleHomeClick,
    handleAboutClick,
    handleTopicsClick
  } = useNavigation(closeMobileMenu);

  // Common props for route components
  const routeProps = {
    isMobile,
    isSidebarCollapsed,
    isMobileMenuOpen,
    onTopicSelect: handleTopicSelect,
    onSubtopicSelect: handleSubtopicSelect,
    onMobileMenuClose: closeMobileMenu,
    onToggleCollapse: toggleSidebar
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        onHomeClick={handleHomeClick}
        onAboutClick={handleAboutClick}
        onTopicsClick={handleTopicsClick}
        onThemeToggle={toggleTheme}
        onMobileMenuToggle={toggleMobileMenu}
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarToggle={toggleSidebar}
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