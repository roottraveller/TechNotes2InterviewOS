import React from 'react';
import { Book, Code, Target, Star, Layers, Settings, Cloud, Server, Github } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-hero">
          <h1>About InterviewOS</h1>
          <p className="hero-subtitle">
            Your comprehensive technical interview preparation platform
          </p>
        </div>

        <div className="about-section">
          <h2>What is InterviewOS?</h2>
          <p>
            InterviewOS is a comprehensive platform designed to help software
            engineers, developers, and technical professionals prepare for
            technical interviews. It provides structured, organized content
            covering all major technical domains commonly tested in software
            engineering interviews.
          </p>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <div className="features-list">
            <FeatureCard
              icon={<Book size={24} />}
              title="Structured Learning Path"
              description="Topics are organized in a logical hierarchy, making it easy to navigate from basics to advanced concepts."
            />
            <FeatureCard
              icon={<Code size={24} />}
              title="Code Examples & Implementations"
              description="Real-world code examples with detailed explanations to help you understand practical applications."
            />
            <FeatureCard
              icon={<Target size={24} />}
              title="Interview-Focused Content"
              description="Content specifically curated for technical interviews, including common questions and patterns."
            />
            <FeatureCard
              icon={<Star size={24} />}
              title="Comprehensive Coverage"
              description="From system design to data structures, algorithms to cloud computing - all essential topics covered."
            />
          </div>
        </div>

        <div className="about-section">
          <h2>Topics Covered</h2>
          <div className="topics-grid">
            <TopicCategory
              icon={<Layers size={24} />}
              title="System Design"
              topics={[
                'Scalability & Load Balancing',
                'Caching Strategies',
                'Database Design',
                'Microservices Architecture',
              ]}
            />
            <TopicCategory
              icon={<Settings size={24} />}
              title="Data Structures & Algorithms"
              topics={[
                'Arrays, Linked Lists, Trees',
                'Sorting & Searching',
                'Graph Algorithms',
                'Dynamic Programming',
              ]}
            />
            <TopicCategory
              icon={<Server size={24} />}
              title="Networking & Security"
              topics={[
                'HTTP/HTTPS Protocols',
                'Authentication & Authorization',
                'Encryption & Hashing',
                'Network Security',
              ]}
            />
            <TopicCategory
              icon={<Cloud size={24} />}
              title="Cloud & DevOps"
              topics={[
                'AWS Services',
                'Docker & Kubernetes',
                'CI/CD Pipelines',
                'Monitoring & Logging',
              ]}
            />
          </div>
        </div>

        <div className="about-section">
          <h2>About the Creator</h2>
          <div className="creator-info">
            <div className="creator-content">
              <h3>rimaurya</h3>
              <p>
                A passionate software engineer dedicated to helping fellow
                developers succeed in their technical interviews. This platform
                represents a comprehensive collection of knowledge and experience
                gained through years of preparing for and conducting technical
                interviews.
              </p>
              <a
                href="https://github.com/roottraveller"
                target="_blank"
                rel="noopener noreferrer"
                className="creator-link"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-item">
    <div className="feature-icon">{icon}</div>
    <div className="feature-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const TopicCategory = ({ icon, title, topics }) => (
  <div className="topic-category">
    <div className="topic-category-header">
      <div className="topic-category-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
    <ul>
      {topics.map((topic, index) => (
        <li key={index}>{topic}</li>
      ))}
    </ul>
  </div>
);

export default About; 