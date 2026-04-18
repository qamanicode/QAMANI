import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layout, ShieldCheck, BookOpen, ArrowRight, Wand2, Globe, Code2, CheckCircle2, Terminal, Loader2, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

const galleryApps = [
  { title: 'متجر إلكتروني عصري', description: 'تم إنشاؤه في 3 ثوانٍ', image: 'https://picsum.photos/seed/app1/400/300' },
  { title: 'لوحة تحكم تحليلية', description: 'تم إنشاؤه في 5 ثوانٍ', image: 'https://picsum.photos/seed/app2/400/300' },
  { title: 'تطبيق تواصل اجتماعي', description: 'تم إنشاؤه في 4 ثوانٍ', image: 'https://picsum.photos/seed/app3/400/300' },
];

const generationSteps = [
  'تحليل الفكرة وتحديد المتطلبات...',
  'توليد هيكل المشروع (Scaffolding)...',
  'كتابة كود الواجهة الأمامية والمنطق...',
  'تحسين الأداء وضغط الملفات...',
  'تجهيز رابط المعاينة النهائي...',
];

export default function AIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < generationSteps.length - 1) return prev + 1;
          clearInterval(interval);
          setIsGenerating(false);
          setResult(`npx qamaniai init --template dynamic --prompt "${prompt}"`);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isGenerating, prompt]);

  useEffect(() => {
    const handleStartEvent = () => {
      if (!prompt) {
        setPrompt('تطبيق متجر إلكتروني متكامل');
      }
      // Small delay to ensure prompt is set if it was empty
      setTimeout(() => {
        setIsGenerating(true);
        setResult(null);
        setCurrentStep(0);
      }, 100);
    };

    window.addEventListener('start-ai-gen', handleStartEvent);
    return () => window.removeEventListener('start-ai-gen', handleStartEvent);
  }, [prompt]);

  return (
    <section id="ai-generator" className="border-t border-nickel py-24 relative overflow-hidden">
      <div className="wrapper px-10">
        {/* AI Input Section */}
        <div className="flex flex-col items-center text-center gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>جديد: QAMANIAI AI</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-text tracking-tight">
              حول فكرتك إلى تطبيق في ثوانٍ
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              أخبر QAMANIAI بما تريد بناءه، وسيقوم الذكاء الاصطناعي بتوليد الكود وتجهيز التطبيق لك تلقائياً وبدقة عالية.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#41d1ff] via-[#bd34fe] to-[#41d1ff] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-slate border border-nickel rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثلاً: ابني لي متجر لبيع القهوة بتصميم عصري وألوان دافئة..."
                className="flex-grow bg-transparent border-none outline-none p-4 text-text placeholder-grey resize-none min-h-[100px] md:min-h-0"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="button button--primary px-8 py-4 gap-2 h-fit self-end md:self-center"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5" />
                )}
                {isGenerating ? 'جاري البناء...' : 'بناء التطبيق'}
              </button>
            </div>
          </motion.div>

          {/* Generation Progress & Result */}
          <AnimatePresence mode="wait">
            {(isGenerating || result) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl bg-primary/50 border border-nickel rounded-2xl p-8 text-right"
                dir="rtl"
              >
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-accent animate-pulse">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-bold">جاري معالجة طلبك...</span>
                    </div>
                    <div className="space-y-3">
                      {generationSteps.map((step, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ 
                            opacity: i <= currentStep ? 1 : 0.3,
                            x: 0,
                            color: i === currentStep ? '#646cff' : '#94a3b8'
                          }}
                          className="flex items-center gap-3 text-sm"
                        >
                          {i < currentStep ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border ${i === currentStep ? 'border-accent border-t-transparent animate-spin' : 'border-nickel'}`} />
                          )}
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-green-500">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-xl font-bold">تم بناء التطبيق بنجاح!</span>
                    </div>
                    <div className="bg-slate p-4 rounded-xl border border-nickel font-mono text-sm text-left flex items-center justify-between group" dir="ltr">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Terminal className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-biege truncate">{result}</span>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(result || '')}
                        className="p-2 hover:bg-primary rounded-md text-grey hover:text-text transition-colors"
                        title="نسخ الأمر"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                    <p className="text-grey text-sm">
                      قم بنسخ الأمر أعلاه وتشغيله في جهازك لبدء استخدام تطبيقك المولد فوراً.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gallery Section */}
        <div className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Layout className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold text-text">معرض التطبيقات</h3>
            </div>
            <a href="#" className="text-accent hover:underline flex items-center gap-1 text-sm font-medium">
              عرض الكل <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {galleryApps.map((app, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-slate border border-nickel rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-text mb-1">{app.title}</h4>
                  <p className="text-grey text-sm">{app.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust & Resources Section */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/30 border border-nickel rounded-3xl p-10 flex flex-col gap-6"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text">أمان وموثوقية كاملة</h3>
            <p className="text-grey leading-relaxed">
              نحن نلتزم بأعلى معايير الأمان. QAMANIAI متوافق تماماً مع معايير <span className="text-text font-bold">SOC 2 Type II</span>، مما يضمن حماية بياناتك وكودك المصدري بأفضل التقنيات العالمية.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate/30 border border-nickel rounded-3xl p-10 flex flex-col gap-6"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-text">موارد إضافية للمطورين</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'دليل البدء السريع', icon: Globe, desc: 'ابدأ مشروعك الأول في دقائق', tooltip: 'دليل خطوة بخطوة للمبتدئين لإعداد بيئة العمل وبدء أول تطبيق.' },
                { label: 'أمثلة متقدمة', icon: Code2, desc: 'استكشف حالات استخدام معقدة', tooltip: 'مجموعة من المشاريع الجاهزة التي تستخدم تقنيات متقدمة مثل WebAssembly و Workers.' },
                { label: 'مجتمع المطورين', icon: Sparkles, desc: 'تواصل مع آلاف المطورين', tooltip: 'انضم إلى ديسكورد وتفاعل مع مطورين آخرين لتبادل الخبرات وحل المشكلات.' },
                { label: 'وثائق الـ API', icon: Layout, desc: 'مرجع شامل لجميع الوظائف', tooltip: 'توثيق تقني عميق لكل الدوال والمكونات المتاحة في QAMANIAI.' },
              ].map((item, i) => (
                <div key={i} className="relative group/item">
                  <a 
                    href="#" 
                    className="flex items-start gap-3 p-4 rounded-xl bg-primary/50 border border-nickel hover:border-accent/50 transition-all group"
                  >
                    <item.icon className="w-5 h-5 text-grey group-hover:text-accent mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text group-hover:text-accent transition-colors">{item.label}</span>
                        <Info className="w-3 h-3 text-grey/50" />
                      </div>
                      <span className="text-xs text-grey leading-tight">{item.desc}</span>
                    </div>
                  </a>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate border border-nickel rounded-lg shadow-2xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all z-50 pointer-events-none">
                    <p className="text-xs text-biege leading-relaxed">{item.tooltip}</p>
                    <div className="absolute top-full left-6 -mt-px border-8 border-transparent border-t-nickel" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
