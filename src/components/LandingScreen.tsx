import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem } from "@/lib/animations";

const MODEL_URL = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/glass-bottle/model.gltf";

function BottleModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} scale={2.5} position={[0, -1, 0]} />;
}

useGLTF.preload(MODEL_URL);

const LandingScreen = ({ onSelectGender }: { onSelectGender: (g: Gender) => void }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      
      {/* 3D CANVAS – arrière-plan complet */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 1, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[-5, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} />

            <Environment preset="city" />

            <Float
              speed={1.5}
              rotationIntensity={0.4}
              floatIntensity={0.6}
              floatingRange={[-0.1, 0.1]}
            >
              <BottleModel />
            </Float>

            <OrbitControls
              autoRotate
              autoRotateSpeed={1.5}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay radial pour lisibilité du texte */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.7)_100%)]" />

      {/* UI OVERLAY – par-dessus le Canvas */}
      <div className="absolute inset-0 z-[2] pointer-events-none flex flex-col items-center justify-center px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center pointer-events-none"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-6xl md:text-8xl bg-gradient-to-b from-[hsl(51,80%,75%)] to-[hsl(43,75%,52%)] bg-clip-text text-transparent tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            Fz Parfums
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="font-serif italic text-xl text-primary/80 mb-12 tracking-widest"
          >
            L'art de flaconner l'inoubliable.
          </motion.p>

          {/* BOUTONS – pointer-events-auto pour rester cliquables */}
          <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
            {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
              <motion.button
                key={gender}
                variants={staggerItem}
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelectGender(gender)}
                className="px-14 py-5 min-w-[200px] font-display text-sm tracking-[0.4em] uppercase border border-primary/30 bg-black/40 text-primary backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] active:bg-primary active:text-black transition-colors duration-300 hover:border-primary/60 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              >
                {gender}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.8em] text-primary"
        >
          Touchez pour commencer
        </motion.div>
      </div>
    </div>
  );
};

export default LandingScreen;
