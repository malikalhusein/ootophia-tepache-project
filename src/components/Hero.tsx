import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import pineappleHero from "@/assets/pineapple-hero.png";
import tepacheLogo from "@/assets/tepache-logo.png";

// Floating pineapple slice component with parallax
const FloatingSlice = ({ 
  className, 
  delay = 0, 
  duration = 6,
  rotate = 15,
  parallaxY
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  rotate?: number;
  parallaxY?: MotionValue<number>;
}) => (
  <motion.div
    style={{ y: parallaxY }}
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
      <circle cx="50" cy="50" r="45" fill="url(#sliceGradient)" />
      <circle cx="50" cy="50" r="20" fill="url(#coreGradient)" />
      <circle cx="50" cy="50" r="8" fill="#D4A72C" opacity="0.3" />
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

  // Parallax values for different depth layers
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const parallaxMedium = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxFastest = useTransform(scrollYProgress, [0, 1], [0, 200]);

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

      {/* Floating Pineapple Slices with Parallax - Balanced Layout */}
      {/* Top Left - Large slice */}
      <FloatingSlice 
        className="absolute top-[15%] left-[5%] md:left-[12%] lg:left-[15%] w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-75"
        delay={0}
        duration={5}
        rotate={20}
        parallaxY={parallaxFast}
      />
      
      {/* Top Right - Medium slice */}
      <FloatingSlice 
        className="absolute top-[12%] right-[8%] md:right-[15%] lg:right-[18%] w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 opacity-65"
        delay={1.5}
        duration={6}
        rotate={15}
        parallaxY={parallaxMedium}
      />
      
      {/* Middle Left - Small slice */}
      <FloatingSlice 
        className="absolute top-[40%] left-[3%] md:left-[8%] lg:left-[10%] w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14 opacity-55"
        delay={0.8}
        duration={7}
        rotate={25}
        parallaxY={parallaxSlow}
      />
      
      {/* Middle Right - Medium slice */}
      <FloatingSlice 
        className="absolute top-[35%] right-[5%] md:right-[10%] lg:right-[12%] w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 opacity-70"
        delay={2}
        duration={5.5}
        rotate={18}
        parallaxY={parallaxFastest}
      />
      
      {/* Bottom Left - Medium slice */}
      <FloatingSlice 
        className="absolute bottom-[25%] left-[8%] md:left-[15%] lg:left-[18%] w-7 h-7 md:w-11 md:h-11 lg:w-14 lg:h-14 opacity-60"
        delay={1}
        duration={6.5}
        rotate={22}
        parallaxY={parallaxMedium}
      />
      
      {/* Bottom Right - Small slice */}
      <FloatingSlice 
        className="absolute bottom-[30%] right-[10%] md:right-[18%] lg:right-[20%] w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 opacity-50"
        delay={2.5}
        duration={5}
        rotate={12}
        parallaxY={parallaxFast}
      />

      {/* Extra tiny slices for depth - hidden on mobile */}
      <FloatingSlice 
        className="hidden md:block absolute top-[25%] left-[25%] w-6 h-6 lg:w-8 lg:h-8 opacity-40"
        delay={3}
        duration={8}
        rotate={30}
        parallaxY={parallaxSlow}
      />
      <FloatingSlice 
        className="hidden md:block absolute bottom-[40%] right-[25%] w-5 h-5 lg:w-7 lg:h-7 opacity-35"
        delay={1.8}
        duration={7}
        rotate={10}
        parallaxY={parallaxFastest}
      />

      {/* Soft glow accents */}
      <motion.div
        style={{ y: parallaxMedium }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-6 h-6 md:w-8 md:h-8 rounded-full bg-gold/40 blur-md"
      />
      <motion.div
        style={{ y: parallaxFast }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[35%] right-[22%] w-5 h-5 md:w-7 md:h-7 rounded-full bg-gold/50 blur-md"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16 md:pt-20"
      >
        {/* Logo Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 md:mb-6"
        >
          <img
            src={tepacheLogo}
            alt="Tepache - Brewed by Ootophia Brewing Labs"
            className="w-56 md:w-72 lg:w-[380px] mx-auto"
          />
        </motion.div>

        {/* Pineapple Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
          className="relative mx-auto mb-6 md:mb-8"
        >
          <motion.img
            animate={{ y: [-12, 12, -12], rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={pineappleHero}
            alt="Fresh Pineapple"
            className="w-40 md:w-56 lg:w-72 mx-auto drop-shadow-2xl"
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
            <button className="btn-primary text-base md:text-lg animate-pulse-glow">
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
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-forest/40 flex justify-center pt-1.5 md:pt-2"
        >
          <div className="w-1 h-2 md:w-1.5 md:h-3 bg-forest/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
