import { Zap, Shield, Globe, Cpu } from 'lucide-react';
import EditableText from '../EditableText';

interface FeaturesBlockProps {
  data: {
    items: {
      title: string;
      desc: string;
    }[];
  };
  onUpdate: (newData: any) => void;
  isDesignMode?: boolean;
}

const icons = [Zap, Shield, Globe, Cpu];

export default function FeaturesBlock({ data, onUpdate, isDesignMode = true }: FeaturesBlockProps) {
  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ items: newItems });
  };

  return (
    <div className="w-full py-16 px-10 bg-primary border-y border-nickel/10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" dir="rtl">
        {data.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={i} className="p-6 rounded-2xl bg-slate/30 border border-nickel/20 hover:border-accent/30 transition-all flex flex-col gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Icon className="w-6 h-6" />
              </div>
              <div dir="rtl">
                <h3 className="text-lg font-bold text-text mb-2">
                  <EditableText 
                    text={item.title} 
                    onSave={(val) => updateItem(i, 'title', val)} 
                    tagName="h3"
                    editable={isDesignMode}
                  />
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  <EditableText 
                    text={item.desc} 
                    onSave={(val) => updateItem(i, 'desc', val)} 
                    tagName="p"
                    editable={isDesignMode}
                  />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
