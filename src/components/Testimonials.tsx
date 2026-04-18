const testimonials = [
  {
    text: "I'm loving what Vite enables. We've found building SolidStart that it is less a metaframework but a system of symbiotic Vite plugins. While built with SolidJS in mind, they should scale from our simplest template to opinionated starter. We're building an ecosystem on Vite.",
    author: "Ryan Carniato",
    handle: "@RyanCarniato",
    avatar: "https://picsum.photos/seed/ryan/100/100"
  },
  {
    text: "Vite is basically the united nations of JavaScript at this point. I'll be there as a representative of Sveltelandia",
    author: "Rich Harris",
    handle: "@Rich_Harris",
    avatar: "https://picsum.photos/seed/rich/100/100"
  },
  {
    text: "Each and every time I use Vite, I feel a true sense of pure and unbridled joy.",
    author: "David East",
    handle: "@_davideast",
    avatar: "https://picsum.photos/seed/david/100/100"
  },
  {
    text: "It's also a great platform to build a framework on since it provides a pluggable dev environment. Community is amazing too.",
    author: "Mark Dalgleish",
    handle: "@markdalgleish",
    avatar: "https://picsum.photos/seed/mark/100/100"
  },
  {
    text: "Every time I suspect I've hit the bounds of what Vite can do, I end up being wrong.",
    author: "Jason Miller",
    handle: "@_developit",
    avatar: "https://picsum.photos/seed/jason/100/100"
  },
  {
    text: "Vite has been a game changer for the industry.",
    author: "David Cramer",
    handle: "@zeeg",
    avatar: "https://picsum.photos/seed/cramer/100/100"
  }
];

export default function Testimonials() {
  return (
    <section className="border-t border-nickel">
      <div className="wrapper wrapper--ticks py-20 px-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold text-text">Loved by the community</h2>
            <p className="text-grey text-lg max-w-md">
              Don't take our word for it - listen to what QAMANIAI community members have to say.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold text-text">75k+</div>
              <div className="text-grey text-sm font-mono uppercase tracking-wider">GitHub Stars</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text">40m+</div>
              <div className="text-grey text-sm font-mono uppercase tracking-wider">Weekly Downloads</div>
            </div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="testimonial-card relative break-inside-avoid p-8 rounded-xl flex flex-col gap-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              <p className="text-biege leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-10 h-10 rounded-full object-cover border border-nickel"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="text-text font-medium text-sm">{t.author}</span>
                  <span className="text-grey text-xs font-mono">{t.handle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
