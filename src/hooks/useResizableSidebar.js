import { useState, useEffect, useCallback } from 'react';

const SIDEBAR_WIDTH_KEY = 'interviewos-sidebar-width';
const SIDEBAR_COLLAPSED_KEY = 'interviewos-sidebar-collapsed';
const DEFAULT_SIDEBAR_WIDTH = 280;
const COLLAPSED_SIDEBAR_WIDTH = 60;
const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 400;

export const useResizableSidebar = () => {
  // Initialize collapse state from localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      return saved === 'true';
    }
    return false;
  });

  // Initialize width from localStorage or use default
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
      if (saved) {
        const width = parseInt(saved, 10);
        // Ensure the saved width is within bounds
        if (width >= MIN_SIDEBAR_WIDTH && width <= MAX_SIDEBAR_WIDTH) {
          return width;
        }
      }
    }
    return DEFAULT_SIDEBAR_WIDTH;
  });

  // Store the expanded width when not collapsed
  const [expandedWidth, setExpandedWidth] = useState(sidebarWidth);

  // Save width to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
    }
  }, [sidebarWidth]);

  // Save collapse state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, isCollapsed.toString());
    }
  }, [isCollapsed]);

  // Handle resize with bounds checking
  const handleResize = useCallback((newWidth) => {
    if (!isCollapsed) {
      const constrainedWidth = Math.max(
        MIN_SIDEBAR_WIDTH,
        Math.min(MAX_SIDEBAR_WIDTH, newWidth)
      );
      setSidebarWidth(constrainedWidth);
      setExpandedWidth(constrainedWidth);
    }
  }, [isCollapsed]);

  // Toggle collapse state
  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => {
      const newCollapsed = !prev;
      if (newCollapsed) {
        // Collapsing: store current width and set to collapsed width
        setExpandedWidth(sidebarWidth);
        setSidebarWidth(COLLAPSED_SIDEBAR_WIDTH);
      } else {
        // Expanding: restore previous width
        setSidebarWidth(expandedWidth);
      }
      return newCollapsed;
    });
  }, [sidebarWidth, expandedWidth]);

  // Reset to default width
  const resetWidth = useCallback(() => {
    const newWidth = DEFAULT_SIDEBAR_WIDTH;
    setSidebarWidth(newWidth);
    setExpandedWidth(newWidth);
    setIsCollapsed(false);
  }, []);

  // Get the current effective width (collapsed or expanded)
  const currentWidth = isCollapsed ? COLLAPSED_SIDEBAR_WIDTH : sidebarWidth;

  return {
    sidebarWidth: currentWidth,
    isCollapsed,
    handleResize,
    toggleCollapse,
    resetWidth,
    minWidth: MIN_SIDEBAR_WIDTH,
    maxWidth: MAX_SIDEBAR_WIDTH,
    defaultWidth: DEFAULT_SIDEBAR_WIDTH,
    collapsedWidth: COLLAPSED_SIDEBAR_WIDTH
  };
};
