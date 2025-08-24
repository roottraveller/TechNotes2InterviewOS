import React from 'react';
import { Search, BookOpen, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({
  onTopicsClick,
  onMentorshipClick,
  onBookMockInterviewClick,
  onThemeToggle,
  isDarkMode,
  onHomeClick,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <button className="header-brand" onClick={onHomeClick}>
          <BookOpen size={20} className="brand-icon" />
          <div className="brand-text">
            <h1 className="brand-title">InterviewOS</h1>
            <span className="brand-subtitle">Made with ❤️ by roottraveller</span>
          </div>
        </button>
        
        <div className="header-actions">
          <nav className="header-nav-right">
            <button className="nav-link" onClick={onTopicsClick}>
              All Topics
            </button>
            <button className="nav-link" onClick={onMentorshipClick}>
              Mentorship
            </button>
            <button className="nav-link" onClick={onBookMockInterviewClick}>
              Book Mock Interview
            </button>
          </nav>
          
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="search-input"
            />
          </div>
          
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;