import React, { useState } from 'react';
import { Sparkles, Terminal, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { aiService, BlockData } from '../../services/aiService';

interface CommandBarProps {
  onLayoutGenerated: (blocks: BlockData[]) => void;
}

export default function CommandBar({ onLayoutGenerated }: CommandBarProps) {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const blocks = await aiService.generateLayout(query);
      if (blocks.length > 0) {
        onLayoutGenerated(blocks);
        setQuery('');
      }
    } catch (error) {
      console.error("AI Command failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-slate/50 border-b border-nickel/20">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-grey group-focus-within:text-accent transition-colors">
          <Terminal className="w-4 h-4" />
        </div>
        
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type design command (e.g., 'Modern landing page for a gym', 'Add a pricing section')..."
          className="w-full bg-primary border border-nickel rounded-xl py-3 pl-12 pr-28 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-opacity-50"
          disabled={isGenerating}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button
            type="submit"
            disabled={!query.trim() || isGenerating}
            className="flex items-center gap-2 bg-accent text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Working...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                Deploy AI
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
