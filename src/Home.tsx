import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import LoadingScreen from './components/All/loadingScreen'
import Header from './components/All/header'
import Hero from './components/Home/hero'
import Story from './components/Home/story'
import Destination from './components/Home/destination';
import Event from './components/Home/event';
import Footer from './components/Home/footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 5500)
    }
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  
  useGSAP(() => {
    if (hasLoaded) {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,   // Semakin tinggi angka, semakin "berat" efek scroll-nya
        effects: true, // Mengaktifkan efek parallax otomatis
      });

     gsap.utils.toArray('.overlap').forEach((section: any) => {
      const isStorySection = section.id === "story-nonoverlap";

      if(isStorySection) return

      ScrollTrigger.create({
        trigger: section,
        end: '+=100%',
        pin: true,
        scrub: true,
        pinSpacing: false,
        pinType: "transform" // <--- WAJIB ADA agar tidak bentrok dengan ScrollSmoother!
      });
    });

      return () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [hasLoaded]);

  return (
    <>
      {hasLoaded && <Header hasLoaded={hasLoaded} />}
      {!hasLoaded ? <LoadingScreen isLoading={isLoading} onCompleteLoad={() => setHasLoaded(true)} /> : 
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className='overlap'>
            <Hero hasLoaded={hasLoaded}/>
          </div>
          <div id='story-nonoverlap' className='overlap overflow-hidden'>
            <Story hasLoaded={hasLoaded}/>
          </div>
          <div className=''>
            <Destination/>
          </div>
          <div className=''>
            <Event/>
          </div>
          <div className=''>
            <Footer/>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Home
