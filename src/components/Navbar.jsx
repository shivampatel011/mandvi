import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'NIGHTS', href: '#nights' },
  { name: 'GALLERY', href: '#gallery' },
  { name: 'PASSES', href: '#passes' },
  { name: 'LOCATION', href: '#location' }
];

const Navbar = ({ introComplete = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const decorRef1 = useRef(null);
  const decorRef2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    if (!navRef.current) return;
    if (introComplete) {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        onStart: () => {
          navRef.current.style.pointerEvents = 'auto';
        },
      });
    } else {
      gsap.set(navRef.current, {
        opacity: 0,
        y: -20,
        pointerEvents: 'none',
      });
    }
  }, [introComplete]);

  useEffect(() => {
    
    gsap.set(overlayRef.current, { yPercent: -100, display: 'none' });
  }, []);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.to(overlayRef.current, { yPercent: 0, duration: 0.8, ease: 'power4.inOut' });
      
      
      gsap.fromTo([decorRef1.current, decorRef2.current],
        { scale: 0.8, opacity: 0, rotation: (i) => i === 0 ? -30 : 180 },
        { scale: 1, opacity: 0.15, rotation: (i) => i === 0 ? -15 : 165, duration: 1.2, delay: 0.2, ease: 'back.out(1.2)' }
      );

      
      gsap.fromTo(linksRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      setMenuOpen(false);
      
      gsap.to(overlayRef.current, { 
        yPercent: -100, 
        duration: 0.8, 
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' })
      });
    }
  };

  const handleLinkClick = () => {
    if (menuOpen) toggleMenu();
  };

  return (
    <>
      <nav ref={navRef} className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo} onClick={() => window.scrollTo(0,0)}>MANDVI</div>
        
        
        <div className={styles.desktopLinks}>
          <a href="#experience">EXPERIENCE</a>
          <a href="#nights">NIGHTS</a>
          <a href="#gallery">GALLERY</a>
          <a href="#passes">PASSES</a>
          <a href="#location">LOCATION</a>
        </div>

        
        <div className={styles.desktopSocial}>
          <a href="#instagram">INSTAGRAM</a>
        </div>

        
        <div className={styles.mobileToggle} onClick={toggleMenu}>
          MENU
        </div>
      </nav>

      
      <div ref={overlayRef} className={styles.overlay}>
        <div className={styles.overlayPattern}></div>
        
        
        <svg ref={decorRef1} className={`${styles.overlayDecor} ${styles.decorTopLeft}`} viewBox="0 0 100 100" fill="var(--color-gold)">
          <path d="M50 0 C60 30, 80 40, 100 50 C80 60, 60 70, 50 100 C40 70, 20 60, 0 50 C20 40, 40 30, 50 0 Z" />
          <circle cx="50" cy="50" r="10" fill="var(--color-maroon)" stroke="var(--color-gold)" strokeWidth="2" />
        </svg>

        <svg ref={decorRef2} className={`${styles.overlayDecor} ${styles.decorBottomRight}`} viewBox="0 0 100 100" fill="var(--color-gold)">
          <path d="M50 0 C60 30, 80 40, 100 50 C80 60, 60 70, 50 100 C40 70, 20 60, 0 50 C20 40, 40 30, 50 0 Z" />
          <circle cx="50" cy="50" r="10" fill="var(--color-maroon)" stroke="var(--color-gold)" strokeWidth="2" />
        </svg>

        <div className={styles.overlayHeader}>
          <div className={styles.logo}>MANDVI</div>
          <div className={styles.closeBtn} onClick={toggleMenu}>CLOSE</div>
        </div>
        
        <div className={styles.overlayLinks}>
          {navLinks.map((link, index) => (
            <div key={link.name} className={styles.linkWrapper}>
              <a 
                href={link.href} 
                onClick={handleLinkClick} 
                ref={el => linksRef.current[index] = el}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;

