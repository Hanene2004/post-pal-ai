import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-card transition-all duration-300">
      <CardContent className="pt-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-button">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
