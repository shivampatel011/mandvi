import React from 'react';
import { instagramPosts } from '../data/instagram';
import styles from './Instagram.module.css';

const Instagram = () => {
  return (
    <section className={styles.instagramSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.decorLine} />
          <h2 className={styles.heading}>MANDVI ON INSTAGRAM</h2>
          <a href="#" className={styles.handle}>@mandvi_garba</a>
        </div>

        <div className={styles.grid}>
          {instagramPosts.map((post) => (
            <a key={post.id} href={post.link} className={styles.post} target="_blank" rel="noopener noreferrer">
              <img src={post.url} alt="Instagram Post" className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>VIEW ON INSTAGRAM</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
