import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from '../../assets/slg-ai.webp'
import Logo from '../../assets/mataraman-logo-light.webp'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
    hasLoaded?: boolean;
    onActiveSection: (data: string) => void 
};

export default function Hero({ hasLoaded, onActiveSection }: HeroProps) {
    const heroRef = useRef(null)

    useGSAP(() => {
        if (hasLoaded) {
            const tl = gsap.timeline({
                delay: 0.5,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top 25%',
                    end: 'center top',
                    toggleActions: 'play reverse restart reverse',
                    onEnter: () => onActiveSection('hero'),
                    onEnterBack : () => onActiveSection('hero')
                }
            });
            tl.fromTo('.outer-circle', 
                { scale: 0, opacity: 0, }, 
                { scale: 1, opacity: 1, duration: 1.4,  ease: "power4.out" }
            )
            .fromTo('.inner-circle', 
                { scale: 3, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 
                "-=0.8" // Overlap dengan lingkaran luar
            )
            .fromTo('.animate-item',
                { opacity: 0, y: 30, scale: 0.9 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.2 }, 
                "-=0.5"
            )
        }
    }, { scope: heroRef, dependencies: [hasLoaded] });

    return (
        <div ref={heroRef} id="hero" className="relative w-full h-svh flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img src={Background} alt="Background" className="w-full h-full object-cover" />
            </div>

            <div className="absolute z-[1] inset-0 w-full h-full mix-blend-multiply bg-black/40 flex items-center justify-center">
                <div className="outer-circle h-[68vh] md:h-[72vh] lg:h-[92vh] aspect-square bg-white rounded-full flex items-center justify-center">
                    <div className="h-[65%] aspect-square rounded-full bg-black/40 flex flex-col items-center justify-between p-8" />
                </div>
            </div>

            <div className="absolute inset-0 z-[2] w-full h-full flex items-center justify-center">
                <div className="h-[68vh] md:h-[72vh] lg:h-[92vh] aspect-square rounded-full flex items-center justify-center"> 
                <div className="inner-circle h-[65%] aspect-square rounded-full bg-black/40 flex flex-col items-center justify-between p-8" >
                    <div className='animate-item w-36 md:w-40 lg:w-48 aspect-square bg-background rounded-full flex items-center justify-center'>
                        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className='animate-item flex flex-col gap-2 lg:gap-4 items-center justify-center'>
                        <h2 className='font-javamango text-white text-xl md:text-3xl lg:text-4xl text-center'>Keindahan Budaya dan Sosial di Tanah</h2>
                        <h1 className="tracking-widest font-javamango text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center">Kerajaan Kadiri</h1>
                    </div>
                    <button className='animate-item border border-solid border-2 border-white p-2 md:p-4 rounded-full text-white text-lg md:text-2xl hover:text-primary hover:border-primary hover:bg-white'>Jelajahi</button>
                </div>
                </div>
            </div>
            
        </div>
    )
}