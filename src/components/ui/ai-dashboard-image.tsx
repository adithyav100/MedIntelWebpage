import { motion } from 'motion/react';

export const AIDashboardImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-full min-h-[400px] md:min-h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl glass-panel"
    >
      <img
        src="/MedIntelWebpage/ai-dashboard-preview.png"
        alt="AI Generated Medical Dashboard Interface"
        className="object-cover w-full h-full object-top"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
