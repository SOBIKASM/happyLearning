import React, { useState, useEffect } from 'react';
import './FloatingSearch.css';

const FloatingSearch = ({ value, onChange, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating search after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="floating-search-container">
      <div className="floating-search-bar">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Search..."}
          autoFocus
        />
      </div>
    </div>
  );
};

export default FloatingSearch;
