// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideInLeft = {
  initial: { x: -30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
 exit: { x: 30, opacity: 0 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Hover/tap animations
export const hoverScale = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const tapScale = {
  scale: 0.98
};

export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  transition: { duration: 0.2 }
};

export const cardHover = {
  y: -8,
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  transition: { duration: 0.2 }
};
