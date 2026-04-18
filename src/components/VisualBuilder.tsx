import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { 
  Layout, 
  MousePointer2, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Plus, 
  Trash2, 
  Layers, 
  Image as ImageIcon, 
  Type, 
  Square, 
  Download,
  Eye,
  Library,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Block Components
import NavbarBlock from './visual-builder/blocks/NavbarBlock';
import HeroBlock from './visual-builder/blocks/HeroBlock';
import FeaturesBlock from './visual-builder/blocks/FeaturesBlock';
import FooterBlock from './visual-builder/blocks/FooterBlock';
import PricingBlock from './visual-builder/blocks/PricingBlock';

type BlockType = 'hero' | 'features' | 'pricing' | 'footer' | 'navbar';

interface Block {
  id: string;
  type: BlockType;
  data: any;
}

const blockComponents: Record<BlockType, React.ComponentType<any>> = {
  navbar: NavbarBlock,
  hero: HeroBlock,
  features: FeaturesBlock,
  pricing: PricingBlock,
  footer: FooterBlock,
};

const defaultData: Record<BlockType, any> = {
  navbar: {
    logoText: 'QAMANAI',
    links: ['الرئيسية', 'المميزات', 'الأسعار'],
    ctaText: 'ابدأ الآن'
  },
  hero: {
    badge: 'تكنولوجيا الجيل القادم',
    title: 'ابنِ مستقبلك بذكاء وسرعة',
    subtitle: 'استخدم أدواتنا المتطورة لإنشاء تطبيقات ويب مذهلة في دقائق معدودة. القوة بين يديك الآن.',
    primaryCta: 'ابدأ مجاناً',
    secondaryCta: 'شاهد العرض',
    imageUrl: 'https://picsum.photos/seed/visual/800/800'
  },
  features: {
    items: [
      { title: "أداء فائق", desc: "سرعة استجابة لا تضاهى في جميع الأجهزة." },
      { title: "أمان متكامل", desc: "حماية بياناتك هي أولويتنا القصوى دائماً." },
      { title: "نقل عالمي", desc: "انشر موقعك في ثوانٍ لأي مكان في العالم." },
      { title: "ذكاء محترف", desc: "أدوات ذكية تساعدك في اتخاذ قراراتك." }
    ]
  },
  pricing: {
    plans: [
      { name: "الأساسي", price: "0", features: ["مشروع واحد", "دعم محدود", "نطاق فرعي"] },
      { name: "المحترف", price: "29", features: ["مشاريع غير محدودة", "دعم متميز", "نطاق مخصص", "أدوات الذكاء"], popular: true },
      { name: "للشركات", price: "99", features: ["إدارة فرق", "تخصيص كامل", "واجهة برمجة تطبيقات"] },
    ]
  },
  footer: {
    logoText: 'QAMANAI',
    desc: 'نحن نصنع المستقبل الرقمي بأدوات بسيطة وقوية للجميع.',
    copyright: '© 2026 QAMANAI. جميع الحقوق محفوظة.'
  }
};

const templateLibrary = [
  { id: 'saas', name: 'SaaS Landing', image: 'https://picsum.photos/seed/saas/300/200', blocks: ['navbar', 'hero', 'features', 'footer'] },
  { id: 'portfolio', name: 'Creative Portfolio', image: 'https://picsum.photos/seed/port/300/200', blocks: ['navbar', 'hero', 'footer'] },
  { id: 'shop', name: 'E-commerce Store', image: 'https://picsum.photos/seed/shop/300/200', blocks: ['navbar', 'hero', 'pricing', 'footer'] },
];

const blockIcons: Record<BlockType, any> = {
  navbar: Layout,
  hero: Sparkles,
  features: Layers,
  pricing: Square,
  footer: Layout,
};

function SortableBlock({ block, onRemove, onUpdate }: { 
  block: Block; 
  onRemove: (id: string) => void;
  onUpdate: (id: string, newData: any) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    position: 'relative' as const,
  };

  const Component = blockComponents[block.type];

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`group relative border-b border-nickel/30 last:border-none ${isDragging ? 'opacity-50 shadow-2xl' : ''}`}
    >
      <div className="relative z-0">
        <Component data={block.data} onUpdate={(newData: any) => onUpdate(block.id, newData)} />
      </div>

      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-1.5 p-3 rounded-lg bg-slate/50 border border-nickel opacity-0 group-hover:opacity-100 z-30 cursor-grab active:cursor-grabbing transition-opacity shadow-lg"
      >
        <div className="w-1 h-1 rounded-full bg-accent" />
        <div className="w-1 h-1 rounded-full bg-accent" />
        <div className="w-1 h-1 rounded-full bg-accent" />
      </div>

      {/* Block Controls */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="p-2 rounded-lg bg-slate border border-nickel text-grey">
          <Layers className="w-4 h-4" />
        </div>
        <button 
          onClick={() => onRemove(block.id)}
          className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
    </div>
  );
}

