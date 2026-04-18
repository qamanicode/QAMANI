import { motion, AnimatePresence } from 'motion/react';
import { Search, X, FileText, Hash, CornerDownLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  content: string;
  href: string;
}

const mockDocs: SearchResult[] = [
  { id: '1', title: 'Getting Started', category: 'Guide', content: 'Learn how to install and set up QAMANIAI.', href: '#' },
  { id: '2', title: 'Configuration Reference', category: 'Config', content: 'Detailed documentation for all configuration options.', href: '#' },
  { id: '3', title: 'Plugin API', category: 'Plugins', content: 'How to write your own plugins for QAMANIAI.', href: '#' },
  { id: '4', title: 'HMR (Hot Module Replacement)', category: 'Guide', content: 'Understanding how HMR works in QAMANIAI.', href: '#' },
  { id: '5', title: 'Vite Comparison', category: 'Guide', content: 'How QAMANIAI differs from Vite and other build tools.', href: '#' },
  { id: '6', title: 'Environment Variables', category: 'Config', content: 'Using .env files and environment variables.', href: '#' },
  { id: '7', title: 'Static Asset Handling', category: 'Guide', content: 'Importing and serving static assets.', href: '#' },
  { id: '8', title: 'Build Optimization', category: 'Guide', content: 'Tips for optimizing your production builds.', href: '#' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = mockDocs.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.content.toLowerCase().includes(query.toLowerCase()) ||
      doc.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-slate border border-nickel rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-nickel">
              <Search className="w-5 h-5 text-grey" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow px-4 py-5 bg-transparent text-text placeholder-grey outline-none text-lg"
              />
              <button 
                onClick={onClose}
                className="p-1 hover:bg-primary/50 rounded-md text-grey hover:text-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === '' ? (
                <div className="py-12 text-center text-grey">
                  <p>No recent searches</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result) => (
                    <a
                      key={result.id}
                      href={result.href}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/50 group transition-colors"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary border border-nickel text-grey group-hover:text-accent group-hover:border-accent/50 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-accent uppercase tracking-wider">{result.category}</span>
                          <h4 className="text-text font-medium">{result.title}</h4>
                        </div>
                        <p className="text-grey text-sm line-clamp-1">{result.content}</p>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-grey opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-grey">
                  <p>No results for "<span className="text-text">{query}</span>"</p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-nickel bg-primary/30 flex items-center justify-between text-[10px] text-grey font-mono uppercase tracking-widest">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="bg-slate px-1 rounded border border-nickel">ENTER</kbd> to select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-slate px-1 rounded border border-nickel">↑↓</kbd> to navigate
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="bg-slate px-1 rounded border border-nickel">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
