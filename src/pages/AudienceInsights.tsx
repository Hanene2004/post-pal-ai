import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, Smartphone, Activity, MapPin, MousePointer2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AudienceInsights() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">

                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Users className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Audience Insights</h1>
                                    <p className="text-muted-foreground text-lg">Deep dive into demographics and behavioral patterns</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Active Followers", value: "24.5K", change: "+12%", icon: Users },
                            { label: "Top Region", value: "USA / UK", change: "Stable", icon: MapPin },
                            { label: "Primary Device", value: "Mobile", change: "85%", icon: Smartphone },
                            { label: "Avg. Click Rate", value: "4.8%", change: "+0.5%", icon: MousePointer2 },
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <stat.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">{stat.change}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid gap-8 mt-8 lg:grid-cols-3">
                        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Active Hour Heatmap (Mocked)
                                </CardTitle>
                                <CardDescription>When your audience is most likely to engage</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-12 gap-1 h-32">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className="flex flex-col gap-1 h-full">
                                            {Array.from({ length: 7 }).map((_, j) => {
                                                // Create a realistic engagement pattern:
                                                // Peaks during lunch (12-14) and evening (18-22)
                                                // i is 0-11 (Morning to Evening)
                                                const hourRange = i; 
                                                const dayIndex = j;
                                                
                                                let intensity = 0.15;
                                                if (hourRange >= 4 && hourRange <= 6) intensity += 0.4; // Mid-day peak
                                                if (hourRange >= 8 && hourRange <= 10) intensity += 0.6; // Evening peak
                                                if (dayIndex >= 5) intensity += 0.2; // Weekend boost
                                                
                                                const value = Math.min(Math.floor(intensity * 100 + (Math.random() * 15)), 100);
                                                const opacity = value / 100;

                                                return (
                                                    <div
                                                        key={j}
                                                        className="flex-1 rounded-sm transition-colors cursor-help hover:ring-1 hover:ring-primary/50"
                                                        style={{
                                                            backgroundColor: `hsl(var(--primary) / ${opacity})`
                                                        }}
                                                        title={`Engagement: ${value}%`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                                    <span>Morning</span>
                                    <span>Afternoon</span>
                                    <span>Evening</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    Interests Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { label: "Technology", value: 75 },
                                    { label: "Productivity", value: 62 },
                                    { label: "Marketing", value: 45 },
                                    { label: "AI & Future", value: 88 },
                                ].map((interest, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>{interest.label}</span>
                                            <span>{interest.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div className="h-full gradient-primary" style={{ width: `${interest.value}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
