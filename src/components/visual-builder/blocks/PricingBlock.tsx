import { Check } from 'lucide-react';
import EditableText from '../EditableText';

interface PricingBlockProps {
  data: {
    plans: {
      name: string;
      price: string;
      features: string[];
      popular?: boolean;
    }[];
  };
  onUpdate: (newData: any) => void;
}

export default function PricingBlock({ data, onUpdate }: PricingBlockProps) {
  const updatePlan = (index: number, field: string, value: any) => {
    const newPlans = [...data.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    onUpdate({ plans: newPlans });
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...data.plans];
    const newFeatures = [...newPlans[planIndex].features];
    newFeatures[featureIndex] = value;
    newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
    onUpdate({ plans: newPlans });
  };

  return (
    <div className="w-full py-16 px-10 bg-primary/20">
      <div className="grid md:grid-cols-3 gap-8" dir="rtl">
        {data.plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-[2rem] border transition-all flex flex-col ${plan.popular ? 'bg-slate border-accent shadow-xl scale-105' : 'bg-slate/50 border-nickel hover:border-accent/30'}`}>
            {plan.popular && <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">الأكثر شيوعاً</span>}
            <h3 className="text-xl font-bold text-text mb-2">
              <EditableText 
                text={plan.name} 
                onSave={(val) => updatePlan(i, 'name', val)} 
                tagName="h3"
              />
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text">$
                <EditableText 
                  text={plan.price} 
                  onSave={(val) => updatePlan(i, 'price', val)} 
                />
              </span>
              <span className="text-grey text-sm">/شهرياً</span>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <EditableText 
                    text={f} 
                    onSave={(val) => updateFeature(i, j, val)} 
                    className="text-sm text-grey"
                  />
                </div>
              ))}
            </div>
            <button className={`w-full py-3 rounded-full font-bold transition-all ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-primary text-text border border-nickel hover:border-accent/30'}`}>اشترك الآن</button>
          </div>
        ))}
      </div>
    </div>
  );
}
