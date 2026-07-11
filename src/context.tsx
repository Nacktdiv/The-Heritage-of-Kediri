import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { IconType } from 'react-icons';
import { 
  FaArchway, 
  FaMountainSun, 
  FaMonument, 
  FaWater, 
  FaPlaceOfWorship, 
  FaBookOpen, 
  FaTreeCity, 
  FaBowlFood, 
  // FaChurch, FaStore (Tersedia untuk digunakan jika ada tambahan data)
} from 'react-icons/fa6';

export interface DestinationType {
    id: string;
    name: string;
    category: string;
    lat: number;
    lng: number;
    desc: string;
    img: string;
    content: string;
    openTime: string;
    mapColor: string;
    icon: IconType;
}

export interface EventType {
  id: string;
  name: string;
  desc: string;
  content: string;
  location: string;
  time: string;
  img: string;
}

interface MainContextType {
  destinationData: DestinationType[];
  setDestinationData: (data: DestinationType[]) => void;
  eventData: EventType[]
  setEventData: (data: EventType[]) => void
  destinationCart : String[]
  setDestinationCart : (data: String[]) => void
}

export const dummyDestination: DestinationType[] = [
  { 
    id: 'd1', 
    name: 'Simpang Lima Gumul', 
    category: 'Landmark', 
    lat: -7.8324, 
    lng: 112.0673, 
    desc: 'Monumen ikonik Kabupaten Kediri yang bentuknya menyerupai L\'Arc de Triomphe di Paris.', 
    img: 'https://images.unsplash.com/photo-1627479799292-6f296c00d8b4', 
    content: 'Monumen Simpang Lima Gumul (SLG) adalah salah satu bangunan yang menjadi ikon Kabupaten Kediri. Bentuknya yang megah terinspirasi dari monumen serupa di Paris. Tempat ini tidak pernah sepi pengunjung, baik siang maupun malam hari. Di sekitarnya terdapat ruang terbuka hijau yang luas, pusat kuliner, dan sering menjadi pusat perayaan acara tahunan kota.', 
    openTime: '24 Jam',
    mapColor: 'text-primary',
    icon: FaArchway
  },
  { 
    id: 'd2', 
    name: 'Gunung Kelud', 
    category: 'Nature', 
    lat: -7.9355, 
    lng: 112.3083, 
    desc: 'Wisata alam gunung berapi aktif dengan kawah hijau yang eksotis.', 
    img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd', 
    content: 'Gunung Kelud menawarkan pesona alam yang luar biasa paska erupsi. Jalan setapak menuju kawah telah tertata rapi melintasi tebing-tebing batu yang menjulang tinggi. Warna air kawah yang hijau toska berpadu dengan kepulan asap belerang tipis menciptakan pemandangan magis yang tidak boleh dilewatkan.', 
    openTime: '06:00 - 17:00 WIB',
    mapColor: 'text-secondary',
    icon: FaMountainSun
  },
  { 
    id: 'd3', 
    name: 'Goa Selomangleng', 
    category: 'Culture', 
    lat: -7.8090, 
    lng: 111.9736, 
    desc: 'Goa batu peninggalan masa Kerajaan Kahuripan tempat pertapaan Dewi Kilisuci.', 
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2', 
    content: 'Goa Selomangleng merupakan situs bersejarah yang terletak di kaki Gunung Klotok. Goa ini dipercaya sebagai tempat pertapaan putri Raja Airlangga, yaitu Sanggramawijaya Tunggadewi atau Dewi Kilisuci. Relief kuno yang terpahat di dinding goa menceritakan epos peradaban masa lalu.', 
    openTime: '07:00 - 16:00 WIB',
    mapColor: 'text-accent',
    icon: FaMonument
  },
  { 
    id: 'd4', 
    name: 'Air Terjun Dolo', 
    category: 'Nature', 
    lat: -7.8741, 
    lng: 111.8601, 
    desc: 'Air terjun bertingkat di lereng Gunung Wilis dengan udara pegunungan yang sangat sejuk.', 
    img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8fb', 
    content: 'Tersembunyi di rimbunnya hutan pinus lereng Gunung Wilis, Air Terjun Dolo mengalir jernih membelah bebatuan. Perjalanan menuju lokasi ini cukup menantang karena harus melewati ratusan anak tangga, namun sepadan dengan kesegaran alami yang didapatkan.', 
    openTime: '08:00 - 16:00 WIB',
    mapColor: 'text-secondary',
    icon: FaWater
  },
  { 
    id: 'd5', 
    name: 'Kampung Inggris', 
    category: 'Culture', 
    lat: -7.7658, 
    lng: 112.1936, 
    desc: 'Kawasan edukasi bahasa asing terbesar di Indonesia dengan ratusan lembaga kursus.', 
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', 
    content: 'Berada di Desa Tulungrejo, Kecamatan Pare, tempat ini adalah fenomenal. Ratusan pemuda dari seluruh Indonesia berkumpul di sini untuk belajar bahasa asing. Suasana kampung yang didominasi oleh perbincangan bahasa Inggris menjadikannya tempat wisata edukasi yang sangat unik.', 
    openTime: '08:00 - 21:00 WIB',
    mapColor: 'text-primary',
    icon: FaBookOpen
  },
  { 
    id: 'd6', 
    name: 'Jalan Dhoho', 
    category: 'Culinary', 
    lat: -7.8200, 
    lng: 112.0150, 
    desc: 'Pusat perbelanjaan dan surga wisata kuliner malam Nasi Pecel Tumpang khas Kediri.', 
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', 
    content: 'Ketika malam tiba, emperan toko di Jalan Dhoho bertransformasi menjadi jejeran lesehan yang menyajikan hidangan legendaris Nasi Pecel Tumpang. Suasana malam kota Kediri sangat terasa di sini, ditemani alunan musik musisi jalanan.', 
    openTime: '18:00 - 02:00 WIB',
    mapColor: 'text-accent',
    icon: FaBowlFood
  },
  { 
    id: 'd7', 
    name: 'Taman Brantas', 
    category: 'Landmark', 
    lat: -7.8058, 
    lng: 112.0076, 
    desc: 'Taman rekreasi kota yang asri di bantaran Sungai Brantas.', 
    img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f', 
    content: 'Taman RTH (Ruang Terbuka Hijau) modern ini menjadi tempat favorit warga untuk bersantai sore. Terdapat area bermain, lintasan lari, dan pemandangan jembatan Brawijaya yang membentang indah di atas aliran Sungai Brantas.', 
    openTime: '24 Jam',
    mapColor: 'text-primary',
    icon: FaTreeCity
  },
  { 
    id: 'd8', 
    name: 'Candi Surawana', 
    category: 'Culture', 
    lat: -7.7554, 
    lng: 112.2148, 
    desc: 'Candi Hindu peninggalan Kerajaan Majapahit yang terletak di daerah Pare.', 
    img: 'https://images.unsplash.com/photo-1599385078832-680415a786ea', 
    content: 'Candi Surawana atau Candi Wishnubhawanapura adalah candi bercorak Hindu yang dibangun untuk memuliakan Bhre Wengker. Candi ini dihiasi dengan relief-relief indah yang menceritakan kisah-kisah tantri dan Sri Tanjung.', 
    openTime: '08:00 - 15:00 WIB',
    mapColor: 'text-secondary',
    icon: FaPlaceOfWorship
  },
];

