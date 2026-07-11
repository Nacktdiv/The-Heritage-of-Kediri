// import React, { useRef } from 'react'
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import background from '../../../assets/ramalan-jangkajayabaya.webp'
// import prasastiNgantang from '../../../assets/prasasti-ngantang.webp'
// import presiden from '../../../assets/gus-dur-lengser.webp'

// gsap.registerPlugin(ScrollTrigger);

// type Chapter2Props = {
//     onStartChapter : () => void
// }


// export default function Chapter2 ({onStartChapter} : Chapter2Props) {

//     const containerRef = useRef<HTMLDivElement | null>(null);
//     // const contentRef = useRef(null);
//     const bgRef = useRef<HTMLDivElement | null>(null);

//     useGSAP(() => {
//         const container = containerRef.current;
//         const bg = bgRef.current;

//         const startAmount = (document.querySelector('.chapter') as HTMLElement)?.offsetLeft || 0;

//         if (!container) return;

//         // ================= 1. ANIMASI INTRO TEXT & ELEMEN (SCROLLTRIGGER) =================
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 markers: true,
//                 trigger: ".chapter", 
//                 start: () => {
//                     return `top+=${window.innerWidth} top+=${startAmount}`
//                 },
//                 end: () => `+=${2 * window.innerWidth}`,
//                 toggleActions: "play none none reverse",
//                 invalidateOnRefresh: true,
//                 onEnter: () => {
//                     onStartChapter()
//                 }
//             }
//         });

//         // Efek staggered fade-in untuk elemen-elemen di dalam grid
//         tl.fromTo('.animate-ch2-title', 
//             { opacity: 0, y: 50 }, 
//             { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
//         )
//         .fromTo('.animate-ch2-line', 
//             { scaleX: 0, opacity: 0 }, 
//             { scaleX: 1, opacity: 0.3, duration: 0.8, ease: "power2.inOut" },
//             "-=0.6"
//         )
//         .fromTo('.animate-ch2-img1', 
//             { opacity: 0, y: 30, scale: 0.95 }, 
//             { opacity: 0.8, y: 0, scale: 1, duration: 1, ease: "power3.out" },
//             "-=0.4"
//         )
//         .fromTo('.animate-ch2-text', 
//             { opacity: 0, y: 30 }, 
//             { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
//             "-=0.8"
//         )
//         .fromTo('.animate-ch2-funfact', 
//             { opacity: 0, x: 30 }, 
//             { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
//             "-=0.8"
//         );

//         // ================= 2. ANIMASI MOUSE MOVE PARALLAX =================
//         const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
//         const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });

//         const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
//         const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

//         const handleMouseMove = (e : MouseEvent) => {
//             const { clientX, clientY } = e;
//             const { innerWidth, innerHeight } = window;

//             const centerX = innerWidth / 2;
//             const centerY = innerHeight / 2;

//             const moveXContent = -(clientX - centerX) / 100 
//             const moveYContent = -(clientY - centerY) / 100;

//             const moveXBg = (clientX - centerX) / 100;
//             const moveYBg = (clientY - centerY) / 100;

//             xToContent(moveXContent);
//             yToContent(moveYContent);
            
//             if (bg) {
//                 xToBg(moveXBg);
//                 yToBg(moveYBg);
//             }
//         };

//         container.addEventListener("mousemove", handleMouseMove);

//         return () => {
//             container.removeEventListener("mousemove", handleMouseMove);
//         };
//     }, { scope: containerRef });

//     return (
//         <section 
//             ref={containerRef}
//             className="chapter flex-shrink-0 relative w-[calc(100svw-96px)] h-svh self-end bg-background grid grid-cols-3 gap-16 py-4 md:py-8 lg:py-24 px-4 md:px-8 lg:px-40 justify-center items-center"
//         >
//             <div 
//                 className={"absolute inset-0 bg-cover bg-center opacity-20"}
//                 style={{ backgroundImage: `url(${background})` }}
//                 ref={bgRef}
//             />

