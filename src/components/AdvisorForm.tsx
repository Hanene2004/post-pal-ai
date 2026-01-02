import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlatformIcon, platformColors } from "@/components/PlatformIcon";
import { Wand2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvisorFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export interface FormData {
  platform: string;
  topic: string;
  goal: string;
  tone: string;
  additionalContext?: string;
}

const platforms = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter/X" },
];

const goals = [
  { id: "likes", label: "Maximize Likes" },
  { id: "comments", label: "Drive Comments" },
  { id: "shares", label: "Encourage Shares" },
  { id: "reach", label: "Expand Reach" },
  { id: "followers", label: "Gain Followers" },
];

const tones = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual & Friendly" },
  { id: "educational", label: "Educational" },
  { id: "inspiring", label: "Inspiring" },
  { id: "humorous", label: "Humorous" },
  { id: "storytelling", label: "Storytelling" },
];

export function AdvisorForm({ onSubmit, isLoading }: AdvisorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    platform: "",
    topic: "",
    goal: "",
    tone: "",
    additionalContext: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.platform && formData.topic && formData.goal && formData.tone) {
      onSubmit(formData);
    }
  };

  const isValid = formData.platform && formData.topic && formData.goal && formData.tone;

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden group shadow-premium">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-background/40 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-6 h-24 w-24 rounded-3xl gradient-premium flex items-center justify-center text-white shadow-glow"
            >
              <Sparkles className="h-12 w-12 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </motion.div>
            <h3 className="text-2xl font-black tracking-tight text-foreground mb-2">AI is analyzing...</h3>
            <p className="text-muted-foreground/60 font-medium max-w-xs leading-relaxed">
              Synthesizing market trends and optimizing your content for {formData.platform} engagement.
            </p>
            <div className="mt-8 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      1
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-premium flex items-center justify-center shadow-premium">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          Create Your Post
        </CardTitle>
        <CardDescription className="text-muted-foreground/60 font-medium">
          Fill in the details and let AI generate optimized advice for your social media post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Platform</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform: platform.id })}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${formData.platform === platform.id
                    ? "border-primary/50 bg-primary/10 shadow-premium"
                    : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                    }`}
                >
                  <div className={`h-10 w-10 rounded-xl ${platformColors[platform.id]} flex items-center justify-center text-white shadow-premium`}>
                    <PlatformIcon platform={platform.id} className="h-5 w-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{platform.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="topic" className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Topic / Content Idea</Label>
            <Textarea
              id="topic"
              placeholder="What's your post about? e.g., 'Tips for remote work productivity'..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="min-h-[120px] resize-none bg-white/5 border-white/5 rounded-2xl focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 p-4 font-medium"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Goal</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/5 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 font-medium">
                  <SelectValue placeholder="What do you want to achieve?" />
                </SelectTrigger>
                <SelectContent className="glass-dark border-white/10 rounded-2xl">
                  {goals.map((goal) => (
                    <SelectItem key={goal.id} value={goal.id} className="rounded-xl focus:bg-primary/20 focus:text-primary transition-colors py-3">
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/5 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 font-medium">
                  <SelectValue placeholder="How should it sound?" />
                </SelectTrigger>
                <SelectContent className="glass-dark border-white/10 rounded-2xl">
                  {tones.map((tone) => (
                    <SelectItem key={tone.id} value={tone.id} className="rounded-xl focus:bg-primary/20 focus:text-primary transition-colors py-3">
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="context" className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Additional Context (Optional)</Label>
            <Input
              id="context"
              placeholder="Any specific requirements or target audience details?"
              value={formData.additionalContext}
              onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
              className="h-12 bg-white/5 border-white/5 rounded-2xl focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 px-4 font-medium"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-14 rounded-2xl gradient-premium border-none shadow-premium hover:shadow-glow transition-all duration-500 text-lg font-black tracking-tight" disabled={!isValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Advice...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Premium Advice
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
