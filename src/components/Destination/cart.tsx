import type { DestinationType } from "../../context";
import { IoTrashOutline, IoClose } from 'react-icons/io5'

type CartType = {
    destinationData : DestinationType[]
    destinationCart : String[]
    setDestinationCart : (data : String[]) => void
    isCartOpen : boolean
    setIsCartOpen : (data : boolean) => void
}

export default function Cart ({destinationData, destinationCart, setDestinationCart, isCartOpen, setIsCartOpen} : CartType) {

    const cartItems = destinationData.filter((dest: DestinationType) => 
        destinationCart.includes(dest.id)
    );

    const removeFromCart = (id: string) => {
        setDestinationCart(destinationCart.filter(cartId => cartId !== id));
    };

    return (
        <>

            {/*  CART DESKTOP SIDEBAR */}
            <div 
            className={`fixed inset-y-0 top-20 right-0 z-[60] hidden lg:flex flex-col w-[400px] bg-white shadow-2xl border-l border-slate-100 transition-transform duration-500 transform ${
                isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h3 className="font-javamango text-3xl text-accent">Trip Planner Cart</h3>
                    <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                    <IoClose size={20}/>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4">
                    {cartItems.length === 0 ? (
                    <p className="font-mono text-sm text-slate-400 text-center mt-10">You haven't added any destinations yet.</p>
                    ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center bg-background p-3 rounded-xl border border-slate-100 shadow-sm">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 overflow-hidden">
                            <h4 className="font-playfair-display font-bold text-accent text-lg leading-tight truncate">{item.name}</h4>
                            <span className="font-mono text-[10px] text-secondary uppercase">{item.category}</span>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-slate-400 hover:text-primary transition-colors p-2 shrink-0"
                        >
                            <IoTrashOutline size={20}/>
                        </button>
                        </div>
                    ))
                    )}
                </div>
            </div>

            {/*  CART MOBILE MODAL */}
            <div 
                className={`fixed inset-0 z-[60] lg:hidden flex justify-center items-end bg-black/40 backdrop-blur-sm transition-all duration-500 ${
                isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsCartOpen(false)}
            >
                <div 
                className={`w-full h-[80vh] bg-background rounded-t-3xl shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-500 ease-out delay-100 ${
                    isCartOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
                onClick={(e) => e.stopPropagation()} 
                >
                    <div className="w-full h-8 flex justify-center items-center absolute top-0 left-0 z-20" onClick={() => setIsCartOpen(false)}>
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full shadow-sm"></div>
                    </div>
                    <div className="p-6 pt-10 border-b border-slate-100 shrink-0">
                        <h3 className="font-javamango text-3xl text-accent text-center">Trip Planner Cart</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4">
                        {cartItems.length === 0 ? (
                        <p className="font-mono text-sm text-slate-400 text-center mt-10">You haven't added any destinations yet.</p>
                        ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl shadow-sm border border-slate-50">
                            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-playfair-display font-bold text-accent text-lg leading-tight truncate">{item.name}</h4>
                                <span className="font-mono text-[10px] text-secondary uppercase">{item.category}</span>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)} 
                                className="text-slate-400 hover:text-primary transition-colors p-2 shrink-0"
                            >
                                <IoTrashOutline size={20}/>
                            </button>
                            </div>
                        ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}