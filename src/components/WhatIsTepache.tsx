import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhatIsTepache = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tepacheFeatures = [
    { icon: "🍍", title: "Pineapple-Based", desc: "Made from fermented pineapple rinds" },
    { icon: "🌿", title: "Light & Refreshing", desc: "Naturally effervescent and tangy" },
    { icon: "⚡", title: "Quick Fermentation", desc: "Ready in just 2-3 days" },
    { icon: "🌶️", title: "Spiced Tradition", desc: "Enhanced with cinnamon & cloves" },
  ];

  const kombuchaFeatures = [
    { icon: "🍵", title: "Tea-Based", desc: "Made from fermented sweet tea" },
    { icon: "🔬", title: "SCOBY Culture", desc: "Requires a symbiotic culture" },
    { icon: "⏳", title: "Longer Process", desc: "Takes 7-14 days to brew" },
    { icon: "🍋", title: "Vinegar-like", desc: "Tart and acidic flavor profile" },
  ];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Discover</span>
          <h2 className="text-4xl md:text-6xl font-black text-forest mt-2">
            What is Tepache?
          </h2>
          <p className="text-forest/70 mt-4 max-w-2xl mx-auto text-lg">
            An ancient Mexican fermented beverage made from pineapple, 
            reimagined for the modern wellness enthusiast.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tepache Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center text-2xl">
                🍍
              </div>
              <div>
                <h3 className="text-2xl font-bold text-forest">Tepache</h3>
                <p className="text-gold font-semibold text-sm">The Ootophia Way</p>
              </div>
            </div>

            <div className="space-y-4">
              {tepacheFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-xl">{feature.icon}</span>
                  <div>
                    <p className="font-bold text-forest">{feature.title}</p>
                    <p className="text-forest/60 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kombucha Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden border-dashed"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/10 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center text-2xl">
                🍵
              </div>
              <div>
                <h3 className="text-2xl font-bold text-forest/70">Kombucha</h3>
                <p className="text-forest/40 font-semibold text-sm">Traditional Brew</p>
              </div>
            </div>

            <div className="space-y-4">
              {kombuchaFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-xl opacity-60">{feature.icon}</span>
                  <div>
                    <p className="font-bold text-forest/70">{feature.title}</p>
                    <p className="text-forest/40 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-forest/60 text-lg">
            Tepache offers a <span className="text-gold font-bold">lighter, fruitier</span> alternative 
            with all the probiotic benefits!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsTepache;
