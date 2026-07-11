import React, { useState, useRef } from 'react';
import { ChevronDown, BookOpen, Compass, Home, CalendarDays, Menu, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

type HeaderProps = {
  hasLoaded?: boolean;
  isSectionMenu?: boolean
};

type MenuItem = {
    name: string;
    icon: LucideIcon;
};

type PageMenuItem = {
    name: string;
    href: string;
};

// Data untuk Menu Section (Tengah)
const menuItems: MenuItem[] = [
    { name: 'Hero', icon: Home },
    { name: 'Story', icon: BookOpen },
    { name: 'Destinations', icon: Compass },
    { name: 'Events', icon: CalendarDays },
];

// Data untuk Page Menu (Kiri)
const pageMenuItems: PageMenuItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Destination', href: '/destination' },
    { name: 'Event & Article', href: '/event' },
    { name: 'Trip Plan', href: '/trip-plan' },
];

export default function Header({ hasLoaded, isSectionMenu }: HeaderProps) {
     
    const [isOpen, setIsOpen] = useState(false);
    const [isPageMenuOpen, setIsPageMenuOpen] = useState(false); // State untuk menu navigasi kiri
    const [selected, setSelected] = useState(menuItems[0]);
    const [language, setLanguage] = useState(false); // false = ID, true = EN

    const iconLeftRef = useRef<SVGSVGElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const textItemRef = useRef<HTMLSpanElement>(null);
    const sliderRef = useRef<HTMLSpanElement>(null);

    const handleItemSelect = (item: MenuItem, isFromProp = false) => {
        if (item.name === selected.name && !isFromProp) {
            setIsOpen(false);
            return;
        }

        const tl = gsap.timeline();

        if (iconLeftRef.current && arrowRef.current && textItemRef.current) {
            tl.to([iconLeftRef.current], {
                rotationY: 180,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0) 
            .to([iconLeftRef.current], {
                rotationY: 0, 
                duration: 0.5,
                ease: "power2.inOut"
            }, 0.5)
            .to(textItemRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            }, 0.2)
            .to(arrowRef.current, {
                rotation: isFromProp ? 0 : 180, 
                duration: 0.3,
                ease: "power2.inOut"
            }, 0)
        }

        setTimeout(() => {
            setSelected(item);
            if (!isFromProp) setIsOpen(false); 
            
            if (textItemRef.current) {
                gsap.fromTo(textItemRef.current, 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
                );
            }
        }, 250); 
    };

    const dropdownVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -15,
            scale: 0.95,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.05,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    const toggleLanguage = () => {
        const nextLang = !language;
        setLanguage(nextLang);

        gsap.to(sliderRef.current, {
            x: nextLang ? "100%" : "0%", 
            duration: 0.4,
            ease: "power3.out"
        });
    };

    useGSAP(() => {
        if (hasLoaded) {
            gsap.fromTo("#header",
                {
                    opacity: 0,
                    y: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    delay: 2
                },
            )
        } 
    }, [hasLoaded, {scope: 'header'}])

    return (
        // Menggunakan flex justify-between agar responsif di mobile tanpa harus memaksakan grid-cols
        <header id='header' className="fixed top-0 left-0 w-full h-20 py-4 px-4 md:px-8 lg:px-16 xl:px-24 z-[999] flex items-center justify-between gap-2">
            
            {/* 1. KIRI: Menu Navigasi Utama (Halaman) */}
            <div className="relative z-50 flex-shrink-0">
                <button 
                    onClick={() => setIsPageMenuOpen(!isPageMenuOpen)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-md shadow-lg shadow-black/20 text-accent hover:opacity-80 transition-all duration-300"
                >
                    {isPageMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
                <AnimatePresence mode="wait">
                    {isPageMenuOpen && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute top-16 left-0 w-56 md:w-64 py-3 bg-white/90 border border-white/40 backdrop-blur-md shadow-xl shadow-black/20 rounded-2xl overflow-hidden"
                        >
                            {pageMenuItems.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    variants={itemVariants}
                                    className="flex w-full items-center px-6 py-3 text-accent hover:bg-background/80 hover:text-primary transition-all duration-300 group"
                                >
                                    <span className="text-xl font-bold font-playfair-display tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                        {item.name}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 2. TENGAH: Menu Navigasi Section */}
            {/* Menggunakan absolut centering agar presisi di tengah pada desktop, dan flex-1 di mobile */}
            <div className={`${isSectionMenu ? 'hidden md:flex' : 'hidden'} flex-1 md:flex-none justify-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0`}>
                <nav className="flex items-center justify-between h-12 w-48 md:w-64 px-4 md:px-8 rounded-full bg-white/20 border border-white/40 backdrop-blur-md shadow-lg shadow-black/20 relative">  
                    <button 
                        onClick={() => {
                            setIsOpen(!isOpen)
                            gsap.to(arrowRef.current, { rotate: !isOpen ? 180 : 0, duration: 0.3 });
                        }}
                        className="flex w-full justify-between items-center gap-2 md:gap-3 text-accent transition-all hover:opacity-80"
                    >
                        <selected.icon ref={iconLeftRef} className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                        <span ref={textItemRef} className="text-lg md:text-2xl font-bold font-playfair-display truncate whitespace-nowrap">
                            {selected.name}
                        </span>
                        <ChevronDown ref={arrowRef} className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="absolute top-16 left-0 w-full py-2 bg-white/90 border border-white/40 backdrop-blur-md shadow-xl shadow-black/20 rounded-2xl overflow-hidden"
                            >
                                {menuItems.map((item) => (
                                    <motion.button
                                        key={item.name}
                                        variants={itemVariants}
                                        onClick={() => handleItemSelect(item)}
                                        className="flex w-full items-center gap-4 px-5 py-3 text-accent hover:bg-background/80 hover:text-primary transition-all duration-300"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-xl md:text-2xl font-bold font-playfair-display">{item.name}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>          
                </nav>
            </div>

            {/* 3. KANAN: Toggle Language */}
            <button 
                className="flex-shrink-0 flex items-center h-12 w-20 md:w-24 rounded-full bg-white/20 border border-white/40 backdrop-blur-md shadow-lg shadow-black/20 overflow-hidden relative"
                onClick={toggleLanguage}
            >
                <span 
                    ref={sliderRef}
                    className="absolute left-0 h-full w-1/2 rounded-full bg-accent z-0" 
                />
                
                <span className={`relative w-1/2 text-center text-xs md:text-sm font-bold font-mono transition-colors duration-300 ${!language ? 'text-white' : 'text-accent'}`}>
                    ID
                </span>
                
                <span className={`relative w-1/2 text-center text-xs md:text-sm font-bold font-mono transition-colors duration-300 ${language ? 'text-white' : 'text-accent'}`}>
                    EN
                </span>
            </button>
        </header>
    )
}