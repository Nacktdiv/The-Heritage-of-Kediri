import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Eye, GripVertical } from 'lucide-react';

export interface SortableItemProps {
  id: string;
  name: string;
  category?: string;
  index: number;
  onRemove: (id: string) => void;
  onView: () => void;
}

export default function SortableDestinationItem({ id, name, category, index, onRemove, onView }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm border ${
        isDragging ? 'border-primary shadow-xl scale-[1.02] ring-2 ring-primary/20' : 'border-slate-100 hover:border-slate-300'
      } flex items-center justify-between transition-all duration-300 group`}
    >
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-primary transition-colors p-1"
        >
          <GripVertical size={16} />
        </div>
        <div className="w-6 h-6 rounded-full bg-background border border-slate-100 flex items-center justify-center font-mono text-xs text-secondary font-bold shrink-0">
          {index + 1}
        </div>
        <div className="flex flex-col truncate pr-2">
          <span className="font-playfair-display font-bold text-accent text-sm leading-tight truncate">{name}</span>
          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">{category || 'Point of Interest'}</span>
        </div>
      </div>
      <div className="flex items-center shrink-0">
        <button 
          onClick={(e) => { e.stopPropagation(); onView(); }}
          className="text-slate-400 hover:text-accent p-1.5 rounded-full hover:bg-slate-50 transition-colors"
        >
          <Eye size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(id); }} 
          className="text-slate-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}