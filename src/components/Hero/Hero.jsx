import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onHeroEnd }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const decorLineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom 60%',
        once: true,
        onEnter: () => {
          if (onHeroEnd) onHeroEnd();
        },
      });

      if (prefersReducedMotion) return;

      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      
      tl.fromTo(
        decorLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.6, duration: 1, ease: 'power2.out' },
        0
      );

      
      const contentChildren = contentRef.current.children;
      tl.fromTo(
        contentChildren,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
        },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, [onHeroEnd]);

  return (
    <section id="home" ref={heroRef} className={styles.hero}>
      <div ref={contentRef} className={styles.content}>
        <div ref={decorLineRef} className={styles.decorLine} />
        <span className={styles.eyebrow}>Navratri 2025</span>
        <h1 className={styles.title}>MANDVI</h1>
        <p className={styles.subtitle}>Is Not Just A Garba</p>
        <p className={styles.tagline}>રામવા આવો — માંડવી</p>
        <div className={styles.actions}>
          <a href="#experience" className={styles.primaryBtn}>
            Experience Mandvi
          </a>
          <a href="#passes" className={styles.secondaryBtn}>
            Get Passes
          </a>
        </div>
      </div>

      <div className={styles.scrollDown}>
        <span>Explore</span>
        <div className={styles.scrollArrow} />
      </div>
    </section>
  );
};

export default Hero;
