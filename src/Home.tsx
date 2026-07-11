import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { BookOpen, Compass, Home as HomeIcon, CalendarDays } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


import LoadingScreen from './components/All/loadingScreen'
import Header from './components/All/header'
import Hero from './components/Home/hero'
import Story from './components/Home/story'
import Destination from './components/Home/destination';
import Event from './components/Home/event';
import Footer from './components/Home/footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

type MenuItem = {
    name: string;
    icon: LucideIcon;
    href: string
};

const menuItems: MenuItem[] = [
    { name: 'Hero', icon: HomeIcon, href:'#hero' },
    { name: 'Story', icon: BookOpen , href:'#story'},
    { name: 'Destinations', icon: Compass, href:'#destination' },
    { name: 'Events', icon: CalendarDays, href:'#event' },
    { name: 'Footer', icon: CalendarDays, href:'#footer' },
];

function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selected, setSelected] = useState<MenuItem>(menuItems[0]);

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
        smooth: 2,  
        effects: true, 
      });

    // gsap.utils.toArray('.overlap').forEach((section: any) => {

    //   ScrollTrigger.create({
    //     trigger: section,
    //     end: '+=100%',
    //     pin: true,
    //     scrub: true,
    //     pinSpacing: false,
    //   });
    // });

      return () => {
        smoother.kill();
        // ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [hasLoaded]);

  const onActiveSection = (input : string) => {
    const selected : MenuItem | undefined = menuItems.find(item => item.href === `#${input}`)
    if (selected) {
      setSelected(selected)
    } else {
      setSelected(menuItems[0])
    }
  }

  return (
    <>
      {hasLoaded && <Header hasLoaded={hasLoaded} isSectionMenu={true} selected={selected} setSelected={setSelected} menuItems={menuItems} />}
      {!hasLoaded ? <LoadingScreen isLoading={isLoading} onCompleteLoad={() => setHasLoaded(true)} /> : 
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className='overlap'>
            <Hero hasLoaded={hasLoaded} onActiveSection={onActiveSection}/>
          </div>
          <div id='story-nonoverlap' className='overlap overflow-hidden'>
            <Story hasLoaded={hasLoaded} onActiveSection={onActiveSection}/>
          </div>
          <div className='child-section'>
            <Destination onActiveSection={onActiveSection}/>
          </div>
          <div className='child-section'>
            <Event onActiveSection={onActiveSection}/>
          </div>
          <div className='child-section'>
            <Footer onActiveSection={onActiveSection}/>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Home
