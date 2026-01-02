import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { PostHistoryCard } from "@/components/PostHistoryCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel, FilterOptions } from "@/components/FilterPanel";
import { EngagementChart } from "@/components/EngagementChart";
import { PlatformBreakdown } from "@/components/PlatformBreakdown";
import { InsightsCard } from "@/components/InsightsCard";
import { GoalPerformance } from "@/components/GoalPerformance";
import { ToneDistribution } from "@/components/ToneDistribution";
import { PlatformPerformance } from "@/components/PlatformPerformance";
import { EngagementHeatmap } from "@/components/EngagementHeatmap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, LayoutDashboard, History, BarChart3, Sparkles, Zap } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const MOCK_POSTS = [
  {
    id: "mock-1",
    topic: "10 Tips for Better Social Media Engagement",
    platform: "instagram",
    goal: "engagement",
    tone: "professional",
    engagement_score: 85,
    created_at: new Date().toISOString(),
    is_favorite: true,
    hook_suggestion: "Stop shouting into the void! 🗣️ Here are 10 proven ways to actually reach your audience.",
  },
  {
    id: "mock-2",
    topic: "My Journey into AI Development",
    platform: "linkedin",
    goal: "reach",
    tone: "inspiring",
    engagement_score: 92,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    is_favorite: false,
    hook_suggestion: "I never thought code could feel this magical. ✨ Here's how building with AI changed my career.",
  },
  {
    id: "mock-3",
    topic: "Why Quality Over Quantity Matters",
    platform: "twitter",
    goal: "shares",
    tone: "casual",
    engagement_score: 78,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    is_favorite: true,
    hook_suggestion: "Unpopular opinion: You don't need to post 5 times a day. 🧵",
  },
  {
    id: "mock-4",
    topic: "Day in the life of a Creator",
    platform: "tiktok",
    goal: "followers",
    tone: "humorous",
    engagement_score: 95,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    is_favorite: false,
    hook_suggestion: "POV: You're trying to film a transition while your cat is losing it. 🐱💻",
  },
  {
    id: "mock-5",
    topic: "The Future of Remote Work",
    platform: "linkedin",
    goal: "engagement",
    tone: "professional",
    engagement_score: 88,
    created_at: new Date(Date.now() - 432000000).toISOString(),
    is_favorite: true,
    hook_suggestion: "Remote work isn't just a trend, it's a revolution. 🌍 Are you ready for the next phase?",
  },
  {
    id: "mock-6",
    topic: "New Feature Launch: AI Content Suite",
    platform: "twitter",
    goal: "reach",
    tone: "educational",
    engagement_score: 82,
    created_at: new Date(Date.now() - 604800000).toISOString(),
    is_favorite: false,
    hook_suggestion: "Writing social media posts just got 10x easier. ⚡ Introducing our AI Content Suite.",
  },
  {
    id: "mock-7",
    topic: "How to Stay Focused While Working from Home",
    platform: "instagram",
    goal: "comments",
    tone: "casual",
    engagement_score: 75,
    created_at: new Date(Date.now() - 864000000).toISOString(),
    is_favorite: false,
    hook_suggestion: "My secret weapon for productivity? It's not what you think. ☕🥧",
  },
  {
    id: "mock-8",
    topic: "Building a Brand that Lasts",
    platform: "tiktok",
    goal: "shares",
    tone: "inspiring",
    engagement_score: 91,
    created_at: new Date(Date.now() - 1209600000).toISOString(),
    is_favorite: true,
    hook_suggestion: "Brands are built on stories, not logos. 📖 What's your story?",
  },
  {
    id: "mock-9",
    topic: "10 CSS Tricks You Didn't Know",
    platform: "twitter",
    goal: "engagement",
    tone: "educational",
    engagement_score: 77,
    created_at: new Date(Date.now() - 518400000).toISOString(),
    is_favorite: false,
    hook_suggestion: "Your CSS is probably 5 years behind. 💅 Here are 10 tricks to modernize your workflow.",
  },
  {
    id: "mock-10",
    topic: "How I Scaled My SaaS to 10k Users",
    platform: "linkedin",
    goal: "reach",
    tone: "professional",
    engagement_score: 96,
    created_at: new Date(Date.now() - 1555200000).toISOString(),
    is_favorite: true,
    hook_suggestion: "Scaling isn't about more code, it's about better systems. 🚀 Our journey to 10,000 users.",
  }
];

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    platform: "all",
    goal: "all",
    tone: "all",
    sortBy: "newest",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("generated_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // If no data, use mock data for visualization
      if (!data || data.length === 0) {
        setPosts(MOCK_POSTS);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Fallback to mock data on error so the UI isn't empty
      setPosts(MOCK_POSTS);
      toast.error("Failed to load your posts, showing sample data instead.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from("generated_posts")
        .update({ is_favorite: isFavorite })
        .eq("id", id);
      if (error) throw error;
      setPosts(posts.map((p) => (p.id === id ? { ...p, is_favorite: isFavorite } : p)));
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite");
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase.from("generated_posts").delete().eq("id", id);
      if (error) throw error;
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Post deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query ||
          post.topic.toLowerCase().includes(query) ||
          post.platform.toLowerCase().includes(query) ||
          (post.hook_suggestion && post.hook_suggestion.toLowerCase().includes(query));

        const matchesPlatform = filters.platform === "all" || post.platform.toLowerCase() === filters.platform.toLowerCase();
        const matchesGoal = filters.goal === "all" || post.goal.toLowerCase() === filters.goal.toLowerCase();
        const matchesTone = filters.tone === "all" || post.tone.toLowerCase() === filters.tone.toLowerCase();

        return matchesSearch && matchesPlatform && matchesGoal && matchesTone;
      })
      .sort((a, b) => {
        if (filters.sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (filters.sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (filters.sortBy === "engagement") return (b.engagement_score || 0) - (a.engagement_score || 0);
        return 0;
      });
  }, [posts, searchQuery, filters]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pattern-dots">
        <main className="container py-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-2">
                Dash<span className="text-primary text-glow">board</span>
              </h1>
              <p className="text-muted-foreground font-medium tracking-tight">Manage your content and track performance with AI insights</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Button onClick={() => navigate("/advisor")} className="gap-2 shadow-premium hover:shadow-glow transition-all duration-500 rounded-2xl h-14 px-8 text-lg font-bold gradient-premium border-none text-white overflow-hidden group">
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" />
                Create New Post
              </Button>
            </motion.div>
          </div>

          <Tabs defaultValue="overview" className="space-y-12">
            <TabsList className="bg-surface backdrop-blur-2xl border border-border/50 p-1.5 rounded-2xl h-14">
              <TabsTrigger value="overview" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <History className="h-4 w-4" />
                Post History
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 px-6 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-premium transition-all duration-300 font-bold tracking-tight">
                <BarChart3 className="h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                <motion.div variants={staggerItem}>
                  <StatsCard title="Total Posts" value={posts.length} icon={History} />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard
                    title="Avg. Engagement"
                    value={`${Math.round(posts.reduce((acc, p) => acc + (p.engagement_score || 0), 0) / (posts.length || 1))}%`}
                    icon={BarChart3}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard
                    title="Industry Benchmark"
                    value="+12.5%"
                    icon={Sparkles}
                    description="Compared to platform average"
                    trend="up"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard
                    title="Growth Velocity"
                    value="2.4x"
                    icon={Zap}
                    description="Weekly reach acceleration"
                    trend="up"
                  />
                </motion.div>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-7 mt-12">
                <div className="md:col-span-4 transition-all duration-500 hover:scale-[1.01]">
                  <EngagementChart posts={posts} />
                </div>
                <div className="md:col-span-3 transition-all duration-500 hover:scale-[1.01]">
                  <PlatformBreakdown posts={posts} />
                </div>
              </div>

              <div className="mt-8">
                <InsightsCard posts={posts} />
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <aside className="lg:col-span-1 order-2 lg:order-1">
                  <div className="sticky top-28">
                    <FilterPanel
                      filters={filters}
                      onChange={setFilters}
                      onReset={() => setFilters({
                        platform: "all",
                        goal: "all",
                        tone: "all",
                        sortBy: "newest",
                      })}
                    />
                  </div>
                </aside>

                <div className="lg:col-span-3 space-y-12 order-1 lg:order-2">
                  <div className="p-2 rounded-2xl glass border border-border/50 shadow-premium">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  </div>

                  <AnimatePresence mode="wait">
                    {filteredPosts.length > 0 ? (
                      <motion.div
                        key="results-grid"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="grid gap-8 md:grid-cols-2"
                      >
                        {filteredPosts.map((post) => (
                          <motion.div key={post.id} variants={staggerItem} layout>
                            <PostHistoryCard
                              post={post}
                              onToggleFavorite={toggleFavorite}
                              onDelete={deletePost}
                              onView={(p) => navigate("/advisor", { state: { post: p } })}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-40 rounded-3xl glass border border-dashed border-white/10"
                      >
                        <div className="h-20 w-20 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-6 shadow-premium">
                          <History className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight mb-2">No posts found</h3>
                        <p className="text-muted-foreground/60 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-12">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="transition-all duration-500 hover:scale-[1.02]">
                    <PlatformPerformance posts={posts} />
                  </div>
                  <div className="transition-all duration-500 hover:scale-[1.02]">
                    <GoalPerformance posts={posts} />
                  </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="transition-all duration-500 hover:scale-[1.02]">
                    <ToneDistribution posts={posts} />
                  </div>
                  <div className="transition-all duration-500 hover:scale-[1.02]">
                    <EngagementHeatmap posts={posts} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PageTransition>
  );
}
