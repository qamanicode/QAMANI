import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Block {
  id: string;
  type: string;
  data: any;
}

export async function exportProject(blocks: Block[]) {
  const zip = new JSZip();

  // 1. package.json
  const packageJson = {
    name: "qamaniai-export",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    dependencies: {
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^0.468.0",
      "motion": "^12.23.24"
    },
    devDependencies: {
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "@vitejs/plugin-react": "^4.3.4",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.49",
      "tailwindcss": "^4.0.0",
      "vite": "^6.0.0",
      "typescript": "^5.6.3"
    }
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 2. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;
  zip.file("vite.config.ts", viteConfig);

  // 3. index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QAMANIAI Site</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  zip.file("index.html", indexHtml);

  // 4. src/index.css
  const indexCss = `@import "tailwindcss";

:root {
  --color-primary: #0f172a;
  --color-slate: #1e293b;
  --color-nickel: rgba(255, 255, 255, 0.1);
  --color-grey: #94a3b8;
  --color-biege: #e2e8f0;
  --color-accent: #646cff;
  --color-text: #ffffff;
}

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-primary: var(--color-primary);
  --color-slate: var(--color-slate);
  --color-nickel: var(--color-nickel);
  --color-grey: var(--color-grey);
  --color-accent: var(--color-accent);
  --color-text: var(--color-text);
}

body {
  @apply bg-primary text-text font-sans antialiased;
}
`;
  zip.file("src/index.css", indexCss);

  // 5. src/main.tsx
  const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
  zip.file("src/main.tsx", mainTsx);

  // 6. src/App.tsx
  // We'll generate a static version of the layout
  const blockImports = Array.from(new Set(blocks.map(b => b.type))).map(type => 
    `import ${type.charAt(0).toUpperCase() + type.slice(1)}Block from './components/${type.charAt(0).toUpperCase() + type.slice(1)}Block';`
  ).join('\n');

  const appTsx = `import React from 'react';
${blockImports}

export default function App() {
  const blocks = ${JSON.stringify(blocks, null, 2)};

  return (
    <div className="min-h-screen bg-primary">
      {blocks.map((block) => {
        switch(block.type) {
          case 'navbar': return <NavbarBlock key={block.id} data={block.data} />;
          case 'hero': return <HeroBlock key={block.id} data={block.data} />;
          case 'features': return <FeaturesBlock key={block.id} data={block.data} />;
          case 'pricing': return <PricingBlock key={block.id} data={block.data} />;
          case 'footer': return <FooterBlock key={block.id} data={block.data} />;
          default: return null;
        }
      })}
    </div>
  );
}
`;
  zip.file("src/App.tsx", appTsx);

  // 7. Dummy components for the zip (Simplified static versions)
  // In a real scenario I would fetch the file contents, but here I will generate simplified production versions
  // that don't need EditableText.
  
  const blocksDir = zip.folder("src/components");
  
  // Helper to generate static block components
  const generateStaticBlock = (type: string) => {
    switch(type) {
        case 'navbar': return `
import React from 'react';
export default function NavbarBlock({ data }) {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-white/10 bg-slate/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-[#646cff] flex items-center justify-center text-white font-bold">Q</div>
        <span className="font-bold text-white">{data.logoText}</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {data.links.map((link, i) => <span key={i} className="text-sm text-[#94a3b8] hover:text-[#646cff] cursor-pointer">{link}</span>)}
      </div>
      <button className="px-4 py-1.5 rounded-full bg-[#646cff]/10 border border-[#646cff]/20 text-[#646cff] text-xs font-medium">{data.ctaText}</button>
    </nav>
  );
}`;
        case 'hero': return `
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
export default function HeroBlock({ data }) {
  return (
    <div className="w-full py-20 px-10 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-right" dir="rtl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#646cff]/10 border border-[#646cff]/20 text-[#646cff] text-xs">
          <Sparkles className="w-3 h-3" />
          <span>{data.badge}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{data.title}</h1>
        <p className="text-[#94a3b8] text-lg max-w-lg">{data.subtitle}</p>
        <div className="flex items-center gap-4 pt-4">
          <button className="px-8 py-3 rounded-full bg-[#646cff] text-white font-bold">{data.primaryCta}</button>
          <button className="px-8 py-3 rounded-full border border-white/10 text-white flex items-center gap-2">
            <span>{data.secondaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md aspect-square rounded-3xl overflow-hidden relative">
        <img src={data.imageUrl} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}`;
        case 'features': return `
import React from 'react';
import { Zap, Shield, Globe, Cpu } from 'lucide-react';
const icons = [Zap, Shield, Globe, Cpu];
export default function FeaturesBlock({ data }) {
  return (
    <div className="w-full py-16 px-10 border-y border-white/5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" dir="rtl">
        {data.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={i} className="p-6 rounded-2xl bg-[#1e293b]/30 border border-white/10 hover:border-[#646cff]/30 transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#646cff]/10 border border-[#646cff]/20 flex items-center justify-center text-[#646cff]">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;
        case 'pricing': return `
import React from 'react';
import { Check } from 'lucide-react';
export default function PricingBlock({ data }) {
  return (
    <div className="w-full py-16 px-10">
      <div className="grid md:grid-cols-3 gap-8" dir="rtl">
        {data.plans.map((plan, i) => (
          <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-[#1e293b]/50">
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$\{plan.price}</span>
              <span className="text-[#94a3b8] text-sm">/شهرياً</span>
            </div>
            <div className="space-y-4 mb-8">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-[#94a3b8]">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-full bg-[#646cff] text-white font-bold">اشترك الآن</button>
          </div>
        ))}
      </div>
    </div>
  );
}`;
        case 'footer': return `
import React from 'react';
export default function FooterBlock({ data }) {
  return (
    <footer className="w-full py-12 px-10 bg-[#1e293b]/50 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8" dir="rtl">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="w-8 h-8 rounded bg-[#646cff] flex items-center justify-center text-white font-bold">Q</div>
            <span className="font-bold text-white text-xl tracking-wider">{data.logoText}</span>
          </div>
          <p className="text-[#94a3b8] text-sm max-w-xs">{data.desc}</p>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 text-center text-[#94a3b8]/50 text-xs">
        {data.copyright}
      </div>
    </footer>
  );
}`;
        default: return "";
    }
  };

  const usedTypes = Array.from(new Set(blocks.map(b => b.type)));
  usedTypes.forEach(type => {
    blocksDir?.file(`${type.charAt(0).toUpperCase() + type.slice(1)}Block.tsx`, generateStaticBlock(type));
  });

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "qamaniai-site.zip");
}
