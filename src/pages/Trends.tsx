import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radar, Compass, TrendingUp, Zap, MessageCircle, Heart, Share2, Globe } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function TrendsRadar() {
    const hashtags = [
        { tag: "#AIRevolution", volume: "1.2M", trend: "up" },
        { tag: "#ContentCreator", volume: "840k", trend: "stable" },
        { tag: "#RemoteAlpha", volume: "420k", trend: "up" },
        { tag: "#TechTrends2026", volume: "310k", trend: "new" },
        { tag: "#DigitalNomad", volume: "1.1M", trend: "down" },
    ];

    const topics = [
        { title: "Quantum Computing for Business", sentiment: "Extremely Positive", engagement: "High" },
        { title: "Standardized AI Regulations", sentiment: "Controversial", engagement: "Very High" },
        { title: "The Return to Video-First Content", sentiment: "Growth", engagement: "Medium" },
        { title: "Minimalist Branding in Tech", sentiment: "Positive", engagement: "Low" },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">
                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Radar className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Trends Radar</h1>
                                    <p className="text-muted-foreground text-lg">Real-time signals and viral topics across the social graph</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-black tracking-tight">Viral Topic Heatmap</CardTitle>
                                        <CardDescription className="text-muted-foreground/60 font-medium">Global discussion velocity and sentiment analysis</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="gap-1 animate-pulse border-primary/30 text-primary">
                                            <Globe className="h-3 w-3" />
                                            Live Graph
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topics.map((topic, i) => (
                                            <div key={i} className="p-5 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all cursor-pointer group shadow-premium">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{topic.title}</h3>
                                                        <div className="flex gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
                                                                {topic.sentiment}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-white/10">
                                                                {topic.engagement} Velocity
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-black text-foreground">12.4K</div>
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Discussions</div>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "75%" }}
                                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                                        className="h-full gradient-premium"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="glass-card border-border/50 shadow-premium">
                                    <CardHeader>
                                        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
                                            Breakout Structures
                                        </CardTitle>
                                        <CardDescription className="text-xs font-medium text-muted-foreground/60">High-conversion hook templates</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-surface border border-border/50 text-sm leading-relaxed font-medium group hover:border-primary/20 transition-all cursor-default">
                                            <span className="text-primary font-bold">The Contrast:</span> "I compared <span className="text-foreground italic">[Old Way]</span> with <span className="text-foreground italic">[New Way]</span> so you don't have to..."
                                        </div>
                                        <div className="p-4 rounded-2xl bg-surface border border-border/50 text-sm leading-relaxed font-medium group hover:border-primary/20 transition-all cursor-default">
                                            <span className="text-primary font-bold">The Call-out:</span> "Unpopular opinion: The biggest mistake creators are making in 2026 is..."
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card border-border/50 shadow-premium">
                                    <CardHeader>
                                        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-blue-500" />
                                            Regional Signals
                                        </CardTitle>
                                        <CardDescription className="text-xs font-medium text-muted-foreground/60">Top trending regions (24h)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {[
                                                { region: "North America", trend: "+45%", status: "Surging" },
                                                { region: "Western Europe", trend: "+22%", status: "Stable" },
                                                { region: "Southeast Asia", trend: "+89%", status: "Explosive" },
                                            ].map((r, i) => (
                                                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-surface transition-colors">
                                                    <span className="text-sm font-bold">{r.region}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-black text-primary">{r.trend}</span>
                                                        <Badge className="text-[8px] font-black uppercase tracking-tighter bg-primary/10 text-primary border-none">{r.status}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Card className="glass-card border-border/50 shadow-premium overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-xl font-black tracking-tight">Hashtag Pulse</CardTitle>
                                    <CardDescription className="text-muted-foreground/60 font-medium">Real-time volume tracking</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/5">
                                        {hashtags.map((h, i) => (
                                            <motion.div
                                                key={h.tag}
                                                whileHover={{ x: 5 }}
                                                className="px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors group"
                                            >
                                                <div>
                                                    <div className="font-black text-primary group-hover:text-glow transition-all">{h.tag}</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{h.volume} posts</div>
                                                </div>
                                                <Badge variant={h.trend === 'up' ? 'default' : 'outline'} className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest",
                                                    h.trend === 'up' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'border-white/10'
                                                )}>
                                                    {h.trend.toUpperCase()}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="gradient-premium border-none shadow-premium overflow-hidden relative group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-blob" />
                                <CardHeader className="relative">
                                    <CardTitle className="text-xl font-black text-white tracking-tight">Signal Alert</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 relative">
                                    <p className="text-sm font-medium text-white/90 leading-relaxed">
                                        Search volume for <span className="underline decoration-white/30 underline-offset-4">"Personalized AI Content"</span> has spiked by <span className="font-black text-white text-glow">140%</span> in the last 12 hours.
                                    </p>
                                    <Button className="w-full h-12 rounded-2xl bg-white text-primary hover:bg-white/90 font-black shadow-premium transition-all">
                                        Exploit This Trend
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
