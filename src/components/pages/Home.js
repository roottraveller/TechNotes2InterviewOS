import React from 'react';
import { BookOpen, Code, Target, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import './Home.css';

const Home = () => {

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to InterviewOS</h1>
          <p>Your comprehensive platform for technical interview preparation</p>
          <button className="cta-button">Start Learning</button>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <BookOpen size={32} />
          </div>
          <h3>Structured Learning</h3>
          <p>
            Organized topics covering all major technical domains with clear
            learning paths.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <Code size={32} />
          </div>
          <h3>Code Examples</h3>
          <p>
            Real-world examples with detailed explanations and runnable code
            snippets.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <Target size={32} />
          </div>
          <h3>Interview Ready</h3>
          <p>
            Content designed specifically for technical interviews, focusing on
            common questions and strategies.
          </p>
        </div>
      </div>

      <div className="start-learning-button-section">
        <button className="cta-button">Start Learning</button>
      </div>

      <div className="getting-started-section">
        <h2>Getting Started</h2>
        <p>
          Select a topic from the sidebar to begin exploring technical concepts
          and interview questions. Our structured content will guide you through
          your preparation journey.
        </p>
      </div>

      {/* Footer within content area */}
      <footer className="home-footer">
        {/* Full Width Line Above Footer */}
        <div className="footer-top-divider"></div>
        
        <div className="footer-content">
          {/* First Row */}
          <div className="footer-row-1">
            <div className="footer-left-group">
              <div className="footer-brand">
                <BookOpen size={20} className="brand-icon" />
              </div>
              <div className="footer-text-group">
                <span className="footer-tagline">
                  Made with <span className="heart">❤️</span> by <span className="author">rimaurya</span>
                </span>
                <span className="footer-version">
                  Version 1.0.0 • Last updated: 2025
                </span>
              </div>
            </div>
            <div className="footer-about">
              <a href="/about" className="footer-link">About</a>
            </div>
          </div>

          {/* Footer Width Line Above Copyright */}
          <div className="footer-divider"></div>

          {/* Second Row */}
          <div className="footer-row-2">
            <div className="copyright">
              © 2025 InterviewOS. All rights reserved.
            </div>
            <div className="social-links">
              <a href="https://github.com/roottraveller" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com/in/rimaurya" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com/rimaurya_dev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="mailto:rimaurya.dev@gmail.com" className="social-link" aria-label="Email">
                <Mail size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
