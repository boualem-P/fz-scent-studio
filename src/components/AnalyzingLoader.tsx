import { motion } from "framer-motion";

const AnalyzingLoader = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-background relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, hsl(43 72% 52% / 0.06) 0%, transparent 60%)"
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-8 relative z-10"
      >
        {/* Spinning gold circle */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-transparent border-b-primary/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-xl tracking-[0.2em] uppercase text-primary"
          >
            Analyse en cours
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
            className="font-body text-sm tracking-widest text-muted-foreground mt-3"
          >
            Profilage olfactif...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzingLoader;
