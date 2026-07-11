import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navside from "./story/navside";
import Chapter1 from "./story/chapter1";
import Chapter2 from "./story/chapter2";
import Chapter3 from "./story/chapter3";

gsap.registerPlugin(ScrollTrigger)

type StoryProps = {
    hasLoaded?: boolean;
};

export default function Story({ hasLoaded }: StoryProps) {
    const [activeChapter, setActiveChapter] = useState<number>(1)
    const storyRef = useRef<HTMLDivElement>(null)
    const storyScrollRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (hasLoaded && storyRef.current && storyScrollRef.current){
            const chapters = gsap.utils.toArray('.chapter')
            const endValue = storyScrollRef.current?.scrollWidth 

            const mm = gsap.matchMedia();

            // 1. Logika Khusus Desktop (Layar >= 1024px)
            mm.add("(min-width: 1024px)", () => {
                gsap.to(chapters, {
                    xPercent: -100 * (chapters.length - 1),
                    ease: 'none',
                    scrollTrigger : {
                        trigger: storyRef.current,
                        pin: true, 
                        pinType: "transform",
                        scrub: 1,
                        snap: 1 / (chapters.length - 1),
                        end: () => `+=${endValue}`,
                        invalidateOnRefresh: true
                    }
                });
            });

            return () => {
                mm.revert();
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }
    }, { dependencies: [hasLoaded], scope: storyRef })

    return (
        <div 
            id="story"
            ref={storyRef}
            className="w-full h-auto lg:h-svh flex flex-col lg:flex-row bg-background overflow-visible lg:overflow-hidden"
        >
            <Navside activeChapter={activeChapter}/>
            <div 
                id="story-wrapper"
                ref={storyScrollRef}
                className="flex flex-col lg:flex-row lg:flex-nowrap p-0 lg:pl-24 w-full h-auto lg:h-full"
            >
            {hasLoaded && 
                <>
                    <Chapter1 onStartChapter={() => setActiveChapter(1)}/>
                    <Chapter2 onStartChapter={() => setActiveChapter(2)}/>
                    <Chapter3 onStartChapter={() => setActiveChapter(3)}/>
                </>
            }
            </div>
        </div>
    )
}