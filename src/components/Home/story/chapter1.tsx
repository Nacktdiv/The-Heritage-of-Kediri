// import React, { useRef } from 'react'
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import background from '../../../assets/sungai-brantas.webp'
// import king from '../../../assets/icons/king.png'
// import castle from '../../../assets/icons/castle.png'

// gsap.registerPlugin(ScrollTrigger)

// type Chapter1Props = {
//     onStartChapter : () => void
// }

// export default function Chapter1 ({onStartChapter} : Chapter1Props) {

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
//                     return `top top+=${startAmount}`
//                 },
//                 end: () => `+=${window.innerWidth}`,
//                 toggleActions: "play none none reverse",
//                 invalidateOnRefresh: true,
//                 onEnter: () => {
//                     onStartChapter()
//                 }
//             }
//         });

//         tl.fromTo('.animate-title', 
//             { opacity: 0, y: 50 }, 
//             { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
//         )
//         .fromTo('.animate-line', 
//             { scaleX: 0, opacity: 0 }, 
//             { scaleX: 1, opacity: 0.3, duration: 0.6, ease: "power2.inOut" },
//             "-=0.6" // Dimulai sedikit bersamaan dengan judul
//         )
//         .fromTo('.animate-text', 
//             { opacity: 0, y: 30 }, 
//             { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
//             "-=0.4"
//         )
//         .fromTo('.animate-coord', 
//             { opacity: 0, scale: 0.9 }, 
//             { opacity: 0.6, scale: 1, duration: 0.6, ease: "power2.out" },
//             "-=0.6"
//         );

//         // ================= 2. ANIMASI MOUSE MOVE PARALLAX =================
//         const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
//         const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });

//         const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
//         const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

//         const handleMouseMove = (e: MouseEvent) => {
//             const { clientX, clientY } = e;
//             const { innerWidth, innerHeight } = window;

//             const centerX = innerWidth / 2;
//             const centerY = innerHeight / 2;

//             const moveXContent = -(clientX - centerX) / 100;
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

//         // Bersihkan event listener otomatis saat unmount (fitur bawaan cleanup useGSAP)
//         return () => {
//             container.removeEventListener("mousemove", handleMouseMove);
//         };
//     }, { scope: containerRef });

//     return (
//         <section 
//             ref={containerRef}
//             className="chapter flex-shrink-0 relative  w-[calc(100svw-96px)] h-svh self-end bg-background flex flex-col items-center justify-center"
//         >
//             <div 
//                 className={"absolute inset-0 bg-cover bg-center opacity-20"}
//                 style={{ backgroundImage: `url(${background})` }}
//                 ref={bgRef}
//             />
//             <h3 className='animate-title font-playfair-display font-bold text-5xl text-center'>Asal Mula Kediri</h3>
//             <hr className='animate-line mt-10 mx-auto w-100' />
//             <p className='animate-text mt-20 w-200 font-playfair-display font-semibold text-2xl/12 text-center '>
//                 Pada November 1042, atas perintah 
//                 <span className='font-bold text-accent'> Raja Airlangga </span> <img className="w-6 h-6 inline-flex items-center" src={king}/>, 
//                 Mpu Bharada menuangkan air suci dari angkasa sehingga membelah kerajaan kahuripan menjadi dua negara. 
//                 Bagian timur menjadi Kerajaan Jenggala sedangkan bagian barat menjadi 
//                 <span className='font-bold text-accent'> Kerajaan Panjalu/Kadiri </span> <img className="w-6 h-6 inline-flex items-center" src={castle}/> yang 
//                 kini dikenal dengan wilayah Kediri. 
//                 Pusat pemerintahan kerajaan Kadiri di daerah Daha yang kini menjadi wilayah pemerintahan Kota Kediri.
//             </p>
//             <p className='animate-coord absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-sm tracking-widest opacity-60'>
//                 7°44′26″S 112°31′57″E
//             </p>
//         </section>
//     )
    
// }

import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import background from '../../../assets/sungai-brantas.webp'
import king from '../../../assets/icons/king.png'
import castle from '../../../assets/icons/castle.png'

gsap.registerPlugin(ScrollTrigger)

type Chapter1Props = {
    onStartChapter : () => void
}

