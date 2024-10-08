import React, { useEffect, useState } from 'react';
import './Overlay.css';

const Overlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [allowInteraction, setAllowInteraction] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setIsVisible(false); 
      }, 500);

      setAllowInteraction(true);

      return () => clearTimeout(removeTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`overlay ${fadeOut ? 'fade-out' : ''}`} style={{ pointerEvents: allowInteraction ? 'none' : 'auto' }}>
      <h1 style={{ fontFamily: 'sans-serif' }}>Jer Thorp</h1>
      <h2 style={{ fontFamily: 'sans-serif' }}>A Virtual Exhibition</h2>
    </div>
  );
};

export default Overlay;
