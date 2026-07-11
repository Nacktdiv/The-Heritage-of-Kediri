import type { DestinationType } from "../../context"
import { IoAdd, IoTimeOutline, IoLocationOutline } from 'react-icons/io5'

type ModalType = {
    selectedDest : DestinationType | null
    setSelectedDest : (data : DestinationType | null) => void
    addToCart : (data: String) => void
}

export default function Modal ({selectedDest, setSelectedDest, addToCart}: ModalType) {
    return (
        <div 
            className={`fixed inset-0 z-[40] lg:hidden flex justify-center items-end bg-black/40 backdrop-blur-sm transition-all duration-500 ${
            selectedDest ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={() => setSelectedDest(null)}
        >
            <div 
            className={`w-full h-[85vh] bg-background rounded-t-3xl shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-500 ease-out delay-100 ${
                selectedDest ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={(e) => e.stopPropagation()} 
            >
            {selectedDest && (
                <>
                <div className="w-full h-8 flex justify-center items-center absolute top-0 left-0 z-20" onClick={() => setSelectedDest(null)}>
                    <div className="w-12 h-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-sm"></div>
                </div>

                <div className="h-[35%] w-full relative shrink-0">
                    <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-2 pb-10 relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 font-mono text-xs text-primary font-semibold uppercase">
                        <IoLocationOutline size={14} /> {selectedDest.category}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                        <IoTimeOutline className="text-secondary" /> {selectedDest.openTime}
                    </div>
                    </div>
                    
                    <h3 className="font-javamango text-4xl text-accent tracking-[2px] leading-none">
                    {selectedDest.name}
                    </h3>
                    
                    <p className="font-playfair-display text-base text-slate-800 leading-snug font-semibold mt-1">
                    {selectedDest.desc}
                    </p>

                    <div className="w-8 h-[2px] bg-secondary my-2"></div>

                    <p className="font-mono text-sm text-slate-600 leading-relaxed text-justify">
                    {selectedDest.content}
                    </p>

                    <button 
                    onClick={() => addToCart(selectedDest.id)}
                    className=" w-full h-12 mt-2 px-6 bg-secondary rounded-full flex justify-between items-center text-white hover:bg-accent transition-colors shrink-0 shadow-md"
                    > 
                    <span className='font-mono'>Tambahkan Rencana</span>
                    <IoAdd size={22} />
                    </button>
                </div>
                </>
            )}
            </div>
        </div>
    )
}