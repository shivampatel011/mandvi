import React from 'react';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle, gujarati, center = false }) => {
  return (
    <div className={`${styles.sectionTitle} ${center ? styles.center : ''}`}>
      {gujarati && <span className={`${styles.gujarati} gujarati-text`}>{gujarati}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
