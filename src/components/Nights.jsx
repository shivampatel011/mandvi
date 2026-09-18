import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTitle from './SectionTitle';
import { nights } from '../data/nights';
import styles from './Nights.module.css';

const Nights = () => {
  const [activeNight, setActiveNight] = useState(nights[0]);
  const detailsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(detailsRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeNight]);

  return (
    <section className={`section-padding ${styles.nightsSection}`} id="nights">
      <SectionTitle 
        title="THE NIGHTS" 
        subtitle="Nine nights of devotion, rhythm, and celebration. Explore the timeline of Mandvi."
        center={false}
      />

      <div className={styles.container}>
        <div className={styles.timeline}>
          {nights.map((night) => (
            <button 
              key={night.id}
              className={`${styles.timelineBtn} ${activeNight.id === night.id ? styles.active : ''}`}
              onClick={() => setActiveNight(night)}
            >
              {night.night}
            </button>
          ))}
        </div>

        <div className={styles.detailsWrapper}>
          <div className={styles.details} ref={detailsRef}>
            <h3 className={styles.theme}>{activeNight.theme}</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>DATE</span>
                <span className={styles.value}>{activeNight.date}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>TIME</span>
                <span className={styles.value}>{activeNight.time}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>ARTIST</span>
                <span className={styles.value}>{activeNight.artist}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>SPECIAL ATTRACTION</span>
                <span className={styles.value}>{activeNight.attraction}</span>
              </div>
            </div>
            
            <div className={styles.status}>
              {activeNight.passAvailable ? (
                <span className={styles.available}>PASSES AVAILABLE</span>
              ) : (
                <span className={styles.soldout}>SOLD OUT</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nights;
