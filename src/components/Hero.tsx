import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import pineappleHero from "@/assets/pineapple-hero.png";
import tepacheLogo from "@/assets/tepache-logo.png";

// Floating pineapple slice component
const FloatingSlice = ({ 
  className, 
  delay = 0, 
  duration = 6,
  rotate = 15
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  rotate?: number;
}) => (
  <motion.div
    animate={{ 
      y: [-15, 15, -15], 
      rotate: [-rotate, rotate, -rotate],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut", 
      delay 
    }}
    className={className}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      {/* Pineapple slice shape */}
      <defs>
        <linearGradient id="sliceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="50%" stopColor="#E5B82A" />
          <stop offset="100%" stopColor="#D4A72C" />
        </linearGradient>
        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="100%" stopColor="#F4E4A6" />
        </linearGradient>
      </defs>
      {/* Outer ring (flesh) */}
      <circle cx="50" cy="50" r="45" fill="url(#sliceGradient)" />
      {/* Inner circle (core) */}
      <circle cx="50" cy="50" r="20" fill="url(#coreGradient)" />
      {/* Core detail */}
      <circle cx="50" cy="50" r="8" fill="#D4A72C" opacity="0.3" />
      {/* Segment lines */}
      <line x1="50" y1="5" x2="50" y2="30" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="95" y1="50" x2="70" y2="50" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="95" x2="50" y2="70" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="5" y1="50" x2="30" y2="50" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="18" x2="36" y2="36" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="18" x2="64" y2="36" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="82" x2="64" y2="64" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="82" x2="36" y2="64" stroke="#C4972B" strokeWidth="1" opacity="0.4" />
    </svg>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sky Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 gradient-sky"
      />

      {/* Floating Cloud Shapes */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-20 left-10 w-64 h-32 bg-white/40 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute top-40 right-20 w-96 h-48 bg-white/30 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="absolute bottom-40 left-1/4 w-80 h-40 bg-white/35 rounded-full blur-3xl"
      />

      {/* Floating Pineapple Slices */}
      <FloatingSlice 
        className="absolute top-24 left-[10%] w-16 h-16 md:w-20 md:h-20 opacity-80"
        delay={0}
        duration={5}
        rotate={20}
      />
      <FloatingSlice 
        className="absolute top-40 right-[12%] w-12 h-12 md:w-16 md:h-16 opacity-70"
        delay={1.5}
        duration={6}
        rotate={15}
      />
      <FloatingSlice 
        className="absolute top-[35%] left-[8%] w-10 h-10 md:w-14 md:h-14 opacity-60"
        delay={0.8}
        duration={7}
        rotate={25}
      />
      <FloatingSlice 
        className="absolute top-[30%] right-[8%] w-14 h-14 md:w-18 md:h-18 opacity-75"
        delay={2}
        duration={5.5}
        rotate={18}
      />
      <FloatingSlice 
        className="absolute bottom-[35%] left-[15%] w-12 h-12 md:w-16 md:h-16 opacity-65"
        delay={1}
        duration={6.5}
        rotate={22}
      />
      <FloatingSlice 
        className="absolute bottom-[30%] right-[15%] w-10 h-10 md:w-12 md:h-12 opacity-55"
        delay={2.5}
        duration={5}
        rotate={12}
      />

      {/* Extra decorative floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[25%] w-8 h-8 rounded-full bg-gold/40 blur-sm"
      />
      <motion.div
        animate={{ y: [10, -15, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-48 right-[25%] w-6 h-6 rounded-full bg-gold/50 blur-sm"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
      >
        {/* Logo Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <img
            src={tepacheLogo}
            alt="Tepache - Brewed by Ootophia Brewing Labs"
            className="w-64 md:w-80 lg:w-[400px] mx-auto"
          />
        </motion.div>

        {/* Pineapple Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
          className="relative mx-auto mb-8"
        >
          <motion.img
            animate={{ y: [-12, 12, -12], rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={pineappleHero}
            alt="Fresh Pineapple"
            className="w-48 md:w-64 lg:w-80 mx-auto drop-shadow-2xl"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gold/25 blur-3xl rounded-full -z-10 scale-110" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link to="/batch-tracker">
            <button className="btn-primary text-lg animate-pulse-glow">
              Check Batch Status
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-forest/40 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-forest/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
