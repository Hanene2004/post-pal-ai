import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PlatformIcon } from "@/components/PlatformIcon";
import { BarChart3 } from "lucide-react";

interface Post {
    platform: string;
}

interface PlatformBreakdownProps {
    posts: Post[];
}

const platformColors: Record<string, string> = {
    instagram: "#E4405F",
    tiktok: "#000000",
    linkedin: "#0A66C2",
    twitter: "#1DA1F2",
};

const platformLabels: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    twitter: "Twitter/X",
};

export function PlatformBreakdown({ posts }: PlatformBreakdownProps) {
    const chartData = useMemo(() => {
        if (posts.length === 0) return [];

        const platformCounts: Record<string, number> = {};

        posts.forEach((post) => {
            const platform = post.platform.toLowerCase();
            platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        });

        return Object.entries(platformCounts)
            .map(([platform, count]) => ({
                name: platformLabels[platform] || platform,
                value: count,
                platform,
                color: platformColors[platform] || "#888888",
                percentage: Math.round((count / posts.length) * 100),
            }))
            .sort((a, b) => b.value - a.value);
    }, [posts]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <PlatformIcon platform={data.platform} className="h-4 w-4" />
                        <p className="text-sm font-medium text-foreground">{data.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {data.value} posts ({data.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomLegend = ({ payload }: any) => {
        return (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {payload.map((entry: any, index: number) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <div className="flex items-center gap-1.5">
                            <PlatformIcon platform={entry.payload.platform} className="h-4 w-4" />
                            <span className="text-sm text-foreground">{entry.value}</span>
                            <span className="text-xs text-muted-foreground">
                                ({entry.payload.percentage}%)
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <BarChart3 className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Platform Distribution
                </CardTitle>
                <CardDescription className="text-muted-foreground/60 font-medium">Your content across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-sm font-bold text-muted-foreground">No platform data available</p>
                        <p className="text-xs text-muted-foreground/50 mt-1">Create posts to see distribution</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke="transparent"
                                            className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:opacity-80 transition-opacity cursor-pointer"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Platform Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {chartData.map((platform) => (
                                <div
                                    key={platform.platform}
                                    className="flex items-center gap-3 p-3 rounded-2xl glass border border-white/5 group hover:border-primary/20 transition-all duration-300 shadow-premium"
                                >
                                    <div
                                        className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-premium"
                                        style={{ backgroundColor: platform.color }}
                                    >
                                        <PlatformIcon platform={platform.platform} className="h-5 w-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-foreground">{platform.name}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                                            {platform.value} {platform.value === 1 ? "post" : "posts"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
