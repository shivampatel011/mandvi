import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import styles from './MagneticButton.module.css';

const MagneticButton = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const btn = buttonRef.current;
    
    const xTo = gsap.quickTo(btn, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(btn, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`${styles.magneticButton} ${className}`} onClick={onClick}>
      <span className={styles.text}>{children}</span>
      <span className={styles.iconWrap}>
        <ArrowRight size={16} />
      </span>
    </button>
  );
};

export default MagneticButton;
