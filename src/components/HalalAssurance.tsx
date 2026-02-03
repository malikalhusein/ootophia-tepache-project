import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, FlaskConical, Sparkles } from "lucide-react";

const HalalAssurance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trustBadges = [
    {
      icon: FlaskConical,
      title: "Controlled Fermentation",
      description: "Precise temperature and time control ensures optimal probiotic development without producing alcohol.",
    },
    {
      icon: Shield,
      title: "Non-Alcoholic Process",
      description: "Our proprietary brewing method keeps alcohol content well below 0.5%, meeting halal standards.",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "100% natural ingredients sourced responsibly. No artificial additives or preservatives.",
    },
    {
      icon: Sparkles,
      title: "Lab Tested Quality",
      description: "Every batch is tested to ensure purity, safety, and compliance with quality standards.",
    },
  ];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-forest">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-cream rounded-full" />
        <div className="absolute top-40 right-20 w-60 h-60 border-2 border-cream rounded-full" />
        <div className="absolute bottom-20 left-1/3 w-32 h-32 border-2 border-cream rounded-full" />
      </div>

      {/* Floating Gold Accents */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[15%] w-8 h-8 bg-gold/30 rounded-full"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-[10%] w-12 h-12 bg-gold/20 rounded-full blur-sm"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Our Commitment</span>
          <h2 className="text-4xl md:text-6xl font-black text-cream mt-2">
            The Ootophia Difference
          </h2>
          <p className="text-cream/70 mt-4 max-w-2xl mx-auto text-lg">
            We take extra care in our brewing process to ensure our Tepache meets 
            the highest standards of quality and halal compliance.
          </p>
        </motion.div>

        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
              className="group"
            >
              <div className="bg-cream/10 backdrop-blur-md border border-cream/20 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-cream/15 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <badge.icon className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream mb-2">{badge.title}</h3>
                    <p className="text-cream/60 leading-relaxed">{badge.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold/20 border border-gold/30">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-cream font-semibold">Halal Assured • Lab Tested • Quality Guaranteed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HalalAssurance;
