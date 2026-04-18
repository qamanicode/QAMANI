import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, Wand2 } from 'lucide-react';
import { aiService, BlockData } from '../../services/aiService';

interface VisionUploaderProps {
  onLayoutGenerated: (blocks: BlockData[]) => void;
}

export default function VisionUploader({ onLayoutGenerated }: VisionUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const blocks = await aiService.visionToLayout(base64);
        if (blocks.length > 0) {
          onLayoutGenerated(blocks);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Vision AI failed", error);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50 transition-all border border-accent/20 shadow-lg shadow-accent/20 group"
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Vision-to-Layout</span>
          </>
        )}
      </button>
      <div className="mt-2 text-[10px] text-grey text-center italic">
        Upload a sketch or screenshot to analyze
      </div>
    </div>
  );
}
