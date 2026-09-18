import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SoundOfMandvi.module.css';

gsap.registerPlugin(ScrollTrigger);

const sounds = [
  { name: 'DHOL', gujarati: 'ઢોલ', desc: 'The heartbeat that starts everything' },
  { name: 'SHEHNAI', gujarati: 'શરણાઈ', desc: 'The call that draws you in' },
  { name: 'GARBO', gujarati: 'ગરબો', desc: 'The sacred rhythm of devotion' },
  { name: 'TAALI', gujarati: 'તાળી', desc: 'The clap that unites thousands' },
  { name: 'DANCE', gujarati: 'નૃત્ય', desc: 'The movement that sets you free' },
];

const SoundOfMandvi = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) return;

      
      gsap.fromTo(
        [lineRef.current, headingRef.current, subtitleRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      
      itemsRef.current.forEach((item, i) => {
        const line = item.querySelector('[data-line]');
        const number = item.querySelector('[data-number]');
        const name = item.querySelector('[data-name]');
        const gujarati = item.querySelector('[data-gujarati]');
        const desc = item.querySelector('[data-desc]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
        });

        
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' },
          0
        );

        
        tl.fromTo(
          number,
          { opacity: 0, x: -20 },
          { opacity: 0.4, x: 0, duration: 0.6, ease: 'power2.out' },
          0.1
        );

        
        tl.fromTo(
          name,
          { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
          },
          0.15 + i * 0.03
        );

        
        tl.fromTo(
          gujarati,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.3 + i * 0.03
        );

        
        tl.fromTo(
          desc,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.4 + i * 0.03
        );
      });

      
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.soundSection}>
      
      <div className={styles.bgPattern} />

      <div className={styles.container}>
        
        <div className={styles.header}>
          <div ref={lineRef} className={styles.decorLine} />
          <h2 ref={headingRef} className={styles.heading}>
            THE SOUND OF MANDVI
          </h2>
          <p ref={subtitleRef} className={styles.subtitle}>
            Five elements that define the night
          </p>
        </div>

        
        <div className={styles.list}>
          {sounds.map((sound, i) => (
            <div
              key={sound.name}
              ref={(el) => (itemsRef.current[i] = el)}
              className={styles.soundItem}
            >
              <div data-line className={styles.itemLine} />
              <div className={styles.itemContent}>
                <span data-number className={styles.number}>
                  0{i + 1}
                </span>
                <div className={styles.textGroup}>
                  <h3 data-name className={styles.name}>
                    {sound.name}
                  </h3>
                  <span data-gujarati className={styles.gujarati}>
                    {sound.gujarati}
                  </span>
                </div>
                <p data-desc className={styles.desc}>
                  {sound.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoundOfMandvi;