//             <div className='flex flex-col h-full justify-between'>
//                 <div className='flex flex-col'>
//                     <h3 className='animate-ch2-title font-playfair-display font-bold text-7xl/24 text-end'>Kejayaan Panjalu</h3>
//                     <hr className='animate-ch2-line mt-10 mx-auto w-100' />
//                 </div>
//                 <div className='animate-ch2-img1 flex justify-end'>
//                     <img src={prasastiNgantang} alt="prasasti-ngantang" className='h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]'/>
//                 </div>
//             </div>
//             <p className='animate-ch2-text font-playfair-display text-lg/8 text-start self-start'>
//                 Masuk ke tahun 1135 masehi kerajaan Panjalu menuju puncak kejayaan dibawah tampuk kekuasaan Sri Maharaja Mapanji Jayabhaya. 
//                 Melalui Prasasti Ngantang tertanggal 13 April 1135, sang raja mengumandangkan semboyan legendarisnya: "Panjalu Jayati" (Kediri Menang) atas saudaranya, Jenggala. 
//                 Di era inilah Kediri menjadi pusat sastra termegah, tempat Masuk ke tahun 1135 masehi kerajaan Panjalu menuju puncak kejayaan dibawah tampuk kekuasaan Sri Maharaja Mapanji Jayabhaya. 
//                 Melalui Prasasti Ngantang tertanggal 13 April 1135, sang raja mengumandangkan semboyan legendarisnya: "Panjalu Jayati" (Kediri Menang) atas saudaranya, Jenggala. 
//                 Di era inilah Kediri menjadi pusat sastra termegah, tempat di mana Kakawin Bharatayuddha dilahirkan dari ujung pena Empu Sedah dan Empu Panuluh.di mana Kakawin Bharatayuddha dilahirkan dari ujung pena Empu Sedah dan Empu Panuluh.
//             </p>
//             <div className="flex flex-col h-full justify-between items-start z-10">
//                 <div className="flex flex-col gap-10 self-start">
//                     {/* Sub-judul kecil penanda fakta menarik */}
//                     <div className='animate-ch2-funfact gap-2'>
//                         <span className="font-mono text-xs tracking-[0.3em] text-accent font-light uppercase">
//                             Mitos & Kutukan Nusantara
//                         </span>
                        
//                         <h4 className="font-playfair-display font-bold text-4xl text-start">
//                             Kutukan Kali Brantas
//                         </h4>
//                     </div>
                    
//                     <p className="animate-ch2-funfact font-playfair-display text-lg/8 text-start self-start">
//                         Terdapat mitos wingit yang dipercaya hingga era modern: pemimpin tertinggi negara atau 
//                         Presiden RI yang nekat menyeberangi Sungai Brantas dan masuk ke jantung Kota Kediri 
//                         dipercaya akan lengser dari jabatannya dalam waktu singkat akibat kutukan kuno Kartasura.
//                     </p>
//                 </div>

//                 {/* Kontainer Foto di Bagian Bawah dengan Jarak Spacing yang Estetik */}
//                 <div className="animate-ch2-funfact w-full flex flex-col gap-3 mt-12 group">
//                     <div className="w-full h-56 overflow-hidden">
//                         <img 
//                             src={presiden} 
//                             alt="Kunjungan Presiden di Wilayah Timur Kediri" 
//                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
//                         />
//                     </div>
//                     <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1">
//                         * Dokumentasi sejarah KH Abdurrahman Wahid (Gus Dur) usi dilengserkan dari kursi Presiden.
//                     </caption>
//                 </div>
//             </div>

//         </section>
//     )
    
// }

import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import background from '../../../assets/ramalan-jangkajayabaya.webp'
import prasastiNgantang from '../../../assets/prasasti-ngantang.webp'
import presiden from '../../../assets/gus-dur-lengser.webp'

gsap.registerPlugin(ScrollTrigger);

type Chapter2Props = {
    onStartChapter : () => void
}