export default function Chapter1 ({onStartChapter} : Chapter1Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const bg = bgRef.current;
        if (!container) return;

        // Ambil nilai offsetLeft saat komponen pertama kali di-mount
        const startAmount = (document.querySelector('.chapter') as HTMLElement)?.offsetLeft || 0;

        // Menggunakan matchMedia agar logika animasi terpisah antara Desktop vs Mobile
        const mm = gsap.matchMedia();

        // 1. KONDISI DESKTOP (Layar besar dengan Scroll Horizontal & Parallax)
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    markers: false, // Matikan jika sudah produksi
                    trigger: container, 
                    start: () => `top top+=${startAmount}`,
                    end: () => `+=${window.innerWidth}`,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    onEnter: () => onStartChapter(),
                    onEnterBack: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" })
              .fromTo('.animate-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.6, ease: "power2.inOut" }, "-=0.6")
              .fromTo('.animate-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
              .fromTo('.animate-coord', { opacity: 0, scale: 0.9 }, { opacity: 0.6, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.6");

            // Animasi Mouse Move Parallax
            const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
            const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });
            const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
            const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

            const handleMouseMove = (e: MouseEvent) => {
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

        // 2. KONDISI MOBILE & TABLET (Scroll Vertikal Alami, Tanpa Parallax)
        mm.add("(max-width: 1023px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top center+=150", // Terpicu saat section mulai digulir muncul di layar hp
                    toggleActions: "play none none reverse",
                    onEnter: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
              .fromTo('.animate-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.5 }, "-=0.4")
              .fromTo('.animate-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3")
              .fromTo('.animate-coord', { opacity: 0 }, { opacity: 0.6, duration: 0.5 }, "-=0.4");
        });

        // Cleanup otomatis seluruh matchMedia saat unmount
        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            // MODIFIKASI LAYOUT: Fleksibel w-full di mobile, kalkulasi lebar bersisa di lg (desktop)
            className="chapter flex-shrink-0 relative w-full lg:w-[calc(100svw-96px)] min-h-screen lg:h-svh self-end bg-background flex flex-col items-center justify-center py-16 px-6 md:px-16 lg:p-0 overflow-hidden"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${background})` }}
                ref={bgRef}
            />
            
            {/* Responsif Font-Size */}
            <h3 className='animate-title font-playfair-display font-bold text-3xl md:text-4xl lg:text-5xl text-center px-4 z-10'>
                Asal Mula Kediri
            </h3>
            
            {/* Lebar garis responsif (tidak jebol di mobile) */}
            <hr className='animate-line mt-6 lg:mt-10 mx-auto w-24 md:w-40 lg:w-80 border-accent/40 z-10' />
            
            {/* Responsif Width Kontainer & Ukuran Font Paragraf */}
            <p className='animate-text mt-8 md:mt-12 lg:mt-20 w-full max-w-[90%] md:max-w-[80%] lg:w-[800px] font-playfair-display font-medium text-lg/8 md:text-xl/10 lg:text-2xl/12 text-center z-10'>
                Pada November 1042, atas perintah {" "}
                <span className='font-bold text-accent inline-flex items-center gap-1'> 
                    Raja Airlangga <img className="w-5 h-5 lg:w-6 lg:h-6 object-contain" src={king} alt="king"/>
                </span>, 
                Mpu Bharada menuangkan air suci dari angkasa sehingga membelah kerajaan kahuripan menjadi dua negara. 
                Bagian timur menjadi Kerajaan Jenggala sedangkan bagian barat menjadi {" "}
                <span className='font-bold text-accent inline-flex items-center gap-1'> 
                    Kerajaan Panjalu/Kadiri <img className="w-5 h-5 lg:w-6 lg:h-6 object-contain" src={castle} alt="castle"/>
                </span> yang 
                kini dikenal dengan wilayah Kediri. 
                Pusat pemerintahan kerajaan Kadiri di daerah Daha yang kini menjadi wilayah pemerintahan Kota Kediri.
            </p>
            
            {/* Koordinat fleksibel: absolute di desktop, margin-top di mobile agar tidak menabrak teks */}
            <p className='animate-coord relative lg:absolute mt-12 lg:mt-0 lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 font-mono text-xs md:text-sm tracking-widest opacity-60 z-10'>
                7°44′26″S 112°31′57″E
            </p>
        </section>
    )
}