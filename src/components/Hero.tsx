import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import tepacheBottle from "@/assets/tepache-bottle-plastic.png";
import tepacheLogo from "@/assets/tepache-logo.png";

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

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[15%] w-16 h-16 rounded-full bg-gold/30 blur-sm"
      />
      <motion.div
        animate={{ y: [10, -15, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 right-[20%] w-12 h-12 rounded-full bg-gold/40 blur-sm"
      />
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-48 right-[15%] w-20 h-20 rounded-full bg-cream/60 blur-md"
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
          className="mb-8"
        >
          <img
            src={tepacheLogo}
            alt="Tepache - Brewed by Ootophia Brewing Labs"
            className="w-72 md:w-96 lg:w-[450px] mx-auto"
          />
        </motion.div>

        {/* Bottle Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 50 }}
          className="relative mx-auto mb-10"
        >
          <motion.img
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={tepacheBottle}
            alt="Tepache Bottle"
            className="w-48 md:w-64 mx-auto drop-shadow-2xl"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full -z-10 scale-150" />
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
