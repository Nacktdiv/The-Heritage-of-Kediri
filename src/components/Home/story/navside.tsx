import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react"; 

gsap.registerPlugin(ScrollTrigger)

const menuSteps = [
  { id: 1, label: "Chapter 1", desc: "Bumi Pamasa" },
  { id: 2, label: "Chapter 2", desc: "Jangka Jayabhaya" },
  { id: 3, label: "Chapter 3", desc: "Kolonial & Kontemporer"}
//   { id: 4, label: "Chapter 4", desc: "Konflik internal dan taktik perang." },
//   { id: 5, label: "Chapter 5", desc: "Runtuhnya kerajaan menuju era baru." },
];

type NavsideProps = {
    activeChapter : number
}

export default function Navside({activeChapter} : NavsideProps) {
    const navsideRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLButtonElement>(null);
    const detailPanelRef = useRef<HTMLDivElement>(null);

    const [isExpanded, setIsExpanded] = useState(false);

    useGSAP(() => {
        if (!navsideRef.current) return;

        gsap.fromTo(navsideRef.current, 
            { scaleX: 0 }, 
            {
                transformOrigin: "left center",
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out'
            }
        );

        if (lineRef.current) {
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    transformOrigin: "top center",
                    scaleY: 1,
                    ease: "none"
                }
            );
        }
    }, []);

    const { contextSafe } = useGSAP({ scope: navsideRef });

    const toggleExpand = contextSafe(() => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);

        const targetWidth = nextState ? 400 : 96;

        let tl = gsap.timeline()

        tl.to(navsideRef.current, {
            width: targetWidth,
            duration: 0.6,
            ease: "power3.inOut"
        });

        tl.fromTo(arrowRef.current,
            {
                rotate: nextState ? 0 : 180,
                yPercent: -50, // menulis ulang css untuk mengatasi bug
            }, 
            {
                rotate: nextState ? 180 : 0,
                yPercent: -50, // menulis ulang css untuk mengatasi bug 
                duration: 0.4,
                ease: "power2.out",
            },
            '-=0.6');

        if (nextState) {
            tl.fromTo(".detail-text", 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
                '-=0.2'
            );
        } else {
            tl.to(".detail-text", {
                opacity: 0,
                x: -10,
                duration: 0.2
            }, '-=0.2');
        }
    });

    return (
        <aside 
            ref={navsideRef}
            className="hidden fixed left-0 top-0 bottom-0 z-[1] w-24 bg-primary lg:flex flex-row items-center justify-between py-8 text-white select-none shadow-2xl"
        >
            <div className="w-24 h-full flex flex-col items-center justify-between flex-shrink-0">
                <div className="rotate-180 [writing-mode:vertical-lr] font-javamango text-xl font-bold tracking-widest text-background uppercase opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                    Where is Kadiri<span className="font-playfair-display">?</span>
                </div>

                <div className="relative flex flex-col items-center justify-center gap-6 my-auto">
                    <div 
                        className="absolute top-0 bottom-0 w-[4px] z-0" 
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #C08552 50%, #4B2E2B 50%)',
                            backgroundSize: '4px 8px',
                            backgroundRepeat: 'repeat-y'
                        }}
                    />
                    {menuSteps.map((step) => (
                        <button 
                            key={step.id} 
                            className={`group relative z-10 w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                                step.id === activeChapter 
                                ? 'bg-secondary border-secondary scale-125' 
                                : 'bg-accent border-none'
                            }`}
                        >   
                            <div className={`absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-transparent w-10 h-10 rounded-full border-dashed border-2 ${
                                step.id === activeChapter  ? 'border-accent' : 'hidden'
                            }`} />
                            
                            {!isExpanded && (
                                <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/80 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap tracking-wider uppercase">
                                    {step.label}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="[writing-mode:vertical-lr] font-javamango text-xl font-bold tracking-widest uppercase text-accent hover:text-background transition-colors cursor-pointer">
                    MENU
                </div>
            </div>

            <div 
                ref={detailPanelRef}
                className={`flex-1 h-full flex flex-col justify-between pl-4 pr-12 overflow-hidden ${isExpanded ? 'block' : 'pointer-events-none'}`}
            >       
                {/** Pembayang untuk kata 1 */}
                <div className="rotate-180 [writing-mode:vertical-lr] font-javamango text-xl font-bold tracking-widest text-transparent uppercase transition-opacity">
                    Where is Kadiri<span className="font-playfair-display">?</span>
                </div>

                <div className="flex flex-col gap-6">
                    {menuSteps.map((step) => (
                        // Tinggi h-7 disamakan dengan tinggi tombol lingkaran agar posisi teks sejajar lurus
                        <div key={step.id} className="detail-text h-7 flex flex-col justify-center opacity-0 whitespace-nowrap">
                            <h4 className="text-xl font-playfair-display text-background/80 truncate max-w-[260px]">{step.desc}</h4>
                        </div>
                    ))}
                </div>

                {/** Pembayang untuk kata 2 */}
                <div className="[writing-mode:vertical-lr] font-javamango text-xl font-bold tracking-widest uppercase text-transparent transition-colors ">
                    MENU
                </div>
            </div>

            <button
                ref={arrowRef}
                onClick={toggleExpand}
                className="absolute inset-0 top-1/2 -translate-y-1/2 left-[110%] z-[100] flex items-center justify-center bg-black/40 text-white w-10 h-10 p-2 rounded-full shadow-lg border border-black/20 hover:bg-black hover:scale-110 transition-all group"
                // style={{ transformOrigin: "center center" }}
            >
                <ChevronRight className="w-5 h-5 group-hover:animate-pulse" />
            </button>
        </aside>
    )
}