import React from 'react';
import styles from './CircleElements.module.css';

const CircleDancer = ({ angle, radius = 50 }) => {
  const radians = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(radians);
  const y = 50 + radius * Math.sin(radians);

  return (
    <div 
      className={styles.dancer} 
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <circle cx="12" cy="4" r="3" />
        <path d="M12 8c-3 0-5 2-5 5v3h2v-3h6v3h2v-3c0-3-2-5-5-5z" />
        <path d="M7 11c-1.5 0-2.5-1-2.5-2.5S5.5 6 7 6s2.5 1 2.5 2.5S8.5 11 7 11z" />
        <path d="M17 11c-1.5 0-2.5-1-2.5-2.5S15.5 6 17 6s2.5 1 2.5 2.5S18.5 11 17 11z" />
        <path d="M10 16l-2 6h2l1.5-4.5L13 22h2l-2-6" />
      </svg>
    </div>
  );
};

export default CircleDancer;
