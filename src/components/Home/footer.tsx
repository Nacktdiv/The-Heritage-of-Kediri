import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';

// Daftarkan ScrollTrigger ke GSAP
gsap.registerPlugin(ScrollTrigger);


const siteInfo = {
  title: "Kediri",
  subtitle: "TOURISM",
  desc: "Mengeksplorasi keindahan alam, peninggalan peradaban masa lalu, serta pesona budaya Kota dan Kabupaten Kediri. Mari mulai perjalanan Anda melintasi ruang dan waktu.",
  author: "Nacktidv (Fullstack Developer)",
  year: new Date().getFullYear(),
};

const footerLinks = [
  { id: 'l1', name: 'Destinations', url: '/destination' },
  { id: 'l2', name: 'Events & Agenda', url: '/event' },
  { id: 'l4', name: 'Travel Plan', url: '/plan' },
];

const socialLinks = [
  { id: 'wa', name: 'WhatsApp', url: 'https://wa.me/081548272241', icon: FaWhatsapp, color: 'text-green-500', hover: 'hover:text-primary' },
  { id: 'ig', name: 'Instagram', url: '#', icon: FaInstagram, color: 'text-pink-500', hover: 'hover:text-accent' },
  { id: 'gh', name: 'GitHub', url: '#', icon: FaGithub, color: 'text-gray-800', hover: 'hover:text-secondary' },
  { id: 'em', name: 'Email', url: '#', icon: FaEnvelope, color: 'text-blue-500', hover: 'hover:text-primary' },
];


type FooterType = {
  onActiveSection : (data : string) => void
}

export default function Footer({onActiveSection} : FooterType) {
  const containerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(containerRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        q('.gsap-fade-up'),
        { 
          y: 60, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 25%',
            toggleActions: 'play reverse restart reverse', 
            onEnter: () => onActiveSection('footer'),
            onEnterBack : () => onActiveSection('footer')
          }
        }
      );

      // Animasi garis dekoratif memanjang
      gsap.fromTo(
        q('.gsap-line'),
        { width: 0 },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, [q]);

  return (
    <footer 
      ref={containerRef}
      id='footer'
      className="px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh bg-background flex flex-col justify-between relative overflow-hidden"
    >
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 mt-10 lg:mt-20 z-10">
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          <h4 className="gsap-fade-up font-playfair-display text-xl md:text-2xl text-secondary tracking-[0.3em] font-light uppercase mb-2">
            Explore
          </h4>
          <h2 className="gsap-fade-up font-javamango text-6xl md:text-8xl lg:text-9xl text-accent tracking-[0.05em] font-bold leading-none">
            {siteInfo.title}
          </h2>
          <span className="gsap-fade-up font-mono text-2xl md:text-3xl tracking-[0.2em] text-primary mt-2 uppercase font-semibold">
            {siteInfo.subtitle}
          </span>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end text-center lg:text-right">
          <p className="gsap-fade-up font-playfair-display text-base md:text-lg text-slate-600 leading-relaxed">
            {siteInfo.desc}
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-300 my-8 lg:my-0 z-10 relative">
        <div className="gsap-line absolute top-0 left-0 h-full bg-accent"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 z-10 mb-10 lg:mb-0">
        
        <div className="gsap-fade-up flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-10">
          {footerLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url}
              className="font-mono text-sm md:text-base text-primary hover:text-accent transition-colors duration-300 uppercase tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="gsap-fade-up flex items-center gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a 
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className={`w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-primary bg-white shadow-sm hover:scale-110 hover:border-transparent transition-all duration-300 ${social.hover}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="gsap-fade-up flex flex-col lg:flex-row justify-between items-center gap-2 z-10 text-center lg:text-left mt-auto lg:mt-0 font-mono text-xs text-slate-400 pb-5 lg:pb-0">
        <p>&copy; {siteInfo.year} {siteInfo.title} {siteInfo.subtitle}. All rights reserved.</p>
        <p>
          Crafted with passion by <span className="text-secondary font-semibold">{siteInfo.author}</span>
        </p>
      </div>

    </footer>
  );
}