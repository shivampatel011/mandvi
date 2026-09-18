import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircleDancer from './CircleDancer';
import CircleDecoration from './CircleDecoration';
import styles from './TheCircle.module.css';

gsap.registerPlugin(ScrollTrigger);

const TheCircle = () => {
  const sectionRef = useRef(null);
  const circleContainerRef = useRef(null);
  const centerTextRef = useRef(null);
  const imageRef = useRef(null);
  const finalTextRef = useRef(null);
  const bgTransitionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const m = prefersReducedMotion ? 0 : 1; 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: prefersReducedMotion ? false : 1,
          pin: true,
        }
      });

      
      tl.to(bgTransitionRef.current, {
        opacity: 1,
        duration: 2 * m,
        ease: "none"
      }, 0);

      
      tl.to(circleContainerRef.current, {
        rotation: 360 * m,
        scale: prefersReducedMotion ? 1 : 1.15,
        duration: 6 * m,
        ease: "none"
      }, 0);

      
      tl.to(centerTextRef.current, {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.9,
        duration: 1 * m,
        ease: "power2.inOut"
      }, 0.5 * m);

      
      tl.fromTo(imageRef.current, 
        { opacity: 0, scale: prefersReducedMotion ? 1 : 0.7, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, scale: 1, clipPath: 'circle(50% at 50% 50%)', duration: 2 * m, ease: "power2.out" },
        1.5 * m
      );

      
      tl.fromTo(finalTextRef.current,
        { opacity: 0, y: 40 * m },
        { opacity: 1, y: 0, duration: 1.5 * m, ease: "power3.out" },
        3 * m
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  
  const dancers = Array.from({ length: 12 }).map((_, i) => i * 30);
  const diyas = Array.from({ length: 12 }).map((_, i) => i * 30 + 15);
  const dots = Array.from({ length: 24 }).map((_, i) => i * 15 + 7.5);
  const texts = [0, 90, 180, 270];

  return (
    <section id="the-circle" ref={sectionRef} className={styles.section}>
      <div ref={bgTransitionRef} className={styles.bgTransition}></div>
      
      <div className={styles.wrapper}>
        
        
        <div ref={circleContainerRef} className={styles.circleContainer}>
          
          <div className={styles.innerRing}></div>
          <div className={styles.outerRing}></div>

          
          {dancers.map((angle) => (
            <CircleDancer key={`dancer-${angle}`} angle={angle} radius={46} />
          ))}

          
          {diyas.map((angle) => (
            <CircleDecoration key={`diya-${angle}`} angle={angle} type="diya" radius={52} />
          ))}
          {dots.map((angle) => (
            <CircleDecoration key={`dot-${angle}`} angle={angle} type="dot" radius={55} />
          ))}
          {texts.map((angle) => (
            <CircleDecoration key={`text-${angle}`} angle={angle} type="text" radius={38} />
          ))}

          
          <img 
            ref={imageRef}
            src={`${import.meta.env.BASE_URL}images/top.webp`} 
            alt="Garba Circle" 
            className={styles.centerImage} 
            loading="lazy"
          />
        </div>

        
        <div ref={centerTextRef} className={styles.centerTextContainer}>
          <h2 className={styles.centerTitle}>THE<br/>CIRCLE</h2>
        </div>

        
        <div ref={finalTextRef} className={styles.finalTextContainer}>
          <h2 className={styles.finalTitle}>EVERY STEP<br/>BRINGS YOU CLOSER.</h2>
        </div>
        
      </div>
    </section>
  );
};

export default TheCircle;
