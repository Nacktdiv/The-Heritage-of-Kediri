import type { DestinationType } from "../../context"
import { IoClose, IoAdd, IoTimeOutline, IoLocationOutline } from 'react-icons/io5'

type SidebarType = {
    selectedDest : DestinationType | null
    setSelectedDest : (data : DestinationType | null) => void
    addToCart : (data: String) => void
}

export default function Sidebar ({selectedDest, setSelectedDest, addToCart}: SidebarType) {
    return (
        <div 
            className={`hidden lg:flex flex-col h-[90%] bg-white rounded-3xl shadow-2xl border border-slate-100 transition-all duration-500 transform overflow-hidden ${
                selectedDest ? 'w-[400px] translate-x-0 opacity-100' : 'w-0 translate-x-full opacity-0'
            }`}
        >
        {selectedDest && (
            <div className="w-full h-full flex flex-col relative">
            <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-accent transition-colors"
            >
                <IoClose size={20} />
            </button>
            <button 
                onClick={() => addToCart(selectedDest.id)}
                className="absolute top-4 left-4 z-20 h-10 px-4 bg-accent/80 backdrop-blur-md rounded-full flex gap-2 justify-between items-center text-white hover:bg-secondary transition-colors"
            > 
                <span className='text-sm font-mono'>Tambahkan Rencana</span>
                <IoAdd size={20} />
            </button>
            
            <div className="h-[40%] w-full relative shrink-0">
                <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 -mt-10 relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                <IoLocationOutline size={16} /> {selectedDest.category}
                </div>
                
                <h3 className="font-javamango text-4xl text-accent tracking-[2px] leading-tight">
                {selectedDest.name}
                </h3>
                
                <div className="flex items-center gap-2 font-mono text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <IoTimeOutline className="text-secondary" size={18} />
                <span>Open: {selectedDest.openTime}</span>
                </div>

                <p className="font-playfair-display text-lg text-slate-800 leading-relaxed font-semibold mt-2">
                {selectedDest.desc}
                </p>

                <p className="font-mono text-sm text-slate-600 leading-relaxed text-justify pb-10">
                {selectedDest.content}
                </p>
            </div>
            </div>
        )}
        </div>
    )
}