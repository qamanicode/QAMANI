import { motion } from 'motion/react';
import { Heart, ExternalLink } from 'lucide-react';

export default function Sponsors() {
  return (
    <section className="border-t border-nickel py-24 bg-primary/50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="wrapper px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Branding/Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-center lg:items-start gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#41d1ff] to-[#bd34fe] rounded-3xl rotate-12 blur-xl opacity-20" />
                <div className="relative w-full h-full bg-slate border border-nickel rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-2">
                       <span className="text-primary font-bold text-2xl md:text-3xl">Ø</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-grey font-mono text-sm uppercase tracking-[0.2em]">Brought to you by</span>
                <span className="text-text text-3xl md:text-4xl font-bold tracking-tight">VoidZero</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-[1.5] text-center lg:text-left space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
              مجاني ومفتوح المصدر
            </h2>
            <p className="text-grey text-lg md:text-xl leading-relaxed max-w-2xl">
              برنامج <span className="text-text font-semibold">QAMANAI</span> مرخص بموجب ترخيص MIT وسيظل دائمًا مجانيًا ومفتوح المصدر. هذا بفضل مساهماتكم ودعمكم لهذه الشركات:
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a 
                href="#" 
                className="button button--primary gap-2 group"
              >
                <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                كن راعيآ
              </a>
              <a 
                href="https://github.com/sponsors/qamanicode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                دليل الرعاة
              </a>
            </div>
          </motion.div>
        </div>

        {/* Sponsor Tiers / Grid Placeholder */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 flex items-center justify-center border border-dashed border-nickel rounded-lg">
              <span className="text-grey text-xs font-mono">SPONSOR {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
