import { Zap, Cpu, Sparkles, Box, Layers, Globe } from 'lucide-react';

const features = [
  {
    title: "بدء تشغيل فوري للخادم",
    description: "خدمة ملفات المصدر عند الطلب عبر ESM الأصلي، مع تجميع مسبق فائق السرعة للتبعيات.",
    icon: Zap,
    image: "https://picsum.photos/seed/vite1/800/400"
  },
  {
    title: "HMR فائق السرعة",
    description: "اعكس التغييرات فوراً عند الحفظ، بغض النظر عن حجم تطبيقك.",
    icon: Cpu,
    image: "https://picsum.photos/seed/vite2/800/400"
  },
  {
    title: "أضف ميزات غنية جاهزة للاستخدام",
    description: "TypeScript، JSX، CSS، Workers، WebAssembly... والمزيد على بعد إضافة واحدة فقط.",
    icon: Sparkles,
    image: "https://picsum.photos/seed/vite3/800/400"
  },
  {
    title: "بناء مُحسَّن",
    description: "تقنية متقدمة لتفتيت البيانات، وتصغير مدمج، وتحكم دقيق في تقسيم البيانات مدعوم بتقنية Rolldown.",
    icon: Box,
    image: "https://picsum.photos/seed/vite4/800/400"
  }
];

export default function Features() {
  return (
    <section id="guide" className="border-t border-nickel">
      <div className="wrapper border-x border-nickel">
        <div className="px-10 py-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">إعادة تعريف تجربة المطور</h2>
          <p className="text-grey text-lg">QAMANIAI يجعل تطوير الويب ممتعاً مرة أخرى</p>
        </div>

        <div className="grid lg:grid-cols-2 divide-x divide-y divide-nickel border-t border-nickel">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col group">
              <div className="p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <feature.icon className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-text">{feature.title}</h3>
                </div>
                <p className="text-grey leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </div>
              <div className="relative h-64 overflow-hidden bg-slate/50 mt-auto border-t border-nickel">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
