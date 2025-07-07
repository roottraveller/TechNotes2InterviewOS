import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-hero">
          <h1>About InterviewOS</h1>
          <p className="hero-subtitle">Your comprehensive technical interview preparation platform</p>
        </div>

        <div className="about-section">
          <h2>What is InterviewOS?</h2>
          <p>
            InterviewOS is a comprehensive platform designed to help software engineers, developers, and 
            technical professionals prepare for technical interviews. It provides structured, organized 
            content covering all major technical domains commonly tested in software engineering interviews.
          </p>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Structured Learning Path</h3>
                <p>Topics are organized in a logical hierarchy, making it easy to navigate from basics to advanced concepts.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Code Examples & Implementations</h3>
                <p>Real-world code examples with detailed explanations to help you understand practical applications.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Interview-Focused Content</h3>
                <p>Content specifically curated for technical interviews, including common questions and patterns.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Comprehensive Coverage</h3>
                <p>From system design to data structures, algorithms to cloud computing - all essential topics covered.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Topics Covered</h2>
          <div className="topics-grid">
            <div className="topic-category">
              <h3>System Design</h3>
              <ul>
                <li>Scalability & Load Balancing</li>
                <li>Caching Strategies</li>
                <li>Database Design</li>
                <li>Microservices Architecture</li>
              </ul>
            </div>
            <div className="topic-category">
              <h3>Data Structures & Algorithms</h3>
              <ul>
                <li>Arrays, Linked Lists, Trees</li>
                <li>Sorting & Searching</li>
                <li>Graph Algorithms</li>
                <li>Dynamic Programming</li>
              </ul>
            </div>
            <div className="topic-category">
              <h3>Networking & Security</h3>
              <ul>
                <li>HTTP/HTTPS Protocols</li>
                <li>Authentication & Authorization</li>
                <li>Encryption & Hashing</li>
                <li>Network Security</li>
              </ul>
            </div>
            <div className="topic-category">
              <h3>Cloud & DevOps</h3>
              <ul>
                <li>AWS Services</li>
                <li>Docker & Kubernetes</li>
                <li>CI/CD Pipelines</li>
                <li>Monitoring & Logging</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Built With</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-name">React</span>
              <span className="tech-version">18.2.0</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Modern CSS</span>
              <span className="tech-version">CSS Variables & Grid</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Responsive Design</span>
              <span className="tech-version">Mobile-First Approach</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Dark Mode</span>
              <span className="tech-version">System Preference Support</span>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>About the Creator</h2>
          <div className="creator-info">
            <div className="creator-content">
              <h3>rimaurya</h3>
              <p>
                A passionate software engineer dedicated to helping fellow developers succeed in their 
                technical interviews. This platform represents a comprehensive collection of knowledge 
                and experience gained through years of preparing for and conducting technical interviews.
              </p>
              <div className="creator-links">
                <a href="https://github.com/roottraveller" target="_blank" rel="noopener noreferrer" className="creator-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Contributing</h2>
          <p>
            This is an open-source project and contributions are welcome! If you find any errors, 
            have suggestions for improvements, or want to add new topics, please feel free to 
            contribute to the project.
          </p>
        </div>

        <div className="about-footer">
          <p>
            <strong>InterviewOS</strong> - Made with ❤️ by rimaurya
          </p>
          <p className="version-info">Version 1.0.0 • Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default About; 