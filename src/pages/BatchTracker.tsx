import { motion } from "framer-motion";
import { Calendar, Clock, Leaf, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBatch } from "@/context/BatchContext";

const ingredients = [
  { name: "Pineapple", size: "large", color: "gold" },
  { name: "Clove", size: "small", color: "forest" },
  { name: "Cinnamon", size: "medium", color: "gold" },
  { name: "Ginger", size: "medium", color: "forest" },
  { name: "Star Anise", size: "small", color: "gold" },
  { name: "Black Tea", size: "medium", color: "forest" },
  { name: "Palm Sugar", size: "large", color: "gold" },
  { name: "Mineral Water", size: "medium", color: "forest" },
];

const BatchTracker = () => {
  const { batchData } = useBatch();

  const timelineSteps = [
    {
      title: "Fermentation Started",
      date: batchData.fermentationStarted,
      icon: Clock,
      completed: true,
    },
    {
      title: "Harvest Date",
      date: batchData.harvestDate,
      icon: Leaf,
      completed: batchData.status === "harvested" || batchData.status === "ready",
    },
    {
      title: "Best Before",
      date: batchData.bestBefore,
      icon: Calendar,
      completed: batchData.status === "ready",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-forest/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold font-semibold text-sm uppercase tracking-widest"
          >
            Current Batch
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-forest mt-2 mb-4"
          >
            Batch Tracker
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-forest/70 text-lg max-w-xl mx-auto"
          >
            Follow the complete journey of your Tepache, from fermentation to your hands.
          </motion.p>
        </div>
      </section>

      {/* Batch Info Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pb-20 px-6"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Batch Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card-strong rounded-3xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-gold font-semibold text-sm uppercase tracking-wider">Batch Code</p>
                <h2 className="text-3xl md:text-4xl font-black text-forest">{batchData.batchCode}</h2>
              </div>
              <div className={`px-6 py-3 rounded-full font-bold text-sm ${
                batchData.status === "ready" 
                  ? "bg-forest text-cream" 
                  : "bg-gold/20 text-gold"
              }`}>
                {batchData.status === "ready" ? "✓ Ready to Enjoy" : batchData.status === "harvested" ? "🌿 Harvested" : "🔄 Fermenting"}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-forest mb-8">Brewing Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
              
              <div className="space-y-8">
                {timelineSteps.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.15 }}
                    className={`relative flex items-center gap-4 md:gap-8 ${
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ml-16 md:ml-0 ${
                      idx % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                    }`}>
                      <p className="text-forest/60 text-sm font-medium">{step.title}</p>
                      <p className="text-forest text-lg font-bold">{step.date}</p>
                    </div>

                    {/* Icon */}
                    <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      step.completed 
                        ? "bg-forest text-cream" 
                        : "bg-cream-dark text-forest/40"
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ingredients Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
            
            <h3 className="text-xl font-bold text-forest mb-2">Ingredients</h3>
            <p className="text-forest/60 mb-8">Carefully selected, naturally sourced</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {ingredients.map((ingredient, idx) => (
                <motion.span
                  key={ingredient.name}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + idx * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`ingredient-tag cursor-default ${
                    ingredient.size === "large" 
                      ? "text-lg px-5 py-2" 
                      : ingredient.size === "small" 
                        ? "text-xs px-3 py-1" 
                        : ""
                  } ${
                    ingredient.color === "forest" 
                      ? "bg-forest/10 hover:bg-forest/20" 
                      : ""
                  }`}
                >
                  {ingredient.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Decorative Floating Ingredients */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-forest/40 text-sm uppercase tracking-widest mb-4">Crafted with Care</p>
            <p className="text-forest/60 text-lg max-w-md mx-auto">
              Every bottle of Tepache is brewed with the finest natural ingredients 
              and monitored throughout the fermentation process.
            </p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-5, 10, -5], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] text-4xl"
        >
          🍍
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-[15%] text-2xl"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[20%] text-3xl"
        >
          🌿
        </motion.div>
        <motion.div
          animate={{ y: [5, -15, 5], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 right-[25%] text-2xl"
        >
          🍋
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default BatchTracker;
