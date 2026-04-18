import { ArrowRight, Sparkles } from 'lucide-react';
import EditableText from '../EditableText';

interface HeroBlockProps {
  data: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    imageUrl: string;
  };
  onUpdate: (newData: any) => void;
}

export default function HeroBlock({ data, onUpdate }: HeroBlockProps) {
  return (
    <div className="w-full py-20 px-10 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-primary to-slate/20">
      <div className="flex-1 space-y-6 text-right" dir="rtl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs">
          <Sparkles className="w-3 h-3" />
          <EditableText 
            text={data.badge} 
            onSave={(val) => onUpdate({ badge: val })} 
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight">
          <EditableText 
            text={data.title} 
            onSave={(val) => onUpdate({ title: val })} 
            tagName="h1"
          />
        </h1>
        <p className="text-grey text-lg max-w-lg">
          <EditableText 
            text={data.subtitle} 
            onSave={(val) => onUpdate({ subtitle: val })} 
            tagName="p"
          />
        </p>
        <div className="flex items-center gap-4 pt-4">
          <button className="px-8 py-3 rounded-full bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
            <EditableText 
              text={data.primaryCta} 
              onSave={(val) => onUpdate({ primaryCta: val })} 
            />
          </button>
          <button className="px-8 py-3 rounded-full border border-nickel text-text hover:bg-white/5 transition-colors flex items-center gap-2">
            <EditableText 
              text={data.secondaryCta} 
              onSave={(val) => onUpdate({ secondaryCta: val })} 
            />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md aspect-square rounded-3xl bg-slate border border-nickel relative overflow-hidden group">
        <img 
          src={data.imageUrl} 
          alt="Preview" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
      </div>
    </div>
  );
}