export const dummyEvent: EventType[] = [
  {
    id: 'evt-1',
    name: 'Karya Kreatif Mataraman 2026',
    desc: 'Pameran inovasi UMKM, parade kreasi wastra berkelanjutan, dan festival ekonomi digital terbesar se-eks Karesidenan Kediri.',
    content: 'Karya Kreatif Mataraman (KKM) kembali hadir dan berkolaborasi dengan Pemkot Kediri serta Bank Indonesia. Mengusung tema "Sinergi dan Inovasi Digital Untuk Akselerasi Ekonomi Berkelanjutan", event ini menghadirkan lebih dari 70 UMKM unggulan, talkshow interaktif, kompetisi E-Sport Mobile Legends, dan hiburan Stand Up Comedy. Pengunjung diajak berbelanja produk lokal berkualitas (kriya, wastra, dan kuliner) sembari dibiasakan dengan ekosistem transaksi digital menggunakan QRIS.',
    location: 'Taman Hijau, Simpang Lima Gumul (SLG), Kab. Kediri',
    time: '26 - 28 Juni 2026',
    img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e' // Tema pameran/festival malam
  },
  {
    id: 'evt-2',
    name: 'Jambore Daerah RX King Jatim',
    desc: 'Ajang kumpul akbar ribuan pecinta otomotif roda dua se-Jawa Timur untuk memeriahkan Hari Jadi Kota Kediri.',
    content: 'Kota Kediri bangga menjadi tuan rumah Jambore Daerah (Jamda) RX King Jawa Timur 2026. Acara otomotif berskala regional ini diperkirakan dihadiri lebih dari 5.000 peserta dan komunitas dari berbagai daerah. Tidak sekadar ajang silaturahmi, acara ini diselaraskan dengan visi Kediri City Tourism untuk mendongkrak perekonomian lokal. Pengunjung dapat menikmati bursa otomotif, hiburan musik panggung terbuka, serta festival kuliner kaki lima di sekitar lokasi.',
    location: 'Kawasan GOR Joyoboyo, Kota Kediri',
    time: '11 - 12 Juli 2026',
    img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' // Tema motor/komunitas
  },
  {
    id: 'evt-3',
    name: 'Selomangleng Performance Art',
    desc: 'Pertunjukan seni tari dan budaya teatrikal magis yang berlatar belakang keindahan peninggalan sejarah Kediri.',
    content: 'Sebagai bagian dari peringatan kekayaan budaya Kota Kediri, Selomangleng Performance Art menyajikan perpaduan seni tari tradisional, sendratari, dan teater kontemporer. Diadakan tepat di depan situs sejarah Goa Selomangleng, pertunjukan ini mengangkat kembali epik sejarah dan legenda Panji. Didukung dengan tata cahaya modern dan panggung terbuka, event ini berhasil menghipnotis wisatawan domestik maupun mancanegara yang ingin menyaksikan keanggunan peradaban masa lalu.',
    location: 'Kawasan Wisata Goa Selomangleng, Kota Kediri',
    time: '11 - 12 Juli 2026',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' // Tema seni tari/budaya
  }
];

export const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [destinationData, setDestinationData] = useState<DestinationType[]>(dummyDestination);
  const [eventData, setEventData] = useState<EventType[]>(dummyEvent)
  const [destinationCart, setDestinationCart] = useState<String[]>([])

  return (
    <MainContext.Provider value={{ destinationData, setDestinationData, eventData, setEventData, destinationCart, setDestinationCart }}>
      {children}
    </MainContext.Provider>
  );
};   