import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { Sparkles } from "lucide-react";

interface Post {
    tone: string;
}

interface ToneDistributionProps {
    posts: Post[];
}

export function ToneDistribution({ posts }: ToneDistributionProps) {
    const chartData = useMemo(() => {
        if (posts.length === 0) return [];

        const toneCounts: Record<string, number> = {};
        posts.forEach((post) => {
            const tone = post.tone.charAt(0).toUpperCase() + post.tone.slice(1);
            toneCounts[tone] = (toneCounts[tone] || 0) + 1;
        });

        const data = Object.entries(toneCounts).map(([tone, count]) => ({
            subject: tone,
            A: count,
            fullMark: posts.length,
        }));

        return data;
    }, [posts]);

    return (
        <Card className="glass-card border-white/5 overflow-hidden group">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <Sparkles className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Tone Distribution
                </CardTitle>
                <CardDescription className="text-muted-foreground/60 font-medium">Most frequently used communication styles</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length < 3 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <Sparkles className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-sm font-bold text-muted-foreground">Not enough data for tone analysis</p>
                        <p className="text-xs text-muted-foreground/50 mt-1">Try varying your post tones</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                            <PolarGrid stroke="hsla(var(--muted-foreground), 0.2)" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                            <Radar
                                name="Posts"
                                dataKey="A"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.3}
                                animationDuration={1500}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsla(var(--background), 0.8)",
                                    backdropFilter: "blur(12px)",
                                    borderColor: "hsla(var(--white), 0.1)",
                                    borderRadius: "16px",
                                    boxShadow: "var(--shadow-premium)"
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
