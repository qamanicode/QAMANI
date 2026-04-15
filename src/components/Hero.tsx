import { motion } from 'motion/react';
import { Github, ChevronRight, Copy, Check, Download, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('npm');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'npm', label: 'npm', command: 'npm create qamanai@latest' },
    { id: 'yarn', label: 'Yarn', command: 'yarn create qamanai' },
    { id: 'pnpm', label: 'pnpm', command: 'pnpm create qamanai' },
    { id: 'bun', label: 'Bun', command: 'bun create qamanai' },
  ];

  const copyToClipboard = () => {
    const command = tabs.find(t => t.id === activeTab)?.command || '';
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const config = `
import { defineConfig } from 'qamanai';
import react from '@qamanai/plugin-react';

// QAMANAI Configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
    `.trim();
    const blob = new Blob([config], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qamanai.config.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="wrapper wrapper--ticks grid md:grid-cols-2 w-full border-nickel md:divide-x divide-nickel relative overflow-hidden">
      <ParticlesBackground />
      <div className="flex flex-col p-10 md:p-20 justify-center gap-10 items-center md:items-start relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 items-center md:items-start text-center md:text-left"
        >
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-grey text-xs font-mono uppercase tracking-widest">By</span>
            <span className="text-text font-bold tracking-tighter text-lg group-hover:text-accent transition-colors">VoidZero</span>
          </a>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text text-pretty leading-[1.1]">
            The Build Tool <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41d1ff] to-[#bd34fe]">
              for the Web
            </span>
          </h1>
          
          <p className="text-grey text-lg md:text-xl max-w-md text-pretty leading-relaxed">
            QAMANAI is a blazing fast frontend build tool powering the next generation of web applications.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button 
              onClick={() => {
                document.getElementById('ai-generator')?.scrollIntoView({ behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('start-ai-gen'));
              }}
              className="button button--primary group"
            >
              Get Started
              <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={downloadConfig} 
              className="button gap-2 bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent text-accent shadow-[0_0_20px_rgba(100,108,255,0.1)] transition-all"
            >
              <Download className="w-5 h-5" />
              Download Config
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
            </button>
            <a href="https://github.com/qamanicode?tab=repositories" target="_blank" rel="noopener noreferrer" className="button gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center p-10 md:p-20 bg-primary/50 relative overflow-hidden z-10">
        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg mx-auto"
        >
          <div className="bg-slate rounded-xl border border-nickel overflow-hidden shadow-2xl">
            <div className="flex border-b border-nickel bg-primary/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-mono transition-colors relative ${
                    activeTab === tab.id ? 'text-text' : 'text-grey hover:text-text'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 font-mono text-sm sm:text-base relative group/terminal">
              <div className="flex items-center gap-3">
                <span className="text-accent">$</span>
                <span className="text-biege">
                  {tabs.find(t => t.id === activeTab)?.command}
                </span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-md bg-primary/50 border border-nickel text-grey hover:text-text transition-all opacity-0 group-hover/terminal:opacity-100"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <div className="relative w-full h-64 flex items-center justify-center">
               {/* Horizontal Dashed Lines */}
               <div className="absolute left-0 right-0 h-px border-t border-dashed border-nickel top-1/4 -z-10" />
               <div className="absolute left-0 right-0 h-px border-t border-dashed border-nickel bottom-1/4 -z-10" />
               
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="relative group"
               >
                 {/* Glowing Aura */}
                 <div className="absolute inset-0 bg-accent/30 blur-[60px] rounded-full group-hover:bg-accent/50 transition-all duration-500" />
                 
                 {/* 3D Cube Representation */}
                 <div className="relative w-40 h-40">
                   {/* Top Face (Glowing) */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-gradient-to-r from-[#41d1ff] to-[#bd34fe] rounded-full blur-sm opacity-80 animate-pulse" />
                   
                   {/* Main Body */}
                   <div className="absolute inset-0 bg-slate border border-nickel rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                     <span className="text-text font-bold text-5xl tracking-tighter">JS</span>
                   </div>
                   
                   {/* Floating Layers (as seen in image) */}
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -top-8 left-4 right-4 h-4 bg-slate/50 border border-nickel rounded-xl backdrop-blur-sm"
                   />
                   <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute -bottom-8 left-4 right-4 h-4 bg-slate/50 border border-nickel rounded-xl backdrop-blur-sm"
                   />
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
