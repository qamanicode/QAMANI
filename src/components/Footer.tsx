import { Github, Twitter, Disc as Discord } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-nickel">
      <section className="relative overflow-hidden border-b border-nickel">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
        <div className="wrapper px-10 py-20 md:py-32 flex flex-col items-center text-center gap-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-text tracking-tight">
            Start building with QAMANAI
          </h2>
          <p className="text-grey text-lg max-w-xl">
            Prepare for a development environment that can finally keep pace with the speed of your mind.
          </p>
          <a href="#" className="button button--white px-10 py-4 text-lg">
            Get Started
          </a>
        </div>
      </section>

      <section className="wrapper wrapper--ticks py-16 px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-grey text-xs font-mono uppercase tracking-widest mb-8">QAMANAI</h4>
            <ul className="flex flex-col gap-3">
              {['Guide', 'Config', 'Plugins'].map(item => (
                <li key={item}><a href="#" className="text-biege hover:text-text transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-grey text-xs font-mono uppercase tracking-widest mb-8">Resources</h4>
            <ul className="flex flex-col gap-3">
              {['Team', 'Blog', 'Releases'].map(item => (
                <li key={item}><a href="#" className="text-biege hover:text-text transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-grey text-xs font-mono uppercase tracking-widest mb-8">Versions</h4>
            <ul className="flex flex-col gap-3">
              {['Vite 7 Docs', 'Vite 6 Docs', 'Vite 5 Docs'].map(item => (
                <li key={item}><a href="#" className="text-biege hover:text-text transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-grey text-xs font-mono uppercase tracking-widest mb-8">Social</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="https://github.com/qamanicode?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-biege hover:text-text transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></li>
              <li><a href="https://share.google/XGLH4gqQCm7ReempG" target="_blank" rel="noopener noreferrer" className="text-biege hover:text-text transition-colors flex items-center gap-2"><Discord className="w-4 h-4" /> Discord</a></li>
              <li><a href="https://x.com/QAMANICODE" target="_blank" rel="noopener noreferrer" className="text-biege hover:text-text transition-colors flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wrapper wrapper--ticks border-t border-nickel py-8 px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-grey text-sm">
          © 2019-present VoidZero Inc. and QAMANAI contributors.
        </p>
        <div className="flex gap-8 text-sm text-grey">
          <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
        </div>
      </section>
    </footer>
  );
}
