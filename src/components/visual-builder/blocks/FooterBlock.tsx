import EditableText from '../EditableText';

interface FooterBlockProps {
  data: {
    logoText: string;
    desc: string;
    copyright: string;
  };
  onUpdate: (newData: any) => void;
  isDesignMode?: boolean;
}

export default function FooterBlock({ data, onUpdate, isDesignMode = true }: FooterBlockProps) {
  return (
    <footer className="w-full py-12 px-10 bg-slate/50 border-t border-nickel/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8" dir="rtl">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white font-bold">Q</div>
            <EditableText 
              text={data.logoText} 
              onSave={(val) => onUpdate({ logoText: val })} 
              className="font-bold text-text text-xl tracking-wider px-2"
              editable={isDesignMode}
            />
          </div>
          <p className="text-grey text-sm max-w-xs text-center md:text-right">
            <EditableText 
              text={data.desc} 
              onSave={(val) => onUpdate({ desc: val })} 
              tagName="p"
              editable={isDesignMode}
            />
          </p>
        </div>
        <div className="flex gap-12">
          <div className="space-y-3 text-center md:text-right">
            <h4 className="font-bold text-text text-sm uppercase tracking-widest text-grey">Products</h4>
            <div className="flex flex-col gap-2 text-xs text-grey">
              <span className="hover:text-accent cursor-pointer">Builder</span>
              <span className="hover:text-accent cursor-pointer">AI Engine</span>
            </div>
          </div>
          <div className="space-y-3 text-center md:text-right">
            <h4 className="font-bold text-text text-sm uppercase tracking-widest text-grey">Company</h4>
            <div className="flex flex-col gap-2 text-xs text-grey">
              <span className="hover:text-accent cursor-pointer">About</span>
              <span className="hover:text-accent cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-nickel/5 text-center">
        <EditableText 
          text={data.copyright} 
          onSave={(val) => onUpdate({ copyright: val })} 
          className="text-[10px] text-grey/50"
          editable={isDesignMode}
        />
      </div>
    </footer>
  );
}
