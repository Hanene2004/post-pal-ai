import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Search, Eye, MessageSquare, Heart } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export default function Competitors() {
    const competitors = [
        { name: "GlobalContent.co", reach: 85, growth: "+12%", engagement: 4.5 },
        { name: "DigitalPulse", reach: 72, growth: "+8%", engagement: 5.2 },
        { name: "ViralStream", reach: 94, growth: "+24%", engagement: 3.8 },
        { name: "TechAdvocate", reach: 68, growth: "-3%", engagement: 4.1 },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">
                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Users className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Competitor Intelligence</h1>
                                    <p className="text-muted-foreground text-lg">Benchmarking your share of voice against industry leaders</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        <div className="lg:col-span-3 space-y-8">
                            <motion.div variants={fadeInUp} initial="initial" animate="animate">
                                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Share of Voice</CardTitle>
                                            <CardDescription>Mentions and reach relative to competitors</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Search className="h-4 w-4" />
                                            Add Competitor
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="font-medium text-primary">Your Brand (PostAdvisor AI)</span>
                                                    <span className="text-sm font-bold">42%</span>
                                                </div>
                                                <Progress value={42} className="h-3 gradient-primary" />
                                            </div>
                                            {competitors.map((comp) => (
                                                <div key={comp.name} className="space-y-2">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-sm font-medium">{comp.name}</span>
                                                        <span className="text-xs text-muted-foreground">{comp.reach}% Reach</span>
                                                    </div>
                                                    <Progress value={comp.reach} className="h-2 bg-muted-foreground/10" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Competitor Performance Feed</h2>
                                <motion.div
                                    variants={staggerContainer}
                                    initial="initial"
                                    animate="animate"
                                    className="grid gap-4 md:grid-cols-2"
                                >
                                    {competitors.map((comp) => (
                                        <motion.div key={comp.name} variants={staggerItem}>
                                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg">{comp.name}</CardTitle>
                                                    <CardDescription>Last 7 days performance</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/50 my-2">
                                                        <div className="text-center">
                                                            <div className="text-xs text-muted-foreground">Reach</div>
                                                            <div className="font-bold text-lg">{comp.reach}k</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-xs text-muted-foreground">Eng.</div>
                                                            <div className="font-bold text-lg">{comp.engagement}%</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-xs text-muted-foreground">Growth</div>
                                                            <div className="font-bold text-lg text-green-500">{comp.growth}</div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-2 flex gap-4 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> 12 posts</span>
                                                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 843 comments</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card className="border-primary/20 gradient-primary text-primary-foreground">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5" />
                                            AI Insights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm opacity-90">
                                            "GlobalContent.co" is seeing high engagement on **educational carousels** about productivity.
                                        </p>
                                        <div className="p-3 bg-white/10 rounded-lg text-xs backdrop-blur-sm">
                                            <span className="font-bold">Trend Opp:</span> Use casual tone for LinkedIn updates; it's currently a gap in your rivals' content.
                                        </div>
                                        <Button variant="secondary" className="w-full text-primary font-bold">Apply Suggestions</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-base">Top Competitor Hooks</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        "Stop doing [X] if you want [Y]...",
                                        "I spent 100 hours researching...",
                                        "The truth about the AI market..."
                                    ].map((hook, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-muted text-sm border border-border/30 italic">
                                            "{hook}"
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
