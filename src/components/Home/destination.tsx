import { useState, useEffect, useRef, useContext } from 'react';
import { MapContainer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { IconType } from 'react-icons';
import { IoArrowForwardOutline, IoArrowBackOutline, IoLocation } from 'react-icons/io5';

import { MainContext } from '../../context';

import dataKecamatan from '../../assets/maps/kediri.json';

gsap.registerPlugin(ScrollTrigger);

const createCustomIconMap = (isActive: boolean, colorClass: string, IconComponent: IconType) => {
  return L.divIcon({
    className: 'custom-map-marker-wrapper bg-transparent',
    html: renderToString(
      <div className={`relative flex items-center justify-center transition-all duration-300 w-14 h-14 ${isActive ? 'scale-110 -translate-y-2' : 'hover:scale-110'}`}>
        {isActive && (
          <span className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-accent animate-ping opacity-60"></span>
        )}
        <div className="relative flex items-center justify-center">
          <IoLocation 
            className={`w-20 h-20 filter drop-shadow-xl transition-colors duration-300 ${
              isActive ? 'text-accent drop-shadow-accent/50' : colorClass
            }`} 
          />
          <div className="absolute top-[8px] flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-md">
            <IconComponent className={`w-8 h-8 ${isActive ? 'text-accent' : colorClass}`} />
          </div>
        </div>
      </div>
    ),
    iconSize: [56, 56],
    iconAnchor: [28, 54],
    popupAnchor: [0, -48],
  });
};

type CustomDetailType = {
  colorClass?: string,
  IconComponent?: IconType
}

const CreateCustomIconDetail = ({ colorClass, IconComponent} : CustomDetailType) => {
  if(!colorClass || !IconComponent) return

  return (
    <div className={`gsap-info-item h-full aspect-square rounded-full bg-primary flex items-center justify-center text-background`}>
      <IconComponent className='w-[70%] h-[70%] '/>
    </div>
  )
}

type DestinationType = {
  onActiveSection : (data : string) => void
}

type SelectedType = {
  title?: string,
  desc?: string,
  img?: string,
  icon?: IconType,
  mapColor?: string 
}

export default function Destination({onActiveSection} : DestinationType) {
  const { destinationData } = useContext(MainContext)!

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedInfo, setSelectedInfo] = useState<SelectedType>();
  console.log(selectedInfo)
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  const styleKecamatan = (feature: any) => {
    const idStr = String(feature?.properties?.id || feature?.id || '');
    const lastDigit = parseInt(idStr.charAt(idStr.length - 1)) || 0;
    
    let fColor = '#ffffff';
    if (lastDigit % 3 === 0) fColor = 'var(--color-primary, #1e3a8a)'; 
    else if (lastDigit % 3 === 1) fColor = 'var(--color-secondary, #3b82f6)';
    else fColor = 'var(--color-accent, #f59e0b)';

    return {
      fillColor: fColor,
      fillOpacity: 0.15,
      color: '#cbd5e1',  
      weight: 1,
      lineJoin: 'round' as const
    };
  };

  const [mapScroll, setMapScroll] = useState<number>(50);
  const baseLat = -7.7993667; 
  const minLng = 111.9000000; 
  const maxLng = 112.3500000; 
  const currentLng = minLng + ((mapScroll / 100) * (maxLng - minLng));

  function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.panTo(center, { animate: true, duration: 0.25 });
    }, [center, map]);
    return null;
  }

  useEffect(()=> {
    const initData = destinationData.find(data => data.id === 'd1')
    if (initData){
      setSelectedInfo({
        title: initData.name,
        desc: initData.desc, 
        img: initData.img,
        icon: initData.icon,
        mapColor: initData.mapColor
      })
    }
  }, [])
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tlDesktop = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 25%',
          end: 'center top',
          toggleActions: 'play reverse play reverse',
          onEnter: () => onActiveSection('destination'),
          onEnterBack : () => onActiveSection('destination')
        }
      });

      tlDesktop
        .to('.gsap-preview-image', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to('.gsap-heading-title', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
        .to('.gsap-info-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, "-=0.5")
        .to('.gsap-map-panel', { opacity: 1, duration: 1, ease: 'power2.inOut' }, "-=1");

      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '75% top',
          toggleActions: 'play reverse play reverse',
        }
      });

      tlMobile
        .to('.gsap-mobile-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.gsap-mobile-content', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id='destination' className="child-section w-full px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh flex flex-col lg:flex-row gap-10 overflow-hidden bg-background">
      
      {/* panel kiri (detail card) */}
      <div className="hidden lg:flex w-[50%] h-full flex-col justify-between gap-10 ">
        <div className='w-full flex justify-between gap-10'>
            <div 
                className='gsap-preview-image opacity-0 translate-y-10 relative mt-20 w-full aspect-square flex items-center justify-center backdrop-blur-md'
                style={{ backgroundImage: `url(${selectedInfo?.img})`}}
            >
                <div className='absolute inset-0 backdrop-blur-sm'/>
                <div className='absolute -top-20 w-[80%] aspect-5/6 mx-auto flex items-center justify-center shadow-white/30 shadow-md '>
                    <img src={selectedInfo?.img} alt='destinasi wisata' className="w-full h-full object-cover"/>
                </div>
            </div>
            <h3 className='gsap-heading-title opacity-0 -translate-x-10 max-w-[35%] text-6xl font-javamango tracking-[6px] font-bold text-accent mt-2 mb-4 transition-all duration-300'>Tourist <span className='font-mono tracking-normal'>Map</span></h3>
        </div>

        <div className="flex justify-between items-center gap-10 ">
          <div className='h-full aspect-square self-start '>
            <CreateCustomIconDetail colorClass={selectedInfo?.mapColor} IconComponent={selectedInfo?.icon} />
          </div>
          <div className='w-full h-full flex flex-col gap-5 items-start justify-start'>
            <h4 className='gsap-info-item opacity-0 translate-y-6 text-3xl text-accent font-semibold font-playfair-display tracking-wide'>{selectedInfo?.title}</h4>
            <p className='gsap-info-item opacity-0 translate-y-6 font-playfair-display text-xl tracking-wider'>{selectedInfo?.desc}</p>
            <button className='gsap-info-item relative opacity-0 translate-y-6 group flex items-center gap-2 font-playfair-display font-extralight tracking-[4px] text-base md:text-lg text-accent hover:text-secondary transition-colors duration-300'>
              <Link to={`/destination`} className='absolute inset-0'></Link>
              Lebih Lanjut 
              <IoArrowForwardOutline className="w-5 h-5 text-accent transform transition-transform duration-300 ease-out group-hover:translate-x-10 " />
            </button>
          </div>
        </div>
      </div>

      {/*  panel kanan (maps) */}
      <div className={`gsap-map-panel opacity-0 hidden lg:block w-[50%] h-full relative overflow-hidden`}>
        <div className="w-full h-full relative z-10 bg-transparent leaflet-transparent-override">
          <MapContainer 
           center={[-7.7993667, 112.1080696]}
            zoom={11} 
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
            touchZoom={false}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          >
            <GeoJSON 
              data={dataKecamatan as any} 
              style={styleKecamatan} 
            />

            {destinationData.map((poi) => (
              <Marker
                key={poi.id}
                position={[poi.lat, poi.lng]}
                icon={createCustomIconMap(activeMarkerId === poi.id, poi.mapColor, poi.icon)}
                eventHandlers={{
                  click: () => {
                    setActiveMarkerId(poi.id);
                    setSelectedInfo({
                      title: poi.name,
                      desc: poi.desc,
                      img: poi.img,
                      icon: poi.icon,
                      mapColor: poi.mapColor
                    });
                  }
                }}
              >
                <Popup>
                  <span className="font-medium text-slate-800 font-serif">{poi.name}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* MOBILE DAN TABLET MODE GUYS */}
        <div className={`flex lg:hidden w-full flex-col gap-18 justify-center items-center h-full ${activeMarkerId ? '' : ''}`}>
          <h3 className='gsap-mobile-title opacity-0 translate-y-6 w-full text-5xl text-center font-javamango tracking-[6px] font-bold text-accent transition-all duration-300'>Tourist Map</h3>
          {activeMarkerId ? 
            <div className='gsap-mobile-content opacity-0 scale-95 w-full h-full flex flex-col shadow-2xl border-2 border-slate-100 bg-background '>
              <div 
                  className='relative w-full aspect-square flex items-center justify-center'
                  style={{ backgroundImage: `url(${selectedInfo?.img})`}}
              >
                <div className='absolute inset-0 backdrop-blur-[2px]'/>
                <div className='absolute -top-5 w-[80%] aspect-5/6 mx-auto flex items-center justify-center shadow-white/30 shadow-md '>
                    <img src={selectedInfo?.img} alt='destinasi wisata' className="w-full h-full object-cover"/>
                </div>
              </div>
              
              <div className='h-full w-full flex flex-col p-4 gap-2 items-start justify-start'>
                <h4 className='text-2xl text-accent font-semibold font-playfair-display tracking-wide'>{selectedInfo?.title}</h4>
                <p className='font-playfair-display text-medium tracking-wider'>{selectedInfo?.desc}</p>
                <button className='group relative flex items-center gap-2 font-playfair-display font-extralight tracking-[4px] text-sm text-accent hover:text-secondary transition-colors duration-300'>
                  <Link to={`/destination`} className='absolute inset-0'></Link>
                  Lebih Lanjut 
                  <IoArrowForwardOutline className="w-4 h-4 text-accent transform transition-transform duration-300 ease-out group-hover:translate-x-10 " />
                </button>
                <button onClick={() => setActiveMarkerId(null)} className='group flex items-center gap-2 font-playfair-display font-extralight tracking-[4px] text-sm text-accent hover:text-secondary transition-colors duration-300'>
                  <IoArrowBackOutline className="w-4 h-4 text-accent transform transition-transform duration-300 ease-out group-hover:-translate-x-10 " />
                  Kembali ke Peta
                </button>
              </div>
            </div> : 
            <div className={`gsap-mobile-content opacity-0 scale-95 flex flex-col w-full h-full relative overflow-hidden gap-4`}>
              
              <div className="w-full flex-1 relative z-10 bg-transparent leaflet-transparent-override">
                <MapContainer 
                  center={[baseLat, currentLng]}
                  zoom={11} 
                  dragging={false} 
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  boxZoom={false}
                  keyboard={false}
                  touchZoom={false}
                  className="w-full h-full"
                  style={{ background: 'transparent' }}
                >
                  <MapUpdater center={[baseLat, currentLng]} />

                  <GeoJSON 
                    data={dataKecamatan as any} 
                    style={styleKecamatan} 
                  />

                  {destinationData.map((poi) => (
                    <Marker
                      key={poi.id}
                      position={[poi.lat, poi.lng]}
                      icon={createCustomIconMap(activeMarkerId === poi.id, poi.mapColor, poi.icon)}
                      eventHandlers={{
                        click: () => {
                          setActiveMarkerId(poi.id);
                          setSelectedInfo({
                            title: poi.name,
                            desc: poi.desc,
                            img: poi.img,
                            icon: poi.icon,
                            mapColor: poi.mapColor
                          });
                        }
                      }}
                    >
                      <Popup>
                        <span className="font-medium text-slate-800 font-serif">{poi.name}</span>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="w-full px-4 pb-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={mapScroll}
                  onChange={(e) => setMapScroll(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-accent"
                />
              </div>
            </div>
          }
        </div>
    </div>
  );
}