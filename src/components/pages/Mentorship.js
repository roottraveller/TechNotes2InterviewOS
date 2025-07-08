import React from 'react';
import './Mentorship.css';

const Mentorship = () => {
  return (
    <div className="mentorship-page">
      <div className="mentorship-container">
        <div className="mentorship-header">
          <h1>Technical Interview Mentorship</h1>
          <p className="mentorship-subtitle">
            Get personalized guidance and support for your technical interview journey
          </p>
        </div>

        <div className="mentorship-content">
          <div className="mentorship-section">
            <div className="section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="m22 21-3-3"></path>
                <path d="m19 18 3-3"></path>
              </svg>
            </div>
            <h2>Why Choose Mentorship?</h2>
            <p>
              Technical interviews can be challenging, but with the right guidance, you can master them. 
              Our mentorship program provides personalized support to help you succeed in your career goals.
            </p>
            <ul className="benefits-list">
              <li>One-on-one guidance from experienced engineers</li>
              <li>Personalized study plans based on your goals</li>
              <li>Mock interview sessions with real-time feedback</li>
              <li>Industry insights and career advice</li>
              <li>Resume and portfolio review</li>
            </ul>
          </div>

          <div className="mentorship-section">
            <div className="section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h2>What We Cover</h2>
            <div className="topics-grid">
              <div className="topic-card">
                <h3>Data Structures & Algorithms</h3>
                <p>Master the fundamentals with hands-on practice and optimization techniques.</p>
              </div>
              <div className="topic-card">
                <h3>System Design</h3>
                <p>Learn to design scalable systems and tackle complex architectural problems.</p>
              </div>
              <div className="topic-card">
                <h3>Behavioral Interviews</h3>
                <p>Develop compelling stories and master the STAR method for behavioral questions.</p>
              </div>
              <div className="topic-card">
                <h3>Technical Communication</h3>
                <p>Improve your ability to explain complex technical concepts clearly.</p>
              </div>
            </div>
          </div>

          <div className="mentorship-section">
            <div className="section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2>Success Stories</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>
                  "The mentorship program helped me land my dream job at a top tech company. 
                  The personalized guidance made all the difference!"
                </p>
                <div className="testimonial-author">- Sarah K., Software Engineer</div>
              </div>
              <div className="testimonial">
                <p>
                  "I went from failing technical interviews to getting multiple offers. 
                  The mock interviews were incredibly valuable."
                </p>
                <div className="testimonial-author">- Mike R., Full Stack Developer</div>
              </div>
            </div>
          </div>

          <div className="mentorship-section cta-section">
            <div className="section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2>Ready to Get Started?</h2>
            <p>
              Take the first step towards your technical interview success. Our mentors are here to help you achieve your goals.
            </p>
            <div className="contact-options">
              <a href="mailto:mentorship@interviewos.com" className="contact-button primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Contact Us
              </a>
              <a href="https://calendly.com/interviewos-mentorship" className="contact-button secondary" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Schedule a Call
              </a>
            </div>
          </div>

          <div className="mentorship-section">
            <div className="section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>How long does the mentorship program last?</summary>
                <p>Our mentorship programs are flexible and can range from 4-12 weeks depending on your goals and availability. We work with you to create a timeline that fits your schedule.</p>
              </details>
              <details className="faq-item">
                <summary>What's the cost of mentorship?</summary>
                <p>We offer various pricing tiers to accommodate different needs and budgets. Contact us for detailed pricing information and to discuss which option works best for you.</p>
              </details>
              <details className="faq-item">
                <summary>Do you offer group mentorship sessions?</summary>
                <p>Yes! We offer both one-on-one and small group mentorship sessions. Group sessions can be a cost-effective way to learn alongside peers facing similar challenges.</p>
              </details>
              <details className="faq-item">
                <summary>What if I'm a complete beginner?</summary>
                <p>No problem! Our mentors work with candidates at all levels, from complete beginners to experienced engineers looking to level up. We'll assess your current skills and create a personalized plan.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship; 