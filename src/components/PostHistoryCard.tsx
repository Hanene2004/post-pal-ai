import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon, platformColors } from "@/components/PlatformIcon";
import { Heart, Star, Trash2, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostHistoryCardProps {
  post: {
    id: string;
    platform: string;
    topic: string;
    goal: string;
    tone: string;
    hook_suggestion: string | null;
    engagement_score: number | null;
    is_favorite: boolean | null;
    created_at: string;
  };
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string) => void;
  onView: (post: any) => void;
}

export function PostHistoryCard({ post, onToggleFavorite, onDelete, onView }: PostHistoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card border-white/5 shadow-premium hover:shadow-glow transition-all duration-500 group overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-premium transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                platformColors[post.platform.toLowerCase()] || 'gradient-premium'
              )}>
                <PlatformIcon platform={post.platform} className="h-6 w-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>
              <div>
                <CardTitle className="text-lg font-black tracking-tight capitalize">{post.platform}</CardTitle>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => onView(post)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10"
                onClick={() => onToggleFavorite(post.id, !post.is_favorite)}
              >
                <Star className={cn("h-4 w-4 transition-all", post.is_favorite ? 'fill-warning text-warning drop-shadow-[0_0_8px_rgba(var(--warning),0.5)]' : 'text-muted-foreground')} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/10 hover:bg-red-500/20 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => onDelete(post.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <p className="text-base font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">{post.topic}</p>
            {post.hook_suggestion && (
              <p className="text-sm text-muted-foreground/80 line-clamp-2 italic leading-relaxed">"{post.hook_suggestion}"</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-wider px-2 py-0.5">{post.goal}</Badge>
              <Badge variant="outline" className="border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">{post.tone}</Badge>
            </div>
            {post.engagement_score !== null && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5">
                <Heart className="h-3 w-3 text-red-500 fill-red-500/20" />
                <span className="text-[10px] font-black text-foreground">{post.engagement_score}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
