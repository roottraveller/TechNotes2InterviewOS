import React from 'react';
import { Users, FileText, BarChart, MessageSquare, Mail, Calendar, HelpCircle } from 'lucide-react';
import './Mentorship.css';

const Mentorship = () => {
  return (
    <div className="mentorship-container">
      <div className="mentorship-header">
        <h1>Technical Interview Mentorship</h1>
        <p className="mentorship-subtitle">
          Get personalized guidance and support for your technical interview
          journey
        </p>
      </div>

      <div className="mentorship-content">
        <div className="mentorship-section">
          <SectionHeader
            icon={<Users size={28} />}
            title="Why Choose Mentorship?"
          />
          <p>
            Technical interviews can be challenging, but with the right
            guidance, you can master them. Our mentorship program provides
            personalized support to help you succeed in your career goals.
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
          <SectionHeader
            icon={<FileText size={28} />}
            title="What We Cover"
          />
          <div className="topics-grid">
            <TopicCard
              title="Data Structures & Algorithms"
              description="Master the fundamentals with hands-on practice and optimization techniques."
            />
            <TopicCard
              title="System Design"
              description="Learn to design scalable systems and tackle complex architectural problems."
            />
            <TopicCard
              title="Behavioral Interviews"
              description="Develop compelling stories and master the STAR method for behavioral questions."
            />
            <TopicCard
              title="Technical Communication"
              description="Improve your ability to explain complex technical concepts clearly."
            />
          </div>
        </div>

        <div className="mentorship-section">
          <SectionHeader
            icon={<BarChart size={28} />}
            title="Success Stories"
          />
          <div className="testimonials">
            <Testimonial
              quote="The mentorship program helped me land my dream job at a top tech company. The personalized guidance made all the difference!"
              author="Sarah K., Software Engineer"
            />
            <Testimonial
              quote="I went from failing technical interviews to getting multiple offers. The mock interviews were incredibly valuable."
              author="Mike R., Full Stack Developer"
            />
          </div>
        </div>

        <div className="mentorship-section cta-section">
          <SectionHeader
            icon={<MessageSquare size={28} />}
            title="Ready to Get Started?"
          />
          <p>
            Take the first step towards your technical interview success. Our
            mentors are here to help you achieve your goals.
          </p>
          <div className="contact-options">
            <a
              href="mailto:mentorship@interviewos.com"
              className="contact-button primary"
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </a>
            <a
              href="https://calendly.com/interviewos-mentorship"
              className="contact-button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar size={18} />
              <span>Schedule a Call</span>
            </a>
          </div>
        </div>

        <div className="mentorship-section">
          <SectionHeader
            icon={<HelpCircle size={28} />}
            title="Frequently Asked Questions"
          />
          <div className="faq-list">
            <FAQItem
              question="How long does the mentorship program last?"
              answer="Our mentorship programs are flexible and can range from 4-12 weeks depending on your goals and availability. We work with you to create a timeline that fits your schedule."
            />
            <FAQItem
              question="What's the cost of mentorship?"
              answer="We offer various pricing tiers to accommodate different needs and budgets. Contact us for detailed pricing information and to discuss which option works best for you."
            />
            <FAQItem
              question="Do you offer group mentorship sessions?"
              answer="Yes! We offer both one-on-one and small group mentorship sessions. Group sessions can be a cost-effective way to learn alongside peers facing similar challenges."
            />
            <FAQItem
              question="What if I'm a complete beginner?"
              answer="No problem! Our mentors work with candidates at all levels, from complete beginners to experienced engineers looking to level up. We'll assess your current skills and create a personalized plan."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="section-header">
    <div className="section-icon">{icon}</div>
    <h2>{title}</h2>
  </div>
);

const TopicCard = ({ title, description }) => (
  <div className="topic-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="testimonial">
    <p>"{quote}"</p>
    <div className="testimonial-author">- {author}</div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <details className="faq-item">
    <summary>{question}</summary>
    <p>{answer}</p>
  </details>
);

export default Mentorship; 