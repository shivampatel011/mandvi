import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>MANDVI</h2>
          <p>Ramva Aavo.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4>NAVIGATION</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#nights">Nights</a></li>
              <li><a href="#passes">Passes</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="#">Instagram @mandvi_garba</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
