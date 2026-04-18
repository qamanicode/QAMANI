import { Search, Github, Twitter, Disc as Discord, ExternalLink, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const versions = [
    { label: 'v8.0.8 (latest)', href: '#' },
    { label: 'v7.x.x', href: '#' },
    { label: 'v6.x.x', href: '#' },
    { label: 'v5.x.x', href: '#' },
  ];

  const resources = [
    { label: 'Team', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Releases', href: '#' },
    { label: 'Acknowledgements', href: '#' },
    { label: 'Plugin Registry', href: '#' },
  ];

  return (
    <div className="relative w-full z-50">
      <header className="wrapper px-6 py-5 flex items-center justify-between relative bg-primary border-b border-nickel">
        <div className="flex gap-10 items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#41d1ff] to-[#bd34fe] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-text">QAMANAI</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { name: 'Guide', id: 'guide' },
              { name: 'Config', id: 'config' },
              { name: 'Plugins', id: 'plugins' }
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                className="px-3 py-2 text-sm font-medium text-biege hover:text-text transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="relative">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-biege hover:text-text transition-colors"
              >
                More <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate border border-nickel rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-grey">Resources</div>
                  {resources.map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      className="block px-4 py-2 text-sm text-biege hover:text-text hover:bg-primary/50 transition-colors"
                    >
                      {r.label}
                    </a>
                  ))}
                  <div className="border-t border-nickel my-2" />
                  <div className="px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-grey">Versions</div>
                  {versions.map((v) => (
                    <a
                      key={v.label}
                      href={v.href}
                      className="block px-4 py-2 text-sm text-biege hover:text-text hover:bg-primary/50 transition-colors"
                    >
                      {v.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 bg-slate border border-nickel rounded-md text-grey hover:border-accent/50 transition-all text-sm min-w-[200px]"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
              <span className="ml-auto flex items-center gap-1 text-[10px] font-mono">
                <kbd className="bg-primary px-1 rounded border border-nickel">⌘</kbd>
                <kbd className="bg-primary px-1 rounded border border-nickel">K</kbd>
              </span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-4 text-grey">
            <a href="https://x.com/QAMANICODE" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="https://share.google/XGLH4gqQCm7ReempG" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors"><Discord className="w-5 h-5" /></a>
            <a href="https://github.com/qamanicode?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors"><Github className="w-5 h-5" /></a>
            
            <div className="w-px h-4 bg-nickel mx-2" />
            
            <button 
              onClick={toggleTheme}
              className="p-2 hover:text-text transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-biege hover:text-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary border-b border-nickel p-6 flex flex-col gap-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          {[
            { name: 'Guide', id: 'guide' },
            { name: 'Config', id: 'config' },
            { name: 'Plugins', id: 'plugins' }
          ].map((item) => (
            <a 
              key={item.name} 
              href={`#${item.id}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-biege hover:text-text"
            >
              {item.name}
            </a>
          ))}
          <div className="border-t border-nickel my-2" />
          <div className="px-2 text-[10px] font-mono uppercase tracking-widest text-grey">Resources</div>
          {resources.map((r) => (
            <a 
              key={r.label} 
              href={r.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-biege hover:text-text"
            >
              {r.label}
            </a>
          ))}
          <div className="border-t border-nickel my-2" />
          <div className="px-2 text-[10px] font-mono uppercase tracking-widest text-grey">Versions</div>
          {versions.map((v) => (
            <a 
              key={v.label} 
              href={v.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-biege hover:text-text"
            >
              {v.label}
            </a>
          ))}
          <div className="border-t border-nickel my-2" />
          <div className="flex items-center gap-6 py-2">
            <a href="https://x.com/QAMANICODE" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-grey hover:text-text transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="https://share.google/XGLH4gqQCm7ReempG" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-grey hover:text-text transition-colors"><Discord className="w-6 h-6" /></a>
            <a href="https://github.com/qamanicode?tab=repositories" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-grey hover:text-text transition-colors"><Github className="w-6 h-6" /></a>
            <button 
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="text-grey hover:text-text transition-colors ml-auto"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
