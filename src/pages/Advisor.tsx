import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AdvisorForm, FormData } from "@/components/AdvisorForm";
import { AdvisorResult } from "@/components/AdvisorResult";
import { EngagementExplainer } from "@/components/EngagementExplainer";
import { HookGenerator } from "@/components/HookGenerator";
import { PostRewriter } from "@/components/PostRewriter";
import { ToneTransformer } from "@/components/ToneTransformer";
import { PostComparator } from "@/components/PostComparator";
import { PlatformAdaptor } from "@/components/PlatformAdaptor";
import { ImagePromptGenerator } from "@/components/ImagePromptGenerator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, Wand2, Lightbulb, PenTool, RefreshCcw, Scale, Repeat, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

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

export default function Advisor() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [advice, setAdvice] = useState<PostAdvice | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (data: FormData) => {
    setIsGenerating(true);
    setFormData(data);

    try {
      const { data: responseData, error } = await supabase.functions.invoke("generate-post-advice", {
        body: {
          platform: data.platform,
          topic: data.topic,
          goal: data.goal,
          tone: data.tone,
          additionalContext: data.additionalContext,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to generate advice");
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      setAdvice({
        platform: data.platform,
        topic: data.topic,
        goal: data.goal,
        tone: data.tone,
        hook_suggestion: responseData.hook_suggestion,
        post_structure: responseData.post_structure,
        algorithm_tips: responseData.algorithm_tips,
        content_length: responseData.content_length,
        best_posting_time: responseData.best_posting_time,
        common_mistakes: responseData.common_mistakes,
        engagement_score: responseData.engagement_score,
      });

      toast.success("Post advice generated!");
    } catch (error) {
      console.error("Error generating advice:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate advice. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!advice || !user) return;

    setIsSaving(true);

    try {
      const { error } = await supabase.from("generated_posts").insert({
        user_id: user.id,
        platform: advice.platform,
        topic: advice.topic,
        goal: advice.goal,
        tone: advice.tone,
        hook_suggestion: advice.hook_suggestion,
        post_structure: advice.post_structure,
        algorithm_tips: advice.algorithm_tips,
        content_length: advice.content_length,
        best_posting_time: advice.best_posting_time,
        common_mistakes: advice.common_mistakes,
        engagement_score: advice.engagement_score,
      });

      if (error) throw error;

      toast.success("Post saved to your dashboard!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pattern-dots">
        <main className="container py-8 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-2">
                Content <span className="text-primary text-glow">Advisor</span>
              </h1>
              <p className="text-muted-foreground font-medium tracking-tight">
                Harness the power of AI to craft high-engagement social media content
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 px-6 py-2.5 rounded-full border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-premium"
            >
              <Sparkles className="h-4 w-4 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              Tier 2 Advanced Suite Enabled
            </motion.div>
          </div>

          <Tabs defaultValue="advisor" className="space-y-12">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-surface backdrop-blur-2xl border border-border/50 p-1.5 rounded-2xl h-auto min-h-14">
              <TabsTrigger value="advisor" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <Wand2 className="h-4 w-4" />
                <span className="hidden md:inline">Advisor</span>
              </TabsTrigger>
              <TabsTrigger value="hooks" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden md:inline">Hooks</span>
              </TabsTrigger>
              <TabsTrigger value="rewrite" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <PenTool className="h-4 w-4" />
                <span className="hidden md:inline">Rewriter</span>
              </TabsTrigger>
              <TabsTrigger value="tone" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <RefreshCcw className="h-4 w-4" />
                <span className="hidden md:inline">Tone</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <Scale className="h-4 w-4" />
                <span className="hidden md:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="adaptor" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <Repeat className="h-4 w-4" />
                <span className="hidden md:inline">Adaptor</span>
              </TabsTrigger>
              <TabsTrigger value="prompts" className="gap-2 px-1 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden md:inline">Prompts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="advisor">
              <div className="grid gap-8 lg:grid-cols-2">
                <AdvisorForm onSubmit={handleSubmit} isLoading={isGenerating} />

                <div className="relative">
                  {advice ? (
                    <div className="space-y-12 animate-fade-in">
                      <AdvisorResult advice={advice} onSave={handleSave} isSaving={isSaving} />
                      <EngagementExplainer post={advice} />
                    </div>
                  ) : (
                    <div className="lg:sticky lg:top-32 h-full flex items-center justify-center p-12 glass border border-border/50 border-dashed rounded-3xl min-h-[400px]">
                      <div className="text-center">
                        <div className="mx-auto mb-8 h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shadow-premium animate-pulse-glow">
                          ✨
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-foreground mb-3">
                          Your advice will appear here
                        </h3>
                        <p className="text-muted-foreground/60 max-w-xs mx-auto font-medium leading-relaxed">
                          Fill out the form and click generate to get personalized post recommendations and engagement scoring.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hooks">
              <div className="max-w-4xl mx-auto">
                <HookGenerator onSelect={(hook) => toast.info(`You selected: ${hook}. Use this in your next post!`)} />
              </div>
            </TabsContent>

            <TabsContent value="rewrite">
              <PostRewriter />
            </TabsContent>

            <TabsContent value="tone">
              <ToneTransformer />
            </TabsContent>

            <TabsContent value="compare">
              <PostComparator />
            </TabsContent>

            <TabsContent value="adaptor">
              <PlatformAdaptor />
            </TabsContent>

            <TabsContent value="prompts">
              <ImagePromptGenerator />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PageTransition>
  );
}
