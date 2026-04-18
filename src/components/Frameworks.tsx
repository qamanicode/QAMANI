import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

const frameworks = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Preact', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/preact/preact-original.svg' },
  { name: 'Astro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg' },
  { name: 'Solid', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidjs/solidjs-original.svg' },
  { name: 'Qwik', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qwik/qwik-original.svg' },
  { name: 'Remix', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/remix/remix-original.svg' },
  { name: 'Nuxt', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
];

const tools = [
  { name: 'Vitest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-original.svg' },
  { name: 'Storybook', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
  { name: 'Eleventy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eleventy/eleventy-original.svg' },
  { name: 'Docusaurus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docusaurus/docusaurus-original.svg' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Redwood', icon: 'https://redwoodjs.com/images/diecut.svg' },
  { name: 'Shopify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
];

export default function Frameworks() {
  const allItems = [...frameworks, ...tools].filter((item, index, self) =>
    index === self.findIndex((t) => t.name === item.name)
  );

  return (
    <section id="plugins" className="border-t border-nickel py-24 bg-primary/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="wrapper px-10">
        <div className="flex flex-col items-center text-center gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-text tracking-tight">
              دعم شامل لجميع أطر العمل
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              QAMANIAI يعمل بسلاسة مع الأدوات التي تحبها، مما يوفر لك بيئة تطوير عالمية ومستقرة.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {allItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-slate/40 border border-nickel rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-accent/50 hover:bg-slate/60 transition-all duration-300 shadow-lg"
            >
              <div className="w-16 h-16 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  className="w-12 h-12 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm font-medium text-grey group-hover:text-text transition-colors">
                {item.name}
              </span>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap className="w-3 h-3 text-accent fill-accent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA or Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nickel/20 border border-nickel text-grey text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            دعم كامل لـ 20+ إطار عمل وأداة تطوير
          </div>
        </motion.div>
      </div>
    </section>
  );
}
