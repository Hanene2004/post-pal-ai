import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={cn(
        sizeClasses[size],
        "gradient-premium rounded-xl flex items-center justify-center shadow-premium transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
      )}>
        <Sparkles className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" size={size === "lg" ? 28 : size === "md" ? 22 : 18} />
      </div>
      {showText && (
        <span className={cn(
          "font-black tracking-tighter",
          textSizeClasses[size],
          "text-foreground flex items-center"
        )}>
          Post<span className="text-gradient drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] ml-0.5">Advisor</span>
        </span>
      )}
    </div>
  );
}
