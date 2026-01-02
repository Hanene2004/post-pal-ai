import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award } from "lucide-react";

interface Post {
    platform: string;
    engagement_score: number | null;
}

interface PlatformPerformanceProps {
    posts: Post[];
}

const platformColors: Record<string, string> = {
    instagram: "#E4405F",
    tiktok: "#000000",
    linkedin: "#0A66C2",
    twitter: "#1DA1F2",
};

export function PlatformPerformance({ posts }: PlatformPerformanceProps) {
    const chartData = useMemo(() => {
        if (posts.length === 0) return [];

        const platformStats: Record<string, { total: number; count: number }> = {};

        posts.forEach((post) => {
            const platform = post.platform.toLowerCase();
            if (!platformStats[platform]) {
                platformStats[platform] = { total: 0, count: 0 };
            }
            platformStats[platform].total += post.engagement_score || 0;
            platformStats[platform].count += 1;
        });

        return Object.entries(platformStats).map(([platform, stats]) => ({
            name: platform.charAt(0).toUpperCase() + platform.slice(1),
            avgScore: Math.round(stats.total / stats.count),
            payload: platform,
        })).sort((a, b) => b.avgScore - a.avgScore);
    }, [posts]);

    return (
        <Card className="glass-card border-white/5 overflow-hidden group">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <Award className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Engagement by Platform
                </CardTitle>
                <CardDescription className="text-muted-foreground/60 font-medium">Qualitative comparison of where your content performs best</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <Award className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-sm font-bold text-muted-foreground">No platform data for scoring</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border), 0.3)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
                                contentStyle={{
                                    backgroundColor: "hsla(var(--background), 0.8)",
                                    backdropFilter: "blur(12px)",
                                    borderColor: "hsla(var(--white), 0.1)",
                                    borderRadius: "16px",
                                    boxShadow: "var(--shadow-premium)"
                                }}
                            />
                            <Bar dataKey="avgScore" radius={[8, 8, 0, 0]} barSize={40} animationDuration={1500}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={platformColors[entry.payload] || "hsl(var(--primary))"}
                                        className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] group-hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
