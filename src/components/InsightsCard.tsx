import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
    platform: string;
    tone: string;
    engagement_score: number | null;
    created_at: string;
}

interface InsightsCardProps {
    posts: Post[];
}

interface Insight {
    type: "success" | "info" | "warning";
    icon: any;
    title: string;
    description: string;
}

export function InsightsCard({ posts }: InsightsCardProps) {
    const insights = useMemo<Insight[]>(() => {
        if (posts.length === 0) return [];

        const insightsList: Insight[] = [];

        // 1. Best performing platform
        const platformPerformance: Record<string, { total: number; count: number }> = {};
        posts.forEach((post) => {
            if (!platformPerformance[post.platform]) {
                platformPerformance[post.platform] = { total: 0, count: 0 };
            }
            platformPerformance[post.platform].total += post.engagement_score || 0;
            platformPerformance[post.platform].count += 1;
        });

        const platformAvgs = Object.entries(platformPerformance)
            .map(([platform, data]) => ({
                platform,
                avg: data.total / data.count,
            }))
            .sort((a, b) => b.avg - a.avg);

        if (platformAvgs.length > 1 && platformAvgs[0].avg > platformAvgs[1].avg * 1.1) {
            const platformName = platformAvgs[0].platform.charAt(0).toUpperCase() + platformAvgs[0].platform.slice(1);
            const improvement = Math.round(((platformAvgs[0].avg - platformAvgs[1].avg) / platformAvgs[1].avg) * 100);

            insightsList.push({
                type: "success",
                icon: Award,
                title: `${platformName} is your top platform`,
                description: `Your ${platformName} posts perform ${improvement}% better than other platforms. Consider focusing more content here.`,
            });
        }

        // 2. Best performing tone
        const tonePerformance: Record<string, { total: number; count: number }> = {};
        posts.forEach((post) => {
            if (!tonePerformance[post.tone]) {
                tonePerformance[post.tone] = { total: 0, count: 0 };
            }
            tonePerformance[post.tone].total += post.engagement_score || 0;
            tonePerformance[post.tone].count += 1;
        });

        const toneAvgs = Object.entries(tonePerformance)
            .map(([tone, data]) => ({
                tone,
                avg: data.total / data.count,
            }))
            .sort((a, b) => b.avg - a.avg);

        if (toneAvgs.length > 1 && toneAvgs[0].avg > toneAvgs[1].avg * 1.05) {
            const toneName = toneAvgs[0].tone.charAt(0).toUpperCase() + toneAvgs[0].tone.slice(1);

            insightsList.push({
                type: "info",
                icon: Lightbulb,
                title: `${toneName} tone gets better engagement`,
                description: `Posts with a ${toneAvgs[0].tone} tone tend to score ${Math.round(toneAvgs[0].avg)}% on average. This style resonates with your audience.`,
            });
        }

        // 3. Posting consistency
        if (posts.length >= 3) {
            const dates = posts.map((p) => new Date(p.created_at).getTime()).sort((a, b) => a - b);
            const intervals = [];
            for (let i = 1; i < dates.length; i++) {
                intervals.push((dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24)); // days
            }
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

            if (avgInterval > 7) {
                insightsList.push({
                    type: "warning",
                    icon: Clock,
                    title: "Post more consistently",
                    description: `You post about every ${Math.round(avgInterval)} days. Try posting more frequently to build momentum and improve engagement.`,
                });
            } else if (avgInterval <= 3) {
                insightsList.push({
                    type: "success",
                    icon: Clock,
                    title: "Great posting rhythm!",
                    description: `You're posting every ${Math.round(avgInterval)} days on average. This consistency helps build and maintain audience engagement.`,
                });
            }
        }

        // 4. Overall performance trend
        if (posts.length >= 5) {
            const recentPosts = posts.slice(0, Math.floor(posts.length / 2));
            const olderPosts = posts.slice(Math.floor(posts.length / 2));

            const recentAvg = recentPosts.reduce((sum, p) => sum + (p.engagement_score || 0), 0) / recentPosts.length;
            const olderAvg = olderPosts.reduce((sum, p) => sum + (p.engagement_score || 0), 0) / olderPosts.length;

            if (recentAvg > olderAvg * 1.15) {
                insightsList.push({
                    type: "success",
                    icon: TrendingUp,
                    title: "Your content is improving!",
                    description: `Your recent posts score ${Math.round(((recentAvg - olderAvg) / olderAvg) * 100)}% higher than earlier ones. Keep up the great work!`,
                });
            } else if (recentAvg < olderAvg * 0.85) {
                insightsList.push({
                    type: "info",
                    icon: TrendingUp,
                    title: "Review your recent strategy",
                    description: `Recent posts are scoring lower than before. Consider what worked well in your earlier content and reapply those insights.`,
                });
            }
        }

        return insightsList;
    }, [posts]);

    if (insights.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        Smart Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground">Not enough data yet</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Create at least 3 posts to unlock personalized insights
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getBadgeVariant = (type: Insight["type"]) => {
        switch (type) {
            case "success":
                return "default";
            case "warning":
                return "destructive";
            case "info":
                return "secondary";
        }
    };

    return (
        <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <Lightbulb className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Smart Insights
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <div
                            key={index}
                            className="flex gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-primary/20 transition-all duration-300 group shadow-premium"
                        >
                            <div className={cn(
                                "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110",
                                insight.type === "success"
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : insight.type === "warning"
                                        ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            )}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h4 className="text-base font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">{insight.title}</h4>
                                    <Badge variant="secondary" className={cn(
                                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5",
                                        insight.type === "success" ? "bg-green-500/10 text-green-400" :
                                            insight.type === "warning" ? "bg-orange-500/10 text-orange-400" :
                                                "bg-blue-500/10 text-blue-400"
                                    )}>
                                        {insight.type}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                                    {insight.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
