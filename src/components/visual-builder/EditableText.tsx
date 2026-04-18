import React, { useRef, useEffect, useState } from 'react';
import { Wand2, Globe, Search, Loader2, Check } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { motion, AnimatePresence } from 'motion/react';

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  editable?: boolean;
}

export default function EditableText({ text, onSave, className = '', tagName = 'span', editable = true }: EditableTextProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [showMagicMenu, setShowMagicMenu] = useState(false);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [justApplied, setJustApplied] = useState(false);

  const handleBlur = () => {
    if (elementRef.current && editable) {
      const newText = elementRef.current.innerText;
      if (newText !== text) {
        onSave(newText);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!editable) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const handleMagicAction = async (action: 'improve' | 'seo' | 'translate') => {
    setIsAiWorking(true);
    try {
      const result = await aiService.magicPen(text, action);
      onSave(result);
      if (elementRef.current) elementRef.current.innerText = result;
      setJustApplied(true);
      setTimeout(() => setJustApplied(false), 2000);
    } catch (e) {
      console.error("Magic Pen failed", e);
    } finally {
      setIsAiWorking(false);
      setShowMagicMenu(false);
    }
  };

  // Sync internal text if external text changes
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== text) {
      elementRef.current.innerText = text;
    }
  }, [text]);

  return (
    <div className="relative inline-block group/editable">
      {React.createElement(tagName, {
        ref: elementRef,
        contentEditable: editable,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        onFocus: () => editable && setShowMagicMenu(true),
        className: `outline-none transition-all ${className} ${editable ? 'focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary rounded px-1 hover:bg-accent/10 cursor-text' : ''}`,
        dangerouslySetInnerHTML: { __html: text }
      })}

      <AnimatePresence>
        {editable && (showMagicMenu || isAiWorking || justApplied) && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-50 -top-10 left-0 flex items-center gap-1 bg-slate border border-nickel p-1 rounded-lg shadow-xl"
            onMouseLeave={() => !isAiWorking && setShowMagicMenu(false)}
          >
            {isAiWorking ? (
              <div className="px-3 py-1 flex items-center gap-2 text-[10px] text-accent font-bold">
                <Loader2 className="w-3 h-3 animate-spin" />
                Gemini working...
              </div>
            ) : justApplied ? (
              <div className="px-3 py-1 flex items-center gap-2 text-[10px] text-green-500 font-bold">
                <Check className="w-3 h-3" />
                Applied!
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleMagicAction('improve')}
                  className="p-1.5 hover:bg-accent/10 rounded text-grey hover:text-accent transition-colors"
                  title="Improve with AI"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleMagicAction('seo')}
                  className="p-1.5 hover:bg-accent/10 rounded text-grey hover:text-accent transition-colors"
                  title="SEO Optimize"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleMagicAction('translate')}
                  className="p-1.5 hover:bg-accent/10 rounded text-grey hover:text-accent transition-colors"
                  title="Translate to English"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