export default function Chapter2 ({onStartChapter} : Chapter2Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const bg = bgRef.current;
        if (!container) return;

        const startAmount = (document.querySelector('.chapter') as HTMLElement)?.offsetLeft || 0;

        const mm = gsap.matchMedia();

        // 1. KONDISI DESKTOP (Layar Besar >= 1024px)
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    markers: false, // Ubah ke true jika ingin debugging lokasimu
                    trigger: container, 
                    start: () => `top+=${window.innerWidth} top+=${startAmount}`,
                    end: () => `+=${2 * window.innerWidth}`,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    onEnter: () => onStartChapter(),
                    onEnterBack: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-ch2-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
              .fromTo('.animate-ch2-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.8, ease: "power2.inOut" }, "-=0.6")
              .fromTo('.animate-ch2-img1', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 0.8, y: 0, scale: 1, duration: 1, ease: "power3.out" }, "-=0.4")
              .fromTo('.animate-ch2-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8")
              .fromTo('.animate-ch2-funfact', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }, "-=0.8");

            // Animasi Parallax Gerakan Mouse
            const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
            const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });
            const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
            const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

            const handleMouseMove = (e : MouseEvent) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const centerX = innerWidth / 2;
                const centerY = innerHeight / 2;

                xToContent(-(clientX - centerX) / 100);
                yToContent(-(clientY - centerY) / 100);
                if (bg) {
                    xToBg((clientX - centerX) / 100);
                    yToBg((clientY - centerY) / 100);
                }
            };

            container.addEventListener("mousemove", handleMouseMove);
            return () => container.removeEventListener("mousemove", handleMouseMove);
        });

        // 2. KONDISI MOBILE & TABLET (< 1024px)
        mm.add("(max-width: 1023px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top center+=200", 
                    toggleActions: "play none none reverse",
                    onEnter: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-ch2-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
              .fromTo('.animate-ch2-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.6 }, "-=0.5")
              .fromTo('.animate-ch2-img1', { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.8 }, "-=0.4")
              .fromTo('.animate-ch2-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
              .fromTo('.animate-ch2-funfact', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            // MODIFIKASI LAYOUT: grid-cols-1 di mobile, grid-cols-3 di desktop besar (lg)
            className="chapter flex-shrink-0 relative w-full lg:w-[calc(100svw-96px)] min-h-screen lg:h-svh self-end bg-background grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 py-12 md:py-20 lg:py-24 px-6 md:px-16 lg:px-40 justify-center items-center overflow-hidden"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${background})` }}
                ref={bgRef}
            />

            {/* KOLOM 1: JUDUL & PRASASTI */}
            {/* Mengganti h-full di mobile agar tidak merusak tinggi baris flex item */}
            <div className='flex flex-col lg:h-full justify-between gap-6 lg:gap-0'>
                <div className='flex flex-col'>
                    <h3 className='animate-ch2-title font-playfair-display font-bold text-4xl md:text-5xl lg:text-7xl/24 text-start lg:text-end'>
                        Kejayaan Panjalu
                    </h3>
                    <hr className='animate-ch2-line mt-4 lg:mt-10 mx-0 lg:mx-auto w-24 lg:w-100 border-accent/40 origin-left lg:origin-center' />
                </div>
                <div className='animate-ch2-img1 flex justify-start lg:justify-end max-h-48 md:max-h-64 lg:max-h-none overflow-hidden rounded shadow-xl'>
                    <img src={prasastiNgantang} alt="prasasti-ngantang" className='w-full lg:w-auto h-full object-cover opacity-80 filter sepia-[0.2]'/>
                </div>
            </div>

            {/* KOLOM 2: DESKRIPSI SEJARAH JAYABHAYA */}
            <p className='animate-ch2-text font-playfair-display text-base/7 md:text-lg/8 text-start self-start '>
                Masuk ke tahun 1135 masehi kerajaan Panjalu menuju puncak kejayaan dibawah tampuk kekuasaan Sri Maharaja Mapanji Jayabhaya. 
                Melalui Prasasti Ngantang tertanggal 13 April 1135, sang raja mengumandangkan semboyan legendarisnya: "Panjalu Jayati" (Kediri Menang) atas saudaranya, Jenggala. 
                Di era inilah Kediri menjadi pusat sastra termegah, tempat di mana Kakawin Bharatayuddha dilahirkan dari ujung pena Empu Sedah dan Empu Panuluh.
            </p>

            {/* KOLOM 3: MITOS & KUTUKAN KALI BRANTAS */}
            <div className="flex flex-col lg:h-full justify-between items-start z-10 gap-8 lg:gap-0">
                <div className="flex flex-col gap-4 lg:gap-10 self-start">
                    <div className='animate-ch2-funfact flex flex-col gap-2'>
                        <span className="font-mono text-xs tracking-[0.3em] text-accent font-light uppercase">
                            Mitos & Kutukan Nusantara
                        </span>
                        <h4 className="font-playfair-display font-bold text-2xl md:text-3xl lg:text-4xl text-start">
                            Kutukan Kali Brantas
                        </h4>
                    </div>
                    
                    <p className="animate-ch2-funfact font-playfair-display text-base/7 md:text-lg/8 text-start self-start">
                        Terdapat mitos wingit yang dipercaya hingga era modern: pemimpin tertinggi negara atau 
                        Presiden RI yang nekat menyeberangi Sungai Brantas dan masuk ke jantung Kota Kediri 
                        dipercaya akan lengser dari jabatannya dalam waktu singkat akibat kutukan kuno Kartasura.
                    </p>
                </div>

                {/* Kontainer Foto Gus Dur */}
                <div className="animate-ch2-funfact w-full flex flex-col gap-3 group">
                    <div className="w-full h-48 md:h-56 overflow-hidden rounded shadow-xl bg-stone-900 border border-white/5">
                        <img 
                            src={presiden} 
                            alt="Kunjungan Presiden" 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
                        />
                    </div>
                    <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1 leading-normal">
                        * Dokumentasi sejarah KH Abdurrahman Wahid (Gus Dur) usai dilengserkan dari kursi Presiden.
                    </caption>
                </div>
            </div>

        </section>
    )
}