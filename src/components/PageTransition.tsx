import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