export default function VisualBuilder() {
  const [canvasBlocks, setCanvasBlocks] = useState<Block[]>([]);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showLibrary, setShowLibrary] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCanvasBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: defaultData[type],
    };
    setCanvasBlocks([...canvasBlocks, newBlock]);
  };

  const updateBlockData = (id: string, newData: any) => {
    setCanvasBlocks(prev => prev.map(b => b.id === id ? { ...b, data: { ...b.data, ...newData } } : b));
  };

  const removeBlock = (id: string) => {
    setCanvasBlocks(canvasBlocks.filter(b => b.id !== id));
  };

  const loadTemplate = (blocks: string[]) => {
    const newBlocks = blocks.map(type => ({
      id: Math.random().toString(36).substr(2, 9),
      type: type as BlockType,
      data: defaultData[type as BlockType],
    }));
    setCanvasBlocks(newBlocks);
    setShowLibrary(false);
  };

  return (
    <section className="py-24 border-t border-nickel bg-primary relative overflow-hidden">
      <div className="wrapper px-10">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
              منشئ المواقع البصري <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41d1ff] to-[#bd34fe]">
                اسحب، أفلت، وانشر
              </span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              أنشئ قوالب مواقع متجاوبة واحترافية دون كتابة سطر كود واحد. استخدم مكتبة القوالب الجاهزة أو ابدأ من الصفر.
            </p>
          </motion.div>
        </div>

        <div className="bg-slate border border-nickel rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[800px]">
          {/* Toolbar */}
          <div className="bg-primary/50 border-b border-nickel p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLibrary(true)}
                className="button button--primary py-2 px-4 text-sm gap-2"
              >
                <Library className="w-4 h-4" />
                مكتبة القوالب
              </button>
              <div className="h-6 w-px bg-nickel" />
              <div className="flex bg-primary rounded-lg p-1 border border-nickel">
                {(['mobile', 'tablet', 'desktop'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-md transition-all ${viewMode === mode ? 'bg-accent text-white shadow-lg' : 'text-grey hover:text-text'}`}
                  >
                    {mode === 'mobile' && <Smartphone className="w-4 h-4" />}
                    {mode === 'tablet' && <Tablet className="w-4 h-4" />}
                    {mode === 'desktop' && <Monitor className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-grey hover:text-text transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              <button className="button py-2 px-4 text-sm gap-2 border-accent/30 text-accent">
                <Download className="w-4 h-4" />
                تصدير الكود
              </button>
            </div>
          </div>

          <div className="flex flex-grow overflow-hidden">
            {/* Sidebar Elements */}
            <div className="w-64 bg-primary/30 border-r border-nickel p-6 flex flex-col gap-6 overflow-y-auto">
              <h4 className="text-xs font-mono uppercase tracking-widest text-grey">العناصر المتاحة</h4>
              <div className="grid gap-3">
                {(['navbar', 'hero', 'features', 'pricing', 'footer'] as BlockType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate border border-nickel hover:border-accent/50 hover:bg-slate/80 transition-all group text-right"
                    dir="rtl"
                  >
                    <div className="p-2 rounded-lg bg-primary border border-nickel text-grey group-hover:text-accent">
                      {(() => {
                        const Icon = blockIcons[type];
                        return <Icon className="w-4 h-4" />;
                      })()}
                    </div>
                    <span className="text-sm font-medium text-text capitalize">{type}</span>
                    <Plus className="w-3 h-3 text-grey mr-auto" />
                  </button>
                ))}
              </div>

              <div className="mt-auto p-4 rounded-2xl bg-accent/5 border border-accent/20">
                <p className="text-xs text-accent font-medium mb-2">نصيحة ذكية</p>
                <p className="text-[10px] text-grey leading-relaxed">
                  يمكنك سحب العناصر مباشرة إلى منطقة العمل لترتيبها كما تشاء.
                </p>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-grow bg-[#0d1117] p-12 overflow-y-auto flex justify-center items-start scrollbar-hide">
              <motion.div 
                layout
                className={`bg-primary border border-nickel shadow-2xl transition-all duration-500 min-h-[600px] flex flex-col ${
                  viewMode === 'mobile' ? 'w-[375px]' : viewMode === 'tablet' ? 'w-[768px]' : 'w-full max-w-4xl'
                }`}
              >
                {canvasBlocks.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-20 gap-4">
                    <div className="w-20 h-20 rounded-full bg-slate border-2 border-dashed border-nickel flex items-center justify-center">
                      <MousePointer2 className="w-8 h-8 text-grey/30" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-text">منطقة العمل فارغة</h3>
                      <p className="text-grey text-sm max-w-xs">ابدأ بإضافة عناصر من القائمة الجانبية أو اختر قالباً جاهزاً.</p>
                    </div>
                  </div>
                ) : (
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext 
                      items={canvasBlocks.map(b => b.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="flex flex-col">
                        <AnimatePresence initial={false}>
                          {canvasBlocks.map((block) => (
                            <SortableBlock 
                              key={block.id} 
                              block={block} 
                              onRemove={removeBlock} 
                              onUpdate={updateBlockData}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Template Library Modal */}
        <AnimatePresence>
          {showLibrary && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLibrary(false)}
                className="absolute inset-0 bg-primary/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-slate border border-nickel rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-nickel flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Library className="w-6 h-6 text-accent" />
                    <h3 className="text-2xl font-bold text-text">مكتبة القوالب الجاهزة</h3>
                  </div>
                  <button 
                    onClick={() => setShowLibrary(false)}
                    className="p-2 hover:bg-primary rounded-full transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45 text-grey" />
                  </button>
                </div>
                
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  {templateLibrary.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                      onClick={() => loadTemplate(template.blocks)}
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-nickel mb-4">
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="button button--primary py-2 px-4 text-sm gap-2">
                            استخدام القالب
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-text mb-1">{template.name}</h4>
                      <p className="text-xs text-grey">{template.blocks.length} عناصر متجاوبة</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
