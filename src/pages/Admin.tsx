import { useState } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useBatch, BatchData } from "@/context/BatchContext";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const { batchData, updateBatchData } = useBatch();
  const [formData, setFormData] = useState<BatchData>(batchData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBatchData(formData);
    toast({
      title: "Batch Updated!",
      description: "The batch information has been saved successfully.",
    });
  };

  const handleChange = (field: keyof BatchData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/batch-tracker"
            className="inline-flex items-center gap-2 text-forest/60 hover:text-forest transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Batch Tracker
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <span className="text-forest font-black text-lg">⚙️</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-forest">Admin Panel</h1>
              <p className="text-forest/60 text-sm">Update batch information</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card-strong rounded-3xl p-8 space-y-6"
        >
          {/* Batch Code */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Batch Code
            </label>
            <input
              type="text"
              value={formData.batchCode}
              onChange={(e) => handleChange("batchCode", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium"
              placeholder="e.g., OBL-2026-001"
            />
          </div>

          {/* Fermentation Started */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Fermentation Started
            </label>
            <input
              type="text"
              value={formData.fermentationStarted}
              onChange={(e) => handleChange("fermentationStarted", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium"
              placeholder="e.g., 18 Jan 2026 | 10:00 PM"
            />
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Harvest Date
            </label>
            <input
              type="text"
              value={formData.harvestDate}
              onChange={(e) => handleChange("harvestDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium"
              placeholder="e.g., 21 Jan 2026 | 11:00 AM"
            />
          </div>

          {/* Best Before */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Best Before
            </label>
            <input
              type="text"
              value={formData.bestBefore}
              onChange={(e) => handleChange("bestBefore", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium"
              placeholder="e.g., 21 Feb 2026"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value as BatchData["status"])}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-forest font-medium"
            >
              <option value="fermenting">🔄 Fermenting</option>
              <option value="harvested">🌿 Harvested</option>
              <option value="ready">✓ Ready to Enjoy</option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </motion.button>
        </motion.form>

        {/* Preview Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <Link
            to="/batch-tracker"
            className="text-gold hover:text-gold-light font-semibold transition-colors"
          >
            View Batch Tracker →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
