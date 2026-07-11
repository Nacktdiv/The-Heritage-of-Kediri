// import React, { useRef } from 'react'
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import background from '../../../assets/peta-rute-kereta.webp'
// import keretaApi from '../../../assets/kereta-api-uap-kediri.webp'
// import pabrikGula from '../../../assets/pabrik-gula-minggiran.webp'
// import jembatanLama from '../../../assets/jembatan-lama.webp'

// gsap.registerPlugin(ScrollTrigger);

// type Chapter3Props = {
//     onStartChapter : () => void
// }

// export default function Chapter3 ({onStartChapter} : Chapter3Props) {

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
//                    return `top+=${2 * window.innerWidth} top+=${startAmount}`
//                 },
//                 end: () => `+=${3 * window.innerWidth}`,
//                 toggleActions: "play none none reverse",
//                 invalidateOnRefresh: true,
//                 onEnter: () => {
//                     onStartChapter()
//                 }
//             }
//         });

//         // Efek stagger untuk memunculkan elemen satu per satu secara berurutan
//         tl.fromTo('.animate-ch3-title', 
//             { opacity: 0, y: 50 }, 
//             { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
//         )
//         .fromTo('.animate-ch3-line', 
//             { scaleX: 0, opacity: 0 }, 
//             { scaleX: 1, opacity: 0.3, duration: 0.8, ease: "power2.inOut" },
//             "-=0.6" // Dimulai sebelum judul selesai
//         )
//         .fromTo('.animate-ch3-item', 
//             { opacity: 0, y: 30, scale: 0.95 }, 
//             { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 },
//             "-=0.4"
//         );

//         // ================= 2. ANIMASI MOUSE MOVE PARALLAX =================
//         // Menyiapkan quickTo untuk performa tinggi
//         const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
//         const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });
//         const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
//         const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

//         const handleMouseMove = (e : MouseEvent) => {
//             const { clientX, clientY } = e;
//             const { innerWidth, innerHeight } = window;
//             const centerX = innerWidth / 2;
//             const centerY = innerHeight / 2;

//             // Gerakan inverse (searah) lebih lambat
//             const moveXContent = -(clientX - centerX) / 150;
//             const moveYContent = -(clientY - centerY) / 150;
//             // Gerakan latar belakang berlawanan
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
//             className="chapter flex-shrink-0 relative w-[calc(100svw-96px)] h-svh self-end bg-background grid grid-cols-4 gap-16 py-4 md:py-8 lg:py-24 px-4 md:px-8 lg:px-40 justify-center items-center"
//         >
//             <div 
//                 className={"absolute inset-0 bg-cover bg-center opacity-20"}
//                 style={{ backgroundImage: `url(${background})` }}
//                 ref={bgRef}
//             />

//             <div className='flex flex-col h-full justify-start gap-20'>
//                 <div className='flex flex-col'>
//                     <h3 className='animate-ch3-title font-playfair-display font-bold text-5xl/24 text-end'>Masa Kolonialisme Belanda</h3>
//                     <hr className='animate-ch3-line mt-10 mx-auto w-80' />
//                 </div>
//                 <p className='animate-ch3-item font-playfair-display text-xl/10 text-start self-start'>
//                     Setelah Majapahit runtuh, Daha berganti nama menjadi Kediri, 
//                     yang menjadi kota Kadipaten di bawah pengaruh Mataram Islam, 
//                     hingga beralih menjadi kota mandiri Kolonial Belanda pada 1 April 1906. 
//                 </p>
//             </div>
//             <div className='flex flex-col h-full justify-between'>
//                 <p className='animate-ch3-item font-playfair-display text-lg/8 text-start self-start'>
//                     Jalur kereta api Kediri Stoomtram Maatschappij (KSM) adalah jaringan trem uap pada masa Hindia Belanda yang menghubungkan wilayah Kediri dengan Jombang. 
//                     Jalur ini dibangun sejak akhir abad ke-19, dengan tujuan utama mengangkut hasil bumi dan komoditas tebu dari puluhan pabrik gula.  
//                     Kehadiran trem uap KSM ini menjadi urat nadi perekonomian yang sangat vital pada zamannya, 
//                     sebelum akhirnya mayoritas jalur tersebut dinonaktifkan secara bertahap pada paruh kedua abad ke-20 akibat modernisasi transportasi jalan raya.
//                 </p>
//                 <div className="animate-ch3-item w-full flex flex-col gap-3 group">
//                     <div className="w-full overflow-hidden">
//                         <img 
//                             src={keretaApi} 
//                             alt="Kunjungan Presiden di Wilayah Timur Kediri" 
//                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
//                         />
//                     </div>
//                     <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1">
//                         * Dokumentasi sejarah Kereta Api Uap atau Sepur Trutuk atau Kediri Stoomtram-Maatschappij (KSM).
//                     </caption>
//                 </div>
//             </div>

//             <div className='flex flex-col h-full justify-between'>
//                 <div className="animate-ch3-item w-full flex flex-col gap-3 group">
//                     <div className="w-full overflow-hidden">
//                         <img 
//                             src={pabrikGula} 
//                             alt="Kunjungan Presiden di Wilayah Timur Kediri" 
//                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
//                         />
//                     </div>
//                     <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1">
//                         * Dokumentasi sejarah area dan bangunan PG Minggiran pada tahun 1920.
//                     </caption>
//                 </div>
//                 <p className='animate-ch3-item font-playfair-display text-lg/8 text-start self-start'>
//                     Pada masa kolonial Belanda, wilayah Kediri merupakan salah satu pusat industri pengolahan tebu paling produktif, 
//                     yang dibuktikan dengan berdirinya belasan pabrik gula (PG) megah seperti PG Pesantren, PG Ngadirejo, PG Meritjan, PG Minggiran hingga PG Tegowangi. 
//                     Hal ini didasari oleh kesuburan tanah vulkanis di sekitar lereng Gunung Kelud sehigga bertransformasi mesin ekonomi berbasis sistem tanam paksa (Cultuurstelsel) hingga era liberal.
//                 </p>
//             </div>

//             <div className='flex flex-col h-full justify-between'>
//                 <p className='animate-ch3-item font-playfair-display text-lg/8 text-start self-start'>
//                     Jembatan Lama Kota Kediri, atau nama aslinya Brug over den Brantas te Kediri, adalah jembatan besi tertua di Indonesia yang diresmikan pada 18 Maret 1869 oleh pemerintah kolonial Belanda. 
//                     Dirancang oleh jurnalis sekaligus insinyur Willem Albert de Dentremont,  jembatan ini memiliki peran yang sangat vital sebagai urat nadi konektivitas yang menghubungkan wilayah Madiun (Barat) dan Surabaya (Timur), 
//                     sekaligus memperlancar jalur distribusi logistik dan hasil bumi dari pabrik-pabrik gula di pedalaman Kediri.
//                 </p>
//                 <div className="animate-ch3-item w-full flex flex-col gap-3 group">
//                     <div className="w-full overflow-hidden">
//                         <img 
//                             src={jembatanLama} 
//                             alt="Kunjungan Presiden di Wilayah Timur Kediri" 
//                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
//                         />
//                     </div>
//                     <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1">
//                         * Dokumentasi sejarah foto Jembatan Lama/Brawijaya Kediri 24 Desember 1948.
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

import background from '../../../assets/peta-rute-kereta.webp'
import keretaApi from '../../../assets/kereta-api-uap-kediri.webp'
import pabrikGula from '../../../assets/pabrik-gula-minggiran.webp'
import jembatanLama from '../../../assets/jembatan-lama.webp'

gsap.registerPlugin(ScrollTrigger);

type Chapter3Props = {
    onStartChapter : () => void
}

export default function Chapter3 ({onStartChapter} : Chapter3Props) {
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
                    markers: false,
                    trigger: container, 
                    start: () => `top+=${2 * window.innerWidth} top+=${startAmount}`,
                    end: () => `+=${3 * window.innerWidth}`,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    onEnter: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-ch3-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
              .fromTo('.animate-ch3-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.8, ease: "power2.inOut" }, "-=0.6")
              .fromTo('.animate-ch3-item', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }, "-=0.4");

            // Animasi Mouse Move Parallax
            const xToContent = gsap.quickTo(container, "x", { duration: 0.8, ease: "power3.out" });
            const yToContent = gsap.quickTo(container, "y", { duration: 0.8, ease: "power3.out" });
            const xToBg = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power2.out" });
            const yToBg = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power2.out" });

            const handleMouseMove = (e : MouseEvent) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const centerX = innerWidth / 2;
                const centerY = innerHeight / 2;

                xToContent(-(clientX - centerX) / 150);
                yToContent(-(clientY - centerY) / 150);
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
                    onEnter: () => onStartChapter(),
                    onEnterBack: () => onStartChapter()
                }
            });

            tl.fromTo('.animate-ch3-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
              .fromTo('.animate-ch3-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.6 }, "-=0.5")
              .fromTo('.animate-ch3-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.4");
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            // MODIFIKASI LAYOUT: grid-cols-1 di mobile, grid-cols-4 di desktop besar (lg). Gap disesuaikan agar tidak padat.
            className="chapter flex-shrink-0 relative w-full lg:w-[calc(100svw-96px)] min-h-screen lg:h-svh self-end bg-background grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 py-12 md:py-20 lg:py-24 px-6 md:px-16 lg:px-40 justify-center items-center overflow-hidden"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${background})` }}
                ref={bgRef}
            />

            {/* KOLOM 1: JUDUL & PENGANTAR KELING */}
            <div className='flex flex-col lg:h-full justify-start gap-8 lg:gap-20'>
                <div className='flex flex-col'>
                    <h3 className='animate-ch3-title font-playfair-display font-bold text-4xl md:text-5xl lg:text-5xl/24 text-start lg:text-end'>
                        Masa Kolonialisme Belanda
                    </h3>
                    <hr className='animate-ch3-line mt-4 lg:mt-10 mx-0 lg:mx-auto w-24 lg:w-80 border-accent/40 origin-left lg:origin-center' />
                </div>
                <p className='animate-ch3-item font-playfair-display text-base/7 md:text-lg/8 lg:text-xl/10 text-start self-start '>
                    Setelah Majapahit runtuh, Daha berganti nama menjadi Kediri, 
                    yang menjadi kota Kadipaten di bawah pengaruh Mataram Islam, 
                    hingga beralih menjadi kota mandiri Kolonial Belanda pada 1 April 1906. 
                </p>
            </div>

            {/* KOLOM 2: SEJARAH TREM KSM */}
            <div className='flex flex-col lg:h-full justify-between gap-6 lg:gap-0'>
                <p className='animate-ch3-item font-playfair-display text-base/7 md:text-lg/8 text-start self-start '>
                    Jalur kereta api Kediri Stoomtram Maatschappij (KSM) adalah jaringan trem uap pada masa Hindia Belanda yang menghubungkan wilayah Kediri dengan Jombang. 
                    Jalur ini dibangun sejak akhir abad ke-19, dengan tujuan utama mengangkut hasil bumi dan komoditas tebu dari puluhan pabrik gula.  
                    Kehadiran trem uap KSM ini menjadi urat nadi perekonomian yang sangat vital pada zamannya.
                </p>
                <div className="animate-ch3-item w-full flex flex-col gap-3 group">
                    <div className="w-full h-48 md:h-56 overflow-hidden rounded shadow-xl">
                        <img 
                            src={keretaApi} 
                            alt="Dokumentasi KSM" 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
                        />
                    </div>
                    <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1 leading-normal">
                        * Dokumentasi sejarah Kereta Api Uap atau Sepur Trutuk atau Kediri Stoomtram-Maatschappij (KSM).
                    </caption>
                </div>
            </div>

            {/* KOLOM 3: PABRIK GULA */}
            <div className='flex flex-col lg:h-full justify-between gap-6 lg:gap-0 lg:flex-col-reverse'>
                {/* Di desktop diatur membalik urutan, di mobile kita biarkan mengalir fleksibel */}
                <p className='animate-ch3-item font-playfair-display text-base/7 md:text-lg/8 text-start self-start '>
                    Pada masa kolonial Belanda, wilayah Kediri merupakan salah satu pusat industri pengolahan tebu paling produktif, 
                    yang dibuktikan dengan berdirinya belasan pabrik gula (PG) megah seperti PG Pesantren, PG Ngadirejo, PG Meritjan, hingga PG Minggiran. 
                    Hal ini didasari oleh kesuburan tanah vulkanis di sekitar lereng Gunung Kelud sehingga bertransformasi mesin ekonomi.
                </p>
                <div className="animate-ch3-item w-full flex flex-col gap-3 group lg:mb-6">
                    <div className="w-full h-48 md:h-56 overflow-hidden rounded shadow-xl">
                        <img 
                            src={pabrikGula} 
                            alt="Dokumentasi Pabrik Gula" 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
                        />
                    </div>
                    <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1 leading-normal">
                        * Dokumentasi sejarah area dan bangunan PG Minggiran pada tahun 1920.
                    </caption>
                </div>
            </div>

            {/* KOLOM 4: JEMBATAN LAMA */}
            <div className='flex flex-col lg:h-full justify-between gap-6 lg:gap-0'>
                <p className='animate-ch3-item font-playfair-display text-base/7 md:text-lg/8 text-start self-start '>
                    Jembatan Lama Kota Kediri, atau nama aslinya Brug over den Brantas te Kediri, adalah jembatan besi tertua di Indonesia yang diresmikan pada 18 Maret 1869 oleh pemerintah kolonial Belanda. 
                    Dirancang oleh jurnalis Willem Albert de Dentremont, jembatan ini memiliki peran yang sangat vital sebagai urat nadi konektivitas wilayah Madiun dan Surabaya.
                </p>
                <div className="animate-ch3-item w-full flex flex-col gap-3 group">
                    <div className="w-full h-48 md:h-56 overflow-hidden rounded shadow-xl">
                        <img 
                            src={jembatanLama} 
                            alt="Dokumentasi Jembatan Lama" 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700 ease-out filter sepia-[0.2]"
                        />
                    </div>
                    <caption className="font-playfair-display italic text-xs text-start text-accent/60 block px-1 leading-normal">
                        * Dokumentasi sejarah foto Jembatan Lama/Brawijaya Kediri 24 Desember 1948.
                    </caption>
                </div>
            </div>
        </section>
    )
}