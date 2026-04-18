import { Layout } from 'lucide-react';
import EditableText from '../EditableText';

interface NavbarBlockProps {
  data: {
    logoText: string;
    links: string[];
    ctaText: string;
  };
  onUpdate: (newData: any) => void;
  isDesignMode?: boolean;
}

export default function NavbarBlock({ data, onUpdate, isDesignMode = true }: NavbarBlockProps) {
  const updateLink = (index: number, value: string) => {
    const newLinks = [...data.links];
    newLinks[index] = value;
    onUpdate({ links: newLinks });
  };

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-nickel/20 bg-primary/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white font-bold">Q</div>
        <EditableText 
          text={data.logoText} 
          onSave={(val) => onUpdate({ logoText: val })} 
          className="font-bold text-text"
          editable={isDesignMode}
        />
      </div>
      <div className="hidden md:flex items-center gap-6">
        {data.links.map((link, i) => (
          <EditableText 
            key={i}
            text={link} 
            onSave={(val) => updateLink(i, val)} 
            className="text-sm text-grey hover:text-accent cursor-pointer px-2"
            editable={isDesignMode}
          />
        ))}
      </div>
      <button className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
        <EditableText 
          text={data.ctaText} 
          onSave={(val) => onUpdate({ ctaText: val })} 
          editable={isDesignMode}
        />
      </button>
    </nav>
  );
}
