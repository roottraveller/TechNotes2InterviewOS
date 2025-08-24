import React, { useEffect } from 'react';
import { Phone, MessageSquare, FileText, Check } from 'lucide-react';
import './BookMockInterview.css';

const BookMockInterview = () => {
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.add('standalone-page');
    }
    return () => {
      if (mainContent) {
        mainContent.classList.remove('standalone-page');
      }
    };
  }, []);

  return (
    <div className="book-mock-interview-container">
      <div className="book-mock-interview-header">
        <h1>Book Your Mock Interview</h1>
        <p className="book-mock-interview-subtitle">
          Get personalized feedback and improve your interview skills with
          experienced professionals
        </p>
      </div>

      <div className="book-mock-interview-content">
        <div className="book-mock-interview-features">
          <FeatureCard
            icon={<Phone size={24} />}
            title="1-on-1 Sessions"
            description="Personalized mock interviews with industry experts"
          />
          <FeatureCard
            icon={<MessageSquare size={24} />}
            title="Real-time Feedback"
            description="Get instant feedback on your performance and areas to improve"
          />
          <FeatureCard
            icon={<FileText size={24} />}
            title="Detailed Reports"
            description="Receive comprehensive reports with improvement suggestions"
          />
        </div>

        <div className="book-mock-interview-pricing">
          <h2>Interview Packages</h2>
          <div className="pricing-cards">
            <PricingCard
              title="Technical Interview"
              price="$49"
              duration="60 minutes session"
              features={[
                'Coding challenges',
                'System design questions',
                'Technical deep-dive',
                'Code review session',
                'Detailed feedback report',
              ]}
            />
            <PricingCard
              title="Full Interview Simulation"
              price="$79"
              duration="90 minutes session"
              features={[
                'Behavioral questions',
                'Technical challenges',
                'System design',
                'Culture fit assessment',
                'Salary negotiation tips',
                'Follow-up email template',
              ]}
              popular
            />
            <PricingCard
              title="Behavioral Interview"
              price="$39"
              duration="45 minutes session"
              features={[
                'STAR method practice',
                'Leadership scenarios',
                'Conflict resolution',
                'Communication skills',
                'Performance feedback',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const PricingCard = ({ title, price, duration, features, popular }) => (
  <div className={`pricing-card ${popular ? 'popular' : ''}`}>
    {popular && <div className="popular-badge">Most Popular</div>}
    <div className="pricing-header">
      <h3>{title}</h3>
      <div className="price">{price}</div>
      <p>{duration}</p>
    </div>
    <ul className="pricing-features">
      {features.map((feature, index) => (
        <li key={index}>
          <Check size={16} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className="pricing-button">Book Now</button>
  </div>
);

export default BookMockInterview;
