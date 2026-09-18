import React, { useEffect, useState } from 'react';
import { useLenis } from './hooks/useLenis';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import MandviIntro from './components/MandviIntro';
import SoundOfMandvi from './components/SoundOfMandvi';
import TheCircle from './components/TheCircle';
import Nights from './components/Nights';
import Instagram from './components/Instagram';
import Footer from './components/Footer';

function App() {
  
  useLenis();

  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <>
      <Navbar introComplete={introComplete} />

      <main>
        <CinematicIntro />
        <Hero onHeroEnd={handleIntroComplete} />
        <MandviIntro />

        <SoundOfMandvi />
        <TheCircle />
        <Nights />
        <Instagram />
      </main>

      <Footer />
    </>
  );
}

export default App;
