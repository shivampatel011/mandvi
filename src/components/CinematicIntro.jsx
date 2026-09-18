import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CinematicIntro.module.css';

gsap.registerPlugin(ScrollTrigger);

const CinematicIntro = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const vignetteRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const cornersRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      
      
      gsap.to(scrollIndicatorRef.current, {
        opacity: 1,
        delay: 1.5,
        duration: 1.5,
        ease: 'power2.out',
      });

      gsap.to(cornersRef.current, {
        opacity: 1,
        delay: 1.2,
        duration: 2,
        stagger: 0.15,
        ease: 'power2.out',
      });

      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', 
          pin: true,
          scrub: prefersReducedMotion ? false : 1.2,
          anticipatePin: 1,
        },
      });

      if (prefersReducedMotion) {
        
        tl.to(sectionRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        });
      } else {
        
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          },
          0
        );

        
        tl.to(
          cornersRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          0
        );

        
        
        
        tl.to(
          imageRef.current,
          {
            scale: 28,
            yPercent: -8,
            transformOrigin: '47% 57%',
            duration: 1,
            ease: 'power1.in',
          },
          0
        );

        
        tl.to(
          vignetteRef.current,
          {
            background:
              'radial-gradient(ellipse at center, rgba(10,5,5,0.4) 10%, rgba(10,5,5,0.7) 50%, rgba(10,5,5,0.95) 100%)',
            duration: 0.7,
            ease: 'power2.in',
          },
          0
        );

      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  
  const CornerSVG = () => (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2 L2 20 Q2 2 20 2" />
      <path d="M2 2 L2 12 Q2 2 12 2" opacity="0.5" />
    </svg>
  );

  return (
    <section ref={sectionRef} className={styles.cinematic}>
      <div className={styles.imageContainer}>
        <img
          ref={imageRef}
          src="/images/hero2.jpg"
          alt="Mandvi — માંડવી by રાસલીલા 2026"
          className={styles.heroImage}
          draggable="false"
        />
        <div ref={vignetteRef} className={styles.vignette} />
        <div className={styles.colorWash} />
      </div>

      
      <div
        ref={(el) => (cornersRef.current[0] = el)}
        className={`${styles.cornerDecor} ${styles.topLeft}`}
      >
        <CornerSVG />
      </div>
      <div
        ref={(el) => (cornersRef.current[1] = el)}
        className={`${styles.cornerDecor} ${styles.topRight}`}
      >
        <CornerSVG />
      </div>
      <div
        ref={(el) => (cornersRef.current[2] = el)}
        className={`${styles.cornerDecor} ${styles.bottomLeft}`}
      >
        <CornerSVG />
      </div>
      <div
        ref={(el) => (cornersRef.current[3] = el)}
        className={`${styles.cornerDecor} ${styles.bottomRight}`}
      >
        <CornerSVG />
      </div>

      
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
};

export default CinematicIntro;
