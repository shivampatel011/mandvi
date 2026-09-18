import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MandviIntro.module.css';

gsap.registerPlugin(ScrollTrigger);

const MandviIntro = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const phrasesRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: prefersReducedMotion ? false : 1,
          pin: true,
        }
      });

      tl.to(titleRef.current, { opacity: 0, y: prefersReducedMotion ? 0 : -50, duration: 1, ease: "power2.inOut" });

      const phrases = phrasesRef.current.children;
      Array.from(phrases).forEach((phrase, i) => {
        tl.fromTo(phrase, 
          { opacity: 0, y: prefersReducedMotion ? 0 : 50, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }
        ).to(phrase, 
          { opacity: 0, y: prefersReducedMotion ? 0 : -50, scale: 1.05, duration: 1.5, ease: "power2.in" }, 
          "+=0.5"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.introSection}>
      <h2 ref={titleRef} className={styles.mainTitle}>
        MANDVI IS NOT<br/>JUST A GARBA.
      </h2>
      
      <div ref={phrasesRef} className={styles.phrasesContainer}>
        <h3 className={styles.phrase}>The sound of the dhol.</h3>
        <h3 className={styles.phrase}>The call of the shehnai.</h3>
        <h3 className={styles.phrase}>The circle of strangers.</h3>
        <h3 className={styles.phrase}>The rhythm of thousands.</h3>
        <h3 className={`${styles.phrase} ${styles.finalPhrase}`}>Nine nights. One feeling.</h3>
      </div>
    </section>
  );
};

export default MandviIntro;
