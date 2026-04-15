import { motion } from 'motion/react';

const logos = [
  { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
  { name: 'Shopify', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
  { name: 'Stripe', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'Linear', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Linear_logo.svg' },
  { name: 'ClickUp', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/ClickUp_logo.svg' },
  { name: 'Wiz', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Wiz_logo.svg' },
];

export default function TrustedBy() {
  return (
    <section className="border-t border-nickel">
      <div className="wrapper wrapper--ticks py-10 md:py-16">
        <h6 className="text-center md:text-left text-grey text-sm font-medium uppercase tracking-widest mb-10 px-10">
          Trusted by the world's best software teams
        </h6>
        
        <div className="relative overflow-hidden py-4">
          <div className="flex w-max">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center gap-20 px-10"
            >
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div key={index} className="h-8 w-32 flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-opacity">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain invert-0 dark-theme:invert"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
