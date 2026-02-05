 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { ShoppingBag, ArrowRight } from "lucide-react";
 
 const OrderCTA = () => {
   return (
     <section className="py-20 px-6 bg-forest relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold blur-3xl" />
         <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gold blur-3xl" />
       </div>
 
       <div className="max-w-4xl mx-auto text-center relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
         >
           <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
             <ShoppingBag className="w-4 h-4 text-gold" />
             <span className="text-gold font-semibold text-sm">Tersedia untuk Pemesanan</span>
           </div>
 
           <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">
             Siap Mencoba <span className="text-gold">Tepache?</span>
           </h2>
           
           <p className="text-cream/70 text-lg mb-8 max-w-2xl mx-auto">
             Nikmati kesegaran Tepache asli buatan tangan. Pesan sekarang dan rasakan 
             minuman probiotik alami yang menyehatkan.
           </p>
 
           <motion.div
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             <Link
               to="/order"
               className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-forest font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-gold/30"
             >
               <ShoppingBag className="w-5 h-5" />
               Pesan Sekarang
               <ArrowRight className="w-5 h-5" />
             </Link>
           </motion.div>
 
           <p className="text-cream/50 text-sm mt-6">
             Pengiriman via CoD • Pembayaran saat barang diterima
           </p>
         </motion.div>
       </div>
     </section>
   );
 };
 
 export default OrderCTA;