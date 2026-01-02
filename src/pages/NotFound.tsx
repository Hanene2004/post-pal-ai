import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-background pattern-dots p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="relative">
            <h1 className="text-[12rem] font-black tracking-tighter text-white/5 select-none leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
              <div className="relative glass-card border-white/5 p-8 rounded-3xl shadow-premium backdrop-blur-3xl">
                <p className="text-3xl font-black tracking-tight text-foreground">Lost in <span className="text-primary text-glow">Space</span>?</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-xl font-bold text-muted-foreground/80">Oops! This page doesn't exist.</h2>
            <p className="text-sm text-muted-foreground/60 max-w-xs mx-auto font-medium leading-relaxed">
              The content you're looking for might have been moved or doesn't exist anymore.
            </p>
          </div>

          <div className="pt-6">
            <a
              href="/"
              className="inline-flex items-center justify-center h-14 px-8 rounded-2xl gradient-premium text-white font-black tracking-tight shadow-premium hover:shadow-glow transition-all duration-500 group"
            >
              Take Me Home
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
