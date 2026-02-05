 import { useState } from "react";
 import { motion } from "framer-motion";
 import { ArrowLeft, Send, ShoppingBag } from "lucide-react";
 import { Link } from "react-router-dom";
 import { z } from "zod";
 import Navbar from "@/components/Navbar";
 import Footer from "@/components/Footer";
 
 const orderSchema = z.object({
   name: z.string().trim().min(1, "Nama harus diisi").max(100, "Nama maksimal 100 karakter"),
   address: z.string().trim().min(1, "Alamat harus diisi").max(500, "Alamat maksimal 500 karakter"),
   quantity: z.number().min(1, "Minimal pesan 1 botol").max(100, "Maksimal pesan 100 botol"),
 });
 
 type OrderData = z.infer<typeof orderSchema>;
 
 const Order = () => {
   const [formData, setFormData] = useState<OrderData>({
     name: "",
     address: "",
     quantity: 1,
   });
   const [errors, setErrors] = useState<Partial<Record<keyof OrderData, string>>>({});
 
   const handleChange = (field: keyof OrderData, value: string | number) => {
     setFormData((prev) => ({ ...prev, [field]: value }));
     // Clear error when user starts typing
     if (errors[field]) {
       setErrors((prev) => ({ ...prev, [field]: undefined }));
     }
   };
 
   const generateWhatsAppLink = () => {
     // Validate form data
     const result = orderSchema.safeParse(formData);
     
     if (!result.success) {
       const fieldErrors: Partial<Record<keyof OrderData, string>> = {};
       result.error.errors.forEach((err) => {
         const field = err.path[0] as keyof OrderData;
         fieldErrors[field] = err.message;
       });
       setErrors(fieldErrors);
       return;
     }
 
     const message = `Halo, saya mau pesan Tepache.
 
 Nama: ${formData.name.trim()}
 Alamat CoD: ${formData.address.trim()}
 Jumlah: ${formData.quantity} botol`;
 
     const encodedMessage = encodeURIComponent(message);
     const whatsappUrl = `https://api.whatsapp.com/send?phone=6285156083920&text=${encodedMessage}`;
     
     window.open(whatsappUrl, "_blank");
   };
 
   return (
     <div className="min-h-screen bg-background overflow-x-hidden">
       <Navbar />
       
       <main className="pt-32 pb-20 px-6">
         <div className="max-w-xl mx-auto">
           {/* Header */}
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <Link
               to="/"
               className="inline-flex items-center gap-2 text-forest/60 hover:text-forest transition-colors mb-4"
             >
               <ArrowLeft className="w-4 h-4" />
               Kembali ke Beranda
             </Link>
             
             <div className="flex items-center gap-3">
               <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center">
                 <ShoppingBag className="w-7 h-7 text-forest" />
               </div>
               <div>
                 <h1 className="text-3xl font-black text-forest">Pesan Tepache</h1>
                 <p className="text-forest/60">Isi formulir untuk melakukan pemesanan</p>
               </div>
             </div>
           </motion.div>
 
           {/* Form */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="glass-card-strong rounded-3xl p-8"
           >
             <div className="space-y-6">
               {/* Name */}
               <div>
                 <label className="block text-sm font-semibold text-forest mb-2">
                   Nama <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   value={formData.name}
                   onChange={(e) => handleChange("name", e.target.value)}
                   className={`w-full px-4 py-3 rounded-xl bg-cream border ${
                    errors.name ? "border-destructive" : "border-border"
                   } focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium`}
                   placeholder="Masukkan nama Anda"
                 />
                 {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                 )}
               </div>
 
               {/* Address */}
               <div>
                 <label className="block text-sm font-semibold text-forest mb-2">
                   Alamat CoD <span className="text-red-500">*</span>
                 </label>
                 <textarea
                   value={formData.address}
                   onChange={(e) => handleChange("address", e.target.value)}
                   rows={3}
                   className={`w-full px-4 py-3 rounded-xl bg-cream border ${
                    errors.address ? "border-destructive" : "border-border"
                   } focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium resize-none`}
                   placeholder="Masukkan alamat lengkap untuk pengantaran"
                 />
                 {errors.address && (
                  <p className="text-destructive text-sm mt-1">{errors.address}</p>
                 )}
               </div>
 
               {/* Quantity */}
               <div>
                 <label className="block text-sm font-semibold text-forest mb-2">
                   Jumlah Pemesanan <span className="text-red-500">*</span>
                 </label>
                 <div className="flex items-center gap-3">
                   <button
                     type="button"
                     onClick={() => handleChange("quantity", Math.max(1, formData.quantity - 1))}
                     className="w-12 h-12 rounded-xl bg-forest/10 hover:bg-forest/20 text-forest font-bold text-xl transition-colors"
                   >
                     -
                   </button>
                   <input
                     type="number"
                     min={1}
                     max={100}
                     value={formData.quantity}
                     onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 1)}
                     className={`w-20 text-center px-4 py-3 rounded-xl bg-cream border ${
                      errors.quantity ? "border-destructive" : "border-border"
                     } focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-bold text-lg`}
                   />
                   <button
                     type="button"
                     onClick={() => handleChange("quantity", Math.min(100, formData.quantity + 1))}
                     className="w-12 h-12 rounded-xl bg-forest/10 hover:bg-forest/20 text-forest font-bold text-xl transition-colors"
                   >
                     +
                   </button>
                   <span className="text-forest/60 font-medium ml-2">botol</span>
                 </div>
                 {errors.quantity && (
                  <p className="text-destructive text-sm mt-1">{errors.quantity}</p>
                 )}
               </div>
 
               {/* Submit Button */}
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 type="button"
                 onClick={generateWhatsAppLink}
                 className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg"
               >
                 <Send className="w-5 h-5" />
                 Pesan via WhatsApp
               </motion.button>
 
               <p className="text-center text-forest/50 text-sm">
                 Anda akan diarahkan ke WhatsApp untuk mengirim pesanan
               </p>
             </div>
           </motion.div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Order;