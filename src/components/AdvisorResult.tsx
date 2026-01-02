import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlatformIcon, platformColors } from "@/components/PlatformIcon";
import {
  Lightbulb,
  ListOrdered,
  TrendingUp,
  Clock,
  AlertTriangle,
  Star,
  Copy,
  Check,
  Ruler,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostAdvice {
  platform: string;
  topic: string;
  goal: string;
  tone: string;
  hook_suggestion: string;
  post_structure: string;
  algorithm_tips: string[];
  content_length: string;
  best_posting_time: string;
  common_mistakes: string[];
  engagement_score: number;
}

interface AdvisorResultProps {
  advice: PostAdvice;
  onSave: () => void;
  isSaving: boolean;
}

export function AdvisorResult({ advice, onSave, isSaving }: AdvisorResultProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card border-white/5 overflow-hidden group shadow-premium">
        <CardHeader className="pb-8 border-b border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`h-16 w-16 rounded-2xl ${platformColors[advice.platform.toLowerCase()] || 'bg-primary'} flex items-center justify-center text-white shadow-premium transition-transform duration-500 group-hover:scale-110`}>
                <PlatformIcon platform={advice.platform} className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black tracking-tight capitalize group-hover:text-primary transition-colors duration-300">{advice.platform} Post Advice</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/5 text-muted-foreground/80 font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 border-none">{advice.goal}</Badge>
                  <span className="text-muted-foreground/30">•</span>
                  <Badge variant="secondary" className="bg-white/5 text-muted-foreground/80 font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 border-none">{advice.tone}</Badge>
                </div>
              </div>
            </div>
            <div className="text-center sm:text-right bg-white/5 p-4 rounded-2xl border border-white/5 min-w-[140px] shadow-premium">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Engagement Score</div>
              <div className={cn(
                "text-4xl font-black tracking-tighter drop-shadow-[0_0_12px_rgba(var(--primary),0.3)]",
                getScoreColor(advice.engagement_score)
              )}>
                {advice.engagement_score}%
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Hook Suggestion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="h-4 w-4 text-warning" />
                Hook Suggestion
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(advice.hook_suggestion, "hook")}
                className="h-8"
              >
                {copied === "hook" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <p className="text-foreground font-medium italic">"{advice.hook_suggestion}"</p>
            </div>
          </div>

          <Separator />

          {/* Post Structure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListOrdered className="h-4 w-4 text-primary" />
                Recommended Structure
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(advice.post_structure, "structure")}
                className="h-8"
              >
                {copied === "structure" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <p className="text-foreground whitespace-pre-wrap">{advice.post_structure}</p>
            </div>
          </div>

          <Separator />

          {/* Algorithm Tips */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-accent" />
              Algorithm-Aware Tips
            </div>
            <div className="grid gap-2">
              {advice.algorithm_tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20"
                >
                  <Badge variant="secondary" className="shrink-0">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Meta Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Ruler className="h-4 w-4 text-primary" />
                Ideal Length
              </div>
              <p className="text-foreground">{advice.content_length}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock className="h-4 w-4 text-accent" />
                Best Posting Time
              </div>
              <p className="text-foreground">{advice.best_posting_time}</p>
            </div>
          </div>

          <Separator />

          {/* Common Mistakes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Common Mistakes to Avoid
            </div>
            <div className="grid gap-2">
              {advice.common_mistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <span className="text-destructive">✗</span>
                  <p className="text-sm text-foreground">{mistake}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Save Button */}
          <Button onClick={onSave} disabled={isSaving} className="w-full" size="lg">
            <Star className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save to Dashboard"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
