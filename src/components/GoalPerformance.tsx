import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Target } from "lucide-react";

interface Post {
    goal: string;
    engagement_score: number | null;
}

interface GoalPerformanceProps {
    posts: Post[];
}

const goalColors: Record<string, string> = {
    engagement: "hsl(var(--primary))",
    reach: "#22c55e",
    leads: "#f59e0b",
    sales: "#ef4444",
};

export function GoalPerformance({ posts }: GoalPerformanceProps) {
    const chartData = useMemo(() => {
        if (posts.length === 0) return [];

        const goalStats: Record<string, { total: number; count: number }> = {};

        posts.forEach((post) => {
            const goal = post.goal.toLowerCase();
            if (!goalStats[goal]) {
                goalStats[goal] = { total: 0, count: 0 };
            }
            goalStats[goal].total += post.engagement_score || 0;
            goalStats[goal].count += 1;
        });

        return Object.entries(goalStats).map(([goal, stats]) => ({
            name: goal.charAt(0).toUpperCase() + goal.slice(1),
            avgScore: Math.round(stats.total / stats.count),
            count: stats.count,
            rawGoal: goal,
        })).sort((a, b) => b.avgScore - a.avgScore);
    }, [posts]);

    return (
        <Card className="glass-card border-white/5 overflow-hidden group">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <Target className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Goal Performance
                </CardTitle>
                <CardDescription className="text-muted-foreground/60 font-medium">Average engagement score by campaign goal</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <Target className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-sm font-bold text-muted-foreground">No data available for goals</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsla(var(--border), 0.3)" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                                width={80}
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
                            <Bar dataKey="avgScore" radius={[0, 8, 8, 0]} barSize={32} animationDuration={1500}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={goalColors[entry.rawGoal] || "hsl(var(--primary))"}
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
