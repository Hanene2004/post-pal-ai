import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
    created_at: string;
    engagement_score: number | null;
    platform: string;
}

interface EngagementChartProps {
    posts: Post[];
    showSelector?: boolean;
}

type TimeRange = "7days" | "30days" | "90days" | "all";

export function EngagementChart({ posts, showSelector = true }: EngagementChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>("30days");

    const chartData = useMemo(() => {
        if (posts.length === 0) return [];

        // Filter by time range
        const now = new Date();
        let filteredPosts = posts;

        if (timeRange !== "all") {
            const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
            const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
            filteredPosts = posts.filter((post) => new Date(post.created_at) >= cutoff);
        }

        // Group posts by date
        const groupedByDate: Record<string, { total: number; count: number; date: Date }> = {};

        filteredPosts.forEach((post) => {
            const date = new Date(post.created_at);
            const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = { total: 0, count: 0, date };
            }

            groupedByDate[dateKey].total += post.engagement_score || 0;
            groupedByDate[dateKey].count += 1;
        });

        // Convert to array and calculate averages
        const data = Object.entries(groupedByDate)
            .map(([dateKey, { total, count, date }]) => ({
                date: dateKey,
                fullDate: date,
                engagement: Math.round(total / count),
                posts: count,
            }))
            .sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

        return data;
    }, [posts, timeRange]);

    const avgEngagement = useMemo(() => {
        if (chartData.length === 0) return 0;
        const sum = chartData.reduce((acc, item) => acc + item.engagement, 0);
        return Math.round(sum / chartData.length);
    }, [chartData]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
        }).format(date);
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground">{formatDate(payload[0].payload.date)}</p>
                    <p className="text-sm text-muted-foreground">
                        Engagement: <span className="font-semibold text-primary">{payload[0].value}%</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {payload[0].payload.posts} {payload[0].payload.posts === 1 ? "post" : "posts"}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                            <TrendingUp className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                            Engagement Trends
                        </CardTitle>
                        <CardDescription className="text-muted-foreground/60 font-medium">Track your predicted engagement scores over time</CardDescription>
                    </div>
                    {showSelector && (
                        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                            <SelectTrigger className="w-[140px] bg-white/5 border-white/10 rounded-xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-dark border-white/10">
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="90days">Last 90 days</SelectItem>
                                <SelectItem value="all">All time</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <TrendingUp className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-sm font-bold text-muted-foreground">No data available for this time range</p>
                        <p className="text-xs text-muted-foreground/50 mt-1">Create more posts to see trends</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20">
                                <div className="text-2xl font-black text-primary text-glow">{avgEngagement}%</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Average Engagement</div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border), 0.3)" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatDate}
                                    className="text-[10px] font-bold"
                                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    className="text-[10px] font-bold"
                                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    domain={[0, 100]}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="engagement"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={4}
                                    fill="url(#colorEngagement)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
