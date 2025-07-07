import React, { useState, useCallback, useEffect } from 'react';
import './ResizablePanel.css';

const ResizablePanel = ({ 
  leftPanel, 
  rightPanel, 
  leftWidth, 
  onResize, 
  minLeftWidth = 200, 
  maxLeftWidth = 600 
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(leftWidth);

  const handleMouseDown = useCallback((e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(leftWidth);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [leftWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const newWidth = Math.max(
      minLeftWidth,
      Math.min(maxLeftWidth, startWidth + deltaX)
    );
    
    onResize(newWidth);
  }, [isResizing, startX, startWidth, onResize, minLeftWidth, maxLeftWidth]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="resizable-panel">
      <div 
        className="panel-left" 
        style={{ width: `${leftWidth}px` }}
      >
        {leftPanel}
      </div>
      
      <div 
        className={`panel-divider ${isResizing ? 'resizing' : ''}`}
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            onResize(Math.max(minLeftWidth, leftWidth - 10));
          } else if (e.key === 'ArrowRight') {
            onResize(Math.min(maxLeftWidth, leftWidth + 10));
          }
        }}
      >
        <div className="divider-handle">
          <div className="divider-line"></div>
          <div className="divider-line"></div>
          <div className="divider-line"></div>
        </div>
      </div>
      
      <div className="panel-right">
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanel; 