import { User } from "lucide-react";
import { motion } from "framer-motion";
import { springHover, springTap } from "@/lib/animations";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const ProfileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          className="w-12 h-12 rounded-full border border-primary/30 bg-black/80 text-primary backdrop-blur-xl flex items-center justify-center hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all shadow-2xl"
        >
          <User size={20} />
        </motion.button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black/90 backdrop-blur-2xl border-r border-primary/20 text-foreground">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-primary tracking-wide">
            Mon Espace Fz Parfums
          </SheetTitle>
          <SheetDescription className="text-muted-foreground font-serif italic text-sm">
            Votre univers olfactif personnel
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
