import { motion } from 'motion/react';
import { Terminal, Play, Rocket, Globe, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const cliCommands = [
  {
    id: 'dev',
    title: 'تطوير فوري',
    command: 'qamanai dev',
    description: 'ابدأ خادم التطوير مع دعم HMR فائق السرعة.',
    icon: Play,
    color: 'text-blue-500',
  },
  {
    id: 'build',
    title: 'بناء للإنتاج',
    command: 'qamanai build',
    description: 'قم بتحسين الكود وضغطه ليكون جاهزاً للنشر بأعلى أداء.',
    icon: Rocket,
    color: 'text-purple-500',
  },
  {
    id: 'deploy',
    title: 'نشر سحابي',
    command: 'qamanai deploy',
    description: 'انشر موقعك على سحابة QAMANAI بضغطة زر واحدة.',
    icon: Globe,
    color: 'text-green-500',
  },
  {
    id: 'ai',
    title: 'توليد ذكي',
    command: 'qamanai ai "متجر إلكتروني"',
    description: 'استخدم قوة الذكاء الاصطناعي لتوليد المكونات والصفحات.',
    icon: Sparkles,
    color: 'text-accent',
  },
];

export default function CLISection() {
  const [activeCmd, setActiveCmd] = useState(cliCommands[0]);
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(activeCmd.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="config" className="py-24 border-t border-nickel bg-primary/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="wrapper px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              <Terminal className="w-4 h-4" />
              <span>واجهة سطر الأوامر (CLI)</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight leading-tight">
              تحكم كامل في مشروعك <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41d1ff] to-[#bd34fe]">
                من خلال سطر الأوامر
              </span>
            </h2>
            
            <p className="text-grey text-lg leading-relaxed">
              أداة QAMANAI CLI مصممة لتسريع سير عملك. من التطوير المحلي إلى النشر العالمي، كل شيء متاح بين يديك.
            </p>

            <div className="grid gap-4">
              {cliCommands.map((cmd) => (
                <motion.button
                  key={cmd.id}
                  onClick={() => setActiveCmd(cmd)}
                  whileHover={{ x: 8, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all text-right group ${
                    activeCmd.id === cmd.id 
                      ? 'bg-slate border-accent/50 shadow-lg' 
                      : 'bg-transparent border-nickel hover:border-accent/30 hover:bg-slate/30'
                  }`}
                  dir="rtl"
                >
                  <div className={`p-2 rounded-xl bg-primary border border-nickel transition-colors ${activeCmd.id === cmd.id ? 'text-accent border-accent/30' : 'text-grey group-hover:text-accent group-hover:border-accent/30'}`}>
                    <cmd.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-bold transition-colors ${activeCmd.id === cmd.id ? 'text-text' : 'text-grey group-hover:text-text'}`}>{cmd.title}</h4>
                    <p className="text-sm text-grey/70 transition-colors group-hover:text-grey">{cmd.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-transparent blur-2xl rounded-[2.5rem] -z-10" />
            
            <div className="bg-[#0d1117] border border-nickel rounded-2xl shadow-2xl overflow-hidden font-mono">
              {/* Terminal Header */}
              <div className="bg-[#161b22] px-4 py-3 border-b border-nickel flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs text-grey">qamanai-cli — bash</span>
                <div className="w-12" />
              </div>
              
              {/* Terminal Body */}
              <div className="p-8 space-y-6 text-sm md:text-base">
                <div className="flex items-center gap-3">
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-400">~/my-project</span>
                  <span className="text-grey">git:(main)</span>
                </div>
                
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="text-accent">$</span>
                    <motion.span 
                      key={activeCmd.command}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-biege"
                    >
                      {activeCmd.command}
                    </motion.span>
                  </div>
                  <button 
                    onClick={copyCommand}
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-grey hover:text-text transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <motion.div
                  key={`${activeCmd.id}-output`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 text-grey/80"
                >
                  {activeCmd.id === 'dev' && (
                    <>
                      <p className="text-green-500">VITE v5.0.0  ready in 125 ms</p>
                      <p>➜  Local:   <span className="text-blue-400 underline">http://localhost:3000/</span></p>
                      <p>➜  Network: use --host to expose</p>
                    </>
                  )}
                  {activeCmd.id === 'build' && (
                    <>
                      <p>vite v5.0.0 building for production...</p>
                      <p>✓ 45 modules transformed.</p>
                      <p className="text-green-500">dist/index.html                  0.45 kB</p>
                      <p className="text-green-500">dist/assets/index-D123.js      145.20 kB</p>
                    </>
                  )}
                  {activeCmd.id === 'deploy' && (
                    <>
                      <p>Deploying to QAMANAI Cloud...</p>
                      <p>Uploading assets [====================] 100%</p>
                      <p className="text-green-500">🚀 Site is live at: <span className="text-blue-400 underline">https://my-app.qamanai.app</span></p>
                    </>
                  )}
                  {activeCmd.id === 'ai' && (
                    <>
                      <p>Analyzing prompt: "متجر إلكتروني"</p>
                      <p>Generating components...</p>
                      <p className="text-accent">✨ Created: src/components/Store.tsx</p>
                      <p className="text-accent">✨ Created: src/styles/store.css</p>
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-slate border border-nickel p-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-grey">Site Visibility</p>
                <p className="text-sm font-bold text-text">Public & Live</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
