import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';

// Daftarkan ScrollTrigger ke GSAP
gsap.registerPlugin(ScrollTrigger);


const siteInfo = {
  title: "Kediri",
  subtitle: "TOURISM",
  desc: "Mengeksplorasi keindahan alam, peninggalan peradaban masa lalu, serta pesona budaya Kota dan Kabupaten Kediri. Mari mulai perjalanan Anda melintasi ruang dan waktu.",
  author: "John Doe (Frontend Developer)",
  year: new Date().getFullYear(),
};

const footerLinks = [
  { id: 'l1', name: 'Destinations', url: '#' },
  { id: 'l2', name: 'Events & Agenda', url: '#' },
  { id: 'l3', name: 'Culinary Guide', url: '#' },
  { id: 'l4', name: 'Travel Info', url: '#' },
];

const socialLinks = [
  { id: 'wa', name: 'WhatsApp', url: 'https://wa.me/08123456789', icon: FaWhatsapp, color: 'text-green-500', hover: 'hover:text-primary' },
  { id: 'ig', name: 'Instagram', url: '#', icon: FaInstagram, color: 'text-pink-500', hover: 'hover:text-accent' },
  { id: 'gh', name: 'GitHub', url: '#', icon: FaGithub, color: 'text-gray-800', hover: 'hover:text-secondary' },
  { id: 'em', name: 'Email', url: '#', icon: FaEnvelope, color: 'text-blue-500', hover: 'hover:text-primary' },
];

// ==========================================
// KOMPONEN UTAMA FOOTER
// ==========================================
export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(containerRef);

  useEffect(() => {
    // Animasi menggunakan GSAP ScrollTrigger
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
            start: 'top 75%', // Mulai animasi ketika bagian atas footer mencapai 75% dari viewport
            toggleActions: 'play none none reverse', // Akan terputar kembali jika di-scroll ke atas
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

    return () => ctx.revert(); // Cleanup GSAP saat unmount
  }, [q]);

  return (
    // 1. Template padding & height wajib
    // 3. Warna bg menggunakan bg-background
    <footer 
      ref={containerRef}
      className="px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh bg-background flex flex-col justify-between relative overflow-hidden"
    >
      
      {/* Latar Belakang Abstrak (Opsional untuk memperkuat tema) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* --- BAGIAN ATAS (Header Footer) --- */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 mt-10 lg:mt-20 z-10">
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          <h4 className="gsap-fade-up font-playfair-display text-xl md:text-2xl text-secondary tracking-[0.3em] font-light uppercase mb-2">
            Explore
          </h4>
          {/* 4 & 5. Typografi menggunakan Javamango & warna Accent untuk Logo */}
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

      {/* Garis Dekoratif Tengah */}
      <div className="w-full h-[1px] bg-slate-300 my-8 lg:my-0 z-10 relative">
        <div className="gsap-line absolute top-0 left-0 h-full bg-accent"></div>
      </div>

      {/* --- BAGIAN BAWAH (Links & Socials) --- */}
      {/* 2. Responsif stack di mobile, rapi di desktop */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 z-10 mb-10 lg:mb-0">
        
        {/* Navigation Links */}
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

        {/* Social Media Icons */}
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

      {/* --- COPYRIGHT & AUTHOR --- */}
      <div className="gsap-fade-up flex flex-col lg:flex-row justify-between items-center gap-2 z-10 text-center lg:text-left mt-auto lg:mt-0 font-mono text-xs text-slate-400 pb-5 lg:pb-0">
        <p>&copy; {siteInfo.year} {siteInfo.title} {siteInfo.subtitle}. All rights reserved.</p>
        <p>
          Crafted with passion by <span className="text-secondary font-semibold">{siteInfo.author}</span>
        </p>
      </div>

    </footer>
  );
}