import React from 'react';
import styles from './CircleElements.module.css';

const CircleDecoration = ({ angle, type = 'diya', radius = 50 }) => {
  const radians = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(radians);
  const y = 50 + radius * Math.sin(radians);

  const renderIcon = () => {
    if (type === 'diya') {
      return (
        <svg viewBox="0 0 24 24" fill="var(--color-gold)" width="16" height="16">
          <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" />
          <path d="M4 14C4 16.2 9.8 18 12 18C14.2 18 20 16.2 20 14" stroke="var(--color-gold)" strokeWidth="2" fill="none"/>
        </svg>
      );
    }
    if (type === 'dot') {
      return <div className={styles.dot}></div>;
    }
    if (type === 'text') {
      return <span className={styles.smallText}>ગર્બા</span>;
    }
  };

  return (
    <div 
      className={styles.decoration} 
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`
      }}
    >
      {renderIcon()}
    </div>
  );
};

export default CircleDecoration;
