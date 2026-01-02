import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostRewriter } from "@/components/PostRewriter";
import { ToneTransformer } from "@/components/ToneTransformer";
import { DraftsManager } from "@/components/DraftsManager";
import { Wand2, Layout, BookOpen, Clock, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContentStudio() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">
                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Wand2 className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Content Studio</h1>
                                    <p className="text-muted-foreground text-lg">Advanced AI-powered workspace for content refining and cross-platform adaptation</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        <div className="lg:col-span-3 space-y-8">
                            <Tabs defaultValue="rewriter" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-surface p-1 rounded-xl glass border border-border/50 h-12">
                                    <TabsTrigger value="rewriter" className="gap-2 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-black tracking-tight transition-all duration-300">
                                        <Sparkles className="h-4 w-4" />
                                        Smart Rewriter
                                    </TabsTrigger>
                                    <TabsTrigger value="transformer" className="gap-2 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-black tracking-tight transition-all duration-300">
                                        <Layout className="h-4 w-4" />
                                        Tone Transformer
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="rewriter" className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <PostRewriter />
                                </TabsContent>

                                <TabsContent value="transformer" className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <ToneTransformer />
                                </TabsContent>
                            </Tabs>

                            <Card className="glass-card border-border/50 shadow-premium">
                                <CardHeader>
                                    <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl gradient-premium flex items-center justify-center shadow-premium">
                                            <Zap className="h-5 w-5 text-white" />
                                        </div>
                                        Keyword Optimizer
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground/60 font-medium">High-relevance keywords for your current drafts</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { word: "Authentic", score: 98, trend: "up" },
                                            { word: "Scalable", score: 92, trend: "stable" },
                                            { word: "Innovative", score: 85, trend: "up" },
                                            { word: "Impactful", score: 79, trend: "new" },
                                        ].map((k) => (
                                            <div key={k.word} className="p-4 rounded-2xl bg-surface border border-border/50 hover:border-primary/20 transition-all group cursor-default">
                                                <div className="text-sm font-black text-foreground mb-1 group-hover:text-primary transition-colors">{k.word}</div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-bold text-primary">{k.score}% Match</span>
                                                    <Badge className="text-[8px] font-black uppercase bg-primary/10 text-primary border-none">{k.trend}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <DraftsManager />

                            <Card className="glass-card bg-primary/5 border-primary/20 shadow-premium overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10 group-hover:bg-primary/20 transition-all duration-500" />
                                <CardHeader>
                                    <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2 text-primary">
                                        <BookOpen className="h-4 w-4" />
                                        Studio Mastery
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/42">Pro Tip: Syncing</p>
                                        <p className="text-sm font-medium leading-relaxed">Transform a single LinkedIn post into <span className="text-primary font-bold">5 different Twitter threads</span> with one click.</p>
                                    </div>
                                    <div className="space-y-2 pt-4 border-t border-border/50">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/42">Legacy: Undo</p>
                                        <p className="text-sm font-medium leading-relaxed">Access up to <span className="text-primary font-bold">10 previous versions</span> of your rewrites in the history panel.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-border/50 shadow-premium">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground/40">
                                        <Clock className="h-3 w-3" />
                                        Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { action: "Rewrote 'AI Future' for TikTok", time: "2m ago" },
                                            { action: "Synced 4 drafts to Calendar", time: "15m ago" },
                                            { action: "Applied 'Casual' tone to 3 posts", time: "1h ago" }
                                        ].map((activity, i) => (
                                            <div key={i} className="flex justify-between items-start gap-3">
                                                <div className="flex gap-2">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shadow-glow shadow-primary/50" />
                                                    <span className="text-xs font-medium text-foreground/80 leading-relaxed">{activity.action}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground/30 whitespace-nowrap">{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
