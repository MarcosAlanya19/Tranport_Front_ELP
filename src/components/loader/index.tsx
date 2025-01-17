import React from 'react';
import './loader.css';

export const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};
