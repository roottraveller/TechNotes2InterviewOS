import React from 'react';
import './ContentPanel.css';

const ContentPanel = ({ content }) => {
  return (
    <div className="content-panel">
      <div className="content-wrapper">
        <h1>{content.title}</h1>
        <div 
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </div>
  );
};

export default ContentPanel; 