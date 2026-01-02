import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="glass-card border-border/50 overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{title}</CardTitle>
          <div className="h-10 w-10 rounded-xl gradient-premium flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-500">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black tracking-tighter text-foreground text-glow">{value}</div>
          {description && (
            <p className="text-[10px] font-medium text-muted-foreground/80 mt-2 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-primary" />
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
