import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
    created_at: string;
    engagement_score: number | null;
}

interface EngagementHeatmapProps {
    posts: Post[];
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 12 }, (_, i) => i * 2); // 0, 2, 4, ..., 22

export function EngagementHeatmap({ posts }: EngagementHeatmapProps) {
    const heatmapData = useMemo(() => {
        const data: Record<string, { total: number; count: number }> = {};

        posts.forEach((post) => {
            const date = new Date(post.created_at);
            const day = date.getDay();
            const hour = Math.floor(date.getHours() / 2) * 2;
            const key = `${day}-${hour}`;

            if (!data[key]) {
                data[key] = { total: 0, count: 0 };
            }
            data[key].total += post.engagement_score || 0;
            data[key].count += 1;
        });

        return data;
    }, [posts]);

    const getColor = (score: number) => {
        if (score === 0) return "bg-muted/10";
        if (score < 40) return "bg-primary/20";
        if (score < 60) return "bg-primary/40";
        if (score < 80) return "bg-primary/70";
        return "bg-primary";
    };

    return (
        <Card className="glass-card border-white/5 overflow-hidden group">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                    <Clock className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    Creation Intensity
                </CardTitle>
                <CardDescription className="text-muted-foreground/60 font-medium">Engagement patterns based on your creation time (Hour vs Day)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <div className="min-w-[500px]">
                        <div className="grid grid-cols-[auto_1fr] gap-6">
                            {/* Y-Axis Labels (Days) */}
                            <div className="flex flex-col justify-between py-2 text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">
                                {days.map(day => <div key={day} className="h-7 flex items-center">{day}</div>)}
                            </div>

                            <div className="space-y-2">
                                {/* X-Axis Labels (Hours) */}
                                <div className="grid grid-cols-12 gap-1 mb-2">
                                    {hours.map(h => (
                                        <div key={h} className="text-[9px] text-muted-foreground/40 text-center font-bold">
                                            {h}H
                                        </div>
                                    ))}
                                </div>

                                {/* Heatmap Grid */}
                                {days.map((_, dayIndex) => (
                                    <div key={dayIndex} className="grid grid-cols-12 gap-1.5 h-7">
                                        {hours.map((hour) => {
                                            const key = `${dayIndex}-${hour}`;
                                            const cell = heatmapData[key];
                                            const avg = cell ? Math.round(cell.total / cell.count) : 0;

                                            return (
                                                <div
                                                    key={hour}
                                                    title={cell ? `${avg}% Avg. Engagement (${cell.count} posts)` : "No data"}
                                                    className={cn(
                                                        "rounded-md transition-all duration-300 hover:scale-125 cursor-help shadow-sm border border-white/5",
                                                        getColor(avg)
                                                    )}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-8 flex items-center justify-end gap-4 px-2">
                            <span className="text-[10px] text-muted-foreground/40 uppercase font-black tracking-widest">Low</span>
                            <div className="flex gap-1.5">
                                {[0, 20, 40, 60, 80, 100].map(v => (
                                    <div key={v} className={cn("h-4 w-4 rounded-md border border-white/5", getColor(v))} />
                                ))}
                            </div>
                            <span className="text-[10px] text-muted-foreground/40 uppercase font-black tracking-widest">High</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
