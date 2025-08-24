import React, { useEffect, useRef, useState } from 'react';
import './ContentPanel.css';

const ContentPanel = ({ content, children }) => {
  const contentRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);

  // Handle both content prop and children
  const hasContent = content && (content.title || content.content);
  const hasChildren = children;

  const copyToClipboard = async (text, buttonId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(buttonId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(buttonId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all code blocks (both <pre><code> and standalone <code>)
    const preElements = contentRef.current.querySelectorAll('pre');
    
    preElements.forEach((preElement, index) => {
      // Skip if already has a copy button
      if (preElement.querySelector('.copy-btn')) return;

      const codeElement = preElement.querySelector('code');
      const codeText = codeElement ? codeElement.textContent : preElement.textContent;
      
      // Create copy button
      const copyButton = document.createElement('button');
      const buttonId = `copy-btn-${index}`;
      copyButton.className = 'copy-btn';
      copyButton.setAttribute('title', 'Copy code');
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      copyButton.innerHTML = copiedId === buttonId ? 
        '<span class="copy-text">Copied!</span>' : 
        '<svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      
      copyButton.onclick = (e) => {
        e.preventDefault();
        copyToClipboard(codeText, buttonId);
      };

      // Position the button and add fallback class
      preElement.style.position = 'relative';
      preElement.classList.add('has-copy-btn');
      preElement.appendChild(copyButton);
    });

    // Update button states when copiedId changes
    preElements.forEach((preElement, index) => {
      const buttonId = `copy-btn-${index}`;
      const button = preElement.querySelector('.copy-btn');
      if (button) {
        button.innerHTML = copiedId === buttonId ? 
          '<span class="copy-text">Copied!</span>' : 
          '<svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1"></path></svg>';
      }
    });
  }, [content, children, copiedId]);

  // Early return if neither content nor children are available (after hooks)
  if (!hasContent && !hasChildren) {
    return (
      <div className="content-panel">
        <div className="content-wrapper">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-panel">
      <div className="content-wrapper" ref={contentRef}>
        {hasChildren ? (
          // Render children (for Home route)
          children
        ) : (
          // Render content prop (for Topic routes)
          <>
            {content.title && <h1>{content.title}</h1>}
            {content.content && (
              <div 
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentPanel; 